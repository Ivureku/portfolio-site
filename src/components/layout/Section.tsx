import type { ReactNode } from 'react';
import type { SectionId } from '@/data/sections';

type SectionProps = {
  id: SectionId;
  children: ReactNode;
  /** Extra classes for one-off background or spacing changes. */
  className?: string;
};

/** Shared width, padding, and scroll anchor for every section. */
const Section = ({ id, children, className = '' }: SectionProps) => (
  <section id={id} className={`px-5 py-24 sm:px-8 sm:py-32 ${className}`}>
    <div className="mx-auto max-w-shell">{children}</div>
  </section>
);

export default Section;
