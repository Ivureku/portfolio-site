import GitHubBadge from '@/components/ui/GitHubBadge';
import LinkedInBadge from '@/components/ui/LinkedInBadge';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { profile } from '@/data/profile';
import { sections } from '@/data/sections';
import { useUiStore } from '@/store/useUiStore';

/**
 * Fixed chrome at the top: who you are, where you are in the page, and a
 * progress line. Deliberately thin — it reads like an application toolbar,
 * which is the kind of software this portfolio is about.
 */
const StatusBar = () => {
  const activeSectionId = useUiStore((state) => state.activeSectionId);
  const scrollProgress = useUiStore((state) => state.scrollProgress);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-rule bg-paper/95">
      {/* Below 360px everything tightens a step — gutter, gaps, nav text — so
          the toolbar still fits at 320px, which is also the width a desktop
          reflows to at 400% zoom. Nothing is hidden to make room. */}
      <div className="mx-auto flex max-w-shell items-center justify-between gap-4 px-5 py-3 max-[359px]:gap-3 max-[359px]:px-4 sm:px-8">
        {/* Initials on phones — the full name no longer fits beside the
            profile and theme buttons, and the intro shows it large anyway. */}
        <a
          href="#intro"
          aria-label={profile.shortName}
          className="font-display text-[0.95rem] font-semibold leading-none tracking-tight"
        >
          <span className="sm:hidden">{profile.initials}</span>
          <span className="hidden sm:inline">{profile.shortName}</span>
        </a>

        <div className="flex items-center gap-3 max-[359px]:gap-2 sm:gap-6">
          <nav aria-label="Sections">
            <ul className="flex items-center gap-3 max-[359px]:gap-2 sm:gap-6">
              {sections.map((section) => {
                const isActive = activeSectionId === section.id;
                return (
                  // On phones the name link already goes to the top, so the
                  // first item gives its room to the profile and theme buttons.
                  <li
                    key={section.id}
                    className={section.id === 'intro' ? 'max-sm:hidden' : ''}
                  >
                    <a
                      href={`#${section.id}`}
                      aria-current={isActive ? 'true' : undefined}
                      className={`relative text-[0.8rem] transition-colors max-[359px]:text-xs duration-200 hover:text-ink ${
                        isActive ? 'text-accent' : 'text-ink-muted'
                      }`}
                    >
                      {section.navLabel}
                      <span
                        aria-hidden="true"
                        className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-accent transition-transform duration-300 ${
                          isActive ? 'scale-x-100' : 'scale-x-0'
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <span
            aria-hidden="true"
            className="hidden h-4 w-px bg-rule sm:block"
          />

          <div className="flex items-center gap-1.5 max-[359px]:gap-1">
            <GitHubBadge />
            <LinkedInBadge />
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="h-px w-full origin-left bg-accent"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
    </header>
  );
};

export default StatusBar;
