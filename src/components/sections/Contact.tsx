import type { CSSProperties } from 'react';
import Section from '@/components/layout/Section';
import Reveal from '@/components/ui/Reveal';
import RichText from '@/components/ui/RichText';
import { profile } from '@/data/profile';

const CTA_REST = 'Interested?';
const CTA_HOVER = 'Work with me.';

/**
 * One span per character so each can roll on its own delay (see .cta in
 * index.css). Spaces become non-breaking, or inline-block would collapse them.
 */
const CtaLine = ({ text, className }: { text: string; className: string }) => (
  <span className={`cta-line ${className}`}>
    {Array.from(text).map((char, index) => (
      <span
        key={index}
        className="cta-char"
        style={{ '--i': index } as CSSProperties}
      >
        {char === ' ' ? ' ' : char}
      </span>
    ))}
  </span>
);

const Contact = () => (
  <Section id="contact" className="bg-paper-deep">
    <Reveal className="border-t border-rule pt-5">
      <h2 className="font-data text-xs text-ink-muted">Contact</h2>

      <a
        href={`${import.meta.env.BASE_URL}${profile.resume.href}`}
        download={profile.resume.fileName}
        className="cta group mt-6 block w-full sm:mt-10"
      >
        <span
          aria-hidden="true"
          className="cta-word font-display text-[clamp(2.75rem,13.5vw,12rem)] font-semibold leading-[0.95] tracking-[-0.02em]"
        >
          <CtaLine text={CTA_REST} className="cta-line--rest" />
          <CtaLine text={CTA_HOVER} className="cta-line--hover text-accent" />
        </span>
        <span className="sr-only">{CTA_REST}</span>

        <span className="mt-3 flex items-center gap-2.5 font-data text-xs text-ink-muted transition-colors duration-200 group-hover:text-accent group-focus-visible:text-accent sm:mt-4 sm:text-sm">
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
          >
            <path d="M8 2v8.5M4.5 7 8 10.5 11.5 7M3 13.5h10" />
          </svg>
          Download my résumé (PDF)
        </span>
      </a>

      <div className="mt-16 grid gap-8 border-t border-rule pt-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="font-data text-xs text-ink-muted">Email</p>
          <span className="tooltip-host mt-2">
            <a
              href={`mailto:${profile.email}`}
              aria-describedby="email-note"
              className="inline-block border-b border-accent/40 pb-0.5 text-lg transition-colors duration-200 hover:text-accent"
            >
              {profile.email}
            </a>
            <span id="email-note" role="tooltip" className="tooltip">
              {profile.emailNote}
            </span>
          </span>
        </div>

        <div>
          <p className="font-data text-xs text-ink-muted">Based in</p>
          <p className="mt-2 text-lg">{profile.city}</p>
        </div>

        <p className="text-base leading-relaxed text-ink-muted sm:col-span-2 lg:col-span-1">
          <RichText text={profile.availability} />
        </p>
      </div>
    </Reveal>
  </Section>
);

export default Contact;
