import { useEffect } from 'react';
import { useUiStore } from '@/store/useUiStore';

/** Must match the key read by the inline script in index.html. */
const STORAGE_KEY = 'theme';

/** Writes store.theme to <html data-theme> and remembers it for next visit. */
export const useThemeSync = () => {
  const theme = useUiStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Storage can be blocked (private mode); the toggle still works per visit.
    }
  }, [theme]);
};
