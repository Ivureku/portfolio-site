import { useUiStore } from '@/store/useUiStore';

/** Shows the theme you'd switch to, which is what the button does. */
const ThemeToggle = () => {
  const theme = useUiStore((state) => state.theme);
  const toggleTheme = useUiStore((state) => state.toggleTheme);
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
      className="grid h-7 w-7 place-items-center rounded-sm border border-rule text-ink-muted transition-colors duration-200 hover:border-accent hover:text-accent"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      >
        {nextTheme === 'light' ? (
          <>
            <circle cx="8" cy="8" r="3" />
            <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06" />
          </>
        ) : (
          <path d="M13.5 9.5A5.5 5.5 0 0 1 6.5 2.5a5.5 5.5 0 1 0 7 7Z" />
        )}
      </svg>
    </button>
  );
};

export default ThemeToggle;
