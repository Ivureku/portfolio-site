import { useEffect, useRef } from 'react';

/**
 * Adds data-visible="true" the first time an element scrolls into view.
 * The transition itself lives in index.css, so nothing re-renders.
 */
export const useReveal = <T extends HTMLElement>(threshold = 0.15) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.dataset.visible = 'true';
        observer.disconnect();
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
};
