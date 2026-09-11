import { useEffect } from 'react';
import { useUiStore } from '@/store/useUiStore';

/** Writes document scroll progress (0–1) to the store, throttled to a frame. */
export const useScrollProgress = () => {
  const setScrollProgress = useUiStore((state) => state.setScrollProgress);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [setScrollProgress]);
};
