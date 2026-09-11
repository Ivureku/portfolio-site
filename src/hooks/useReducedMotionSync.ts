import { useEffect } from 'react';
import { useUiStore } from '@/store/useUiStore';

const QUERY = '(prefers-reduced-motion: reduce)';

/** Mirrors the OS reduced-motion setting into the store and keeps it current. */
export const useReducedMotionSync = () => {
  const setPrefersReducedMotion = useUiStore(
    (state) => state.setPrefersReducedMotion
  );

  useEffect(() => {
    const media = window.matchMedia(QUERY);
    const sync = () => setPrefersReducedMotion(media.matches);

    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, [setPrefersReducedMotion]);
};
