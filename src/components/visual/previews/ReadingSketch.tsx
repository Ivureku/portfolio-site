/**
 * ERP systems: one field catching a bad value. A meter reading lower than
 * the previous one is typed, flagged, then corrected.
 *
 * Both values are drawn in the same spot and revealed a character at a time
 * by animating their width in `ch`, which only works because the value is
 * in the mono face. The correction keeps the shared prefix and retypes the
 * rest. The reading-* keyframes in index.css drive it, and they carry these
 * values' lengths (5ch, and the 2ch prefix kept) — change them together.
 *
 * Under reduced motion the classes here draw the flagged state, since that
 * is the frame that says what the feature does.
 */
const PREVIOUS = '1,284';
const TYPO = '1,248';
const FIXED = '1,312';
const ReadingSketch = () => (
  <div className="reading absolute inset-0 flex items-center justify-center p-3">
    <div className="w-full max-w-xs">
      <p className="font-data text-xs text-ink-muted">Current reading</p>

      <div className="mt-1.5 flex items-center gap-2">
        <div className="relative flex h-9 min-w-0 flex-1 items-center rounded-sm border border-rule bg-paper-deep px-2.5">
          <span className="grid font-data text-sm text-ink">
            <span className="reading-typo col-start-1 row-start-1 overflow-hidden whitespace-nowrap">
              {TYPO}
            </span>
            <span className="reading-fixed col-start-1 row-start-1 overflow-hidden whitespace-nowrap">
              {FIXED}
            </span>
          </span>
          <span className="reading-caret ml-px h-4 w-px bg-accent opacity-0" />
          <span className="reading-focus absolute -inset-px rounded-sm border border-accent opacity-0" />
          <span className="reading-error absolute -inset-px rounded-sm border border-dashed border-ink" />
        </div>

        <svg
          aria-hidden="true"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="reading-check h-3.5 w-3.5 shrink-0 text-accent opacity-0"
        >
          <path d="M2 6.5 4.5 9 10 3" />
        </svg>
      </div>

      {/* The hint stays put; the warning takes a line of its own under it,
          reserved even while hidden, so nothing swaps or shifts. */}
      <div className="mt-1.5 font-data text-xs">
        <p className="text-ink-muted">Last reading: {PREVIOUS}</p>
        <p className="reading-note mt-0.5 text-ink">Lower than last reading</p>
      </div>
    </div>
  </div>
);

export default ReadingSketch;
