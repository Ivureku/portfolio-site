import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Project } from '@/data/projects';

type Archive = NonNullable<Project['archive']>;

type ArchiveViewerProps = {
  archive: Archive;
  /** Names the dialog, since "archive" alone says nothing out of context. */
  projectName: string;
};

const pad = (value: number) => String(value).padStart(2, '0');

/**
 * Tabbable controls inside the dialog, in tab order. The backdrop is a button
 * too, but it's aria-hidden at tabIndex -1, so it never counts — focus landing
 * there would put the caret on an element screen readers can't see.
 */
const getFocusable = (root: HTMLElement | null) =>
  Array.from(root?.querySelectorAll<HTMLElement>('button') ?? []).filter(
    (element) => element.tabIndex >= 0
  );

/**
 * Screenshots standing in for a link that no longer resolves. The trigger is a
 * caption-sized control in the project panel; the viewer itself is portalled to
 * <body> so the collapsed accordion row can't clip it.
 */
const ArchiveViewer = ({ archive, projectName }: ArchiveViewerProps) => {
  const { note, shots } = archive;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  /** Where focus came from, so closing can put it back. */
  const triggerRef = useRef<HTMLButtonElement>(null);

  const isOpen = openIndex !== null;

  const close = useCallback(() => {
    setOpenIndex(null);
    triggerRef.current?.focus();
  }, []);

  const step = useCallback(
    (delta: number) =>
      setOpenIndex((current) =>
        current === null
          ? current
          : (current + delta + shots.length) % shots.length
      ),
    [shots.length]
  );

  /* Keys belong to the whole dialog, not to whichever control holds focus. */
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        step(1);
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        step(-1);
        return;
      }

      if (event.key !== 'Tab') return;

      /* Focus trap: the dialog covers the page, so tabbing past its last
         control would land on things the visitor can no longer see. */
      const focusable = getFocusable(dialogRef.current);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, close, step]);

  /* Hold the page still underneath, padding for the scrollbar we just hid so
     the layout doesn't jump sideways as the dialog opens. */
  useEffect(() => {
    if (!isOpen) return;

    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = 'hidden';
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [isOpen]);

  /* Move focus in once the dialog exists — Close, not the backdrop. */
  useEffect(() => {
    if (!isOpen) return;
    getFocusable(dialogRef.current)[0]?.focus();
  }, [isOpen]);

  const shot = openIndex === null ? null : shots[openIndex];

  return (
    <>
      <p className="mt-5 max-w-prose font-data text-xs leading-relaxed text-ink-muted">
        {note}
      </p>

      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpenIndex(0)}
        className="mt-3 inline-flex items-center gap-2 border-b border-accent/40 pb-0.5 font-data text-xs text-accent transition-colors duration-200 hover:border-accent"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3.5 w-3.5"
        >
          <rect x="1.5" y="3" width="13" height="10" rx="1" />
          <path d="M1.5 10.5 5 7l3 2.5L11 6l3.5 3" />
        </svg>
        View archive — {shots.length} screenshots
      </button>

      {shot && openIndex !== null
        ? createPortal(
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label={`${projectName} — archived screenshots`}
              className="archive-overlay fixed inset-0 z-50 flex flex-col bg-paper"
            >
              {/* Clicking the ground closes. It sits under the content, so it
                  never swallows a click meant for a control. */}
              <button
                type="button"
                tabIndex={-1}
                aria-hidden="true"
                onClick={close}
                className="absolute inset-0 cursor-default"
              />

              <div className="relative flex shrink-0 items-center justify-between gap-4 border-b border-rule px-5 py-4 sm:px-8">
                <p className="font-data text-xs text-ink-muted">
                  {projectName} · archive
                </p>

                <button
                  type="button"
                  onClick={close}
                  className="flex items-center gap-2 font-data text-xs text-ink-muted transition-colors duration-200 hover:text-accent"
                >
                  Close
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    className="h-3.5 w-3.5"
                  >
                    <path d="M4 4l8 8M12 4l-8 8" />
                  </svg>
                </button>
              </div>

              <figure className="relative flex min-h-0 flex-1 flex-col items-center gap-5 px-5 py-6 sm:px-8">
                {/* The image shrink-wraps inside this box rather than filling
                    it, so the hairline border traces the screenshot itself
                    instead of boxing in the letterboxed dead space. */}
                <div className="flex min-h-0 w-full flex-1 items-center justify-center">
                  {/* Keyed so a swap replays the fade rather than dissolving
                      one screenshot into the next at a different aspect. */}
                  <img
                    key={shot.src}
                    src={`${import.meta.env.BASE_URL}${shot.src}`}
                    alt={shot.alt}
                    className="archive-shot max-h-full max-w-full border border-rule object-contain"
                  />
                </div>

                <figcaption className="flex shrink-0 items-center gap-3 font-data text-xs text-ink-muted">
                  <span className="text-accent">{pad(openIndex + 1)}</span>
                  <span aria-hidden="true" className="h-3 w-px bg-rule" />
                  <span>{shot.caption}</span>
                </figcaption>
              </figure>

              {shots.length > 1 ? (
                <div className="relative flex shrink-0 items-center justify-between gap-4 border-t border-rule px-5 py-4 sm:px-8">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="flex items-center gap-2 font-data text-xs text-ink-muted transition-colors duration-200 hover:text-accent"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3.5 w-3.5"
                    >
                      <path d="M14 8H3M7 4L3 8l4 4" />
                    </svg>
                    Previous
                  </button>

                  <p
                    aria-hidden="true"
                    className="font-data text-xs text-ink-muted"
                  >
                    {pad(openIndex + 1)} / {pad(shots.length)}
                  </p>

                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="flex items-center gap-2 font-data text-xs text-ink-muted transition-colors duration-200 hover:text-accent"
                  >
                    Next
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3.5 w-3.5"
                    >
                      <path d="M2 8h11M9 4l4 4-4 4" />
                    </svg>
                  </button>
                </div>
              ) : null}
            </div>,
            document.body
          )
        : null}
    </>
  );
};

export default ArchiveViewer;
