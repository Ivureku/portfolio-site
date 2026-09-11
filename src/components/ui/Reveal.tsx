import type { CSSProperties, ReactNode } from 'react';
import { useReveal } from '@/hooks/useReveal';

type RevealProps = {
  children: ReactNode;
  /** Milliseconds to stagger this item behind its siblings. */
  delay?: number;
  className?: string;
};

/**
 * Fades and lifts its children in the first time they enter the viewport.
 * Reduced motion is handled entirely in index.css.
 */
const Reveal = ({ children, delay = 0, className = '' }: RevealProps) => {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-reveal=""
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
      className={className}
    >
      {children}
    </div>
  );
};

export default Reveal;
