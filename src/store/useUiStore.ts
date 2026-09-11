import { create } from 'zustand';
import type { SectionId } from '@/data/sections';
import { projects } from '@/data/projects';

export type Theme = 'dark' | 'light';

/** The inline script in index.html has already applied any saved choice. */
const readInitialTheme = (): Theme =>
  document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';

type UiState = {
  /** Section currently filling the viewport — drives the nav highlight. */
  activeSectionId: SectionId;
  /** 0 to 1 across the whole document. Drives the progress line. */
  scrollProgress: number;
  /** Role currently in view — drives the sticky year rail. */
  activeRoleId: string;
  /** Which project row is open. Only one at a time. */
  openProjectId: string | null;
  /** Mirrors the OS setting so components can skip motion entirely. */
  prefersReducedMotion: boolean;
  /** Dark unless the visitor has switched. Synced to <html> by useThemeSync. */
  theme: Theme;

  setActiveSectionId: (id: SectionId) => void;
  setScrollProgress: (value: number) => void;
  setActiveRoleId: (id: string) => void;
  toggleProject: (id: string) => void;
  /** Opens a project without closing it on a repeat — the desktop panel is never empty. */
  selectProject: (id: string) => void;
  setPrefersReducedMotion: (value: boolean) => void;
  toggleTheme: () => void;
};

export const useUiStore = create<UiState>((set) => ({
  activeSectionId: 'intro',
  scrollProgress: 0,
  activeRoleId: '',
  /** The featured project starts open so the section is never empty. */
  openProjectId: projects.find((project) => project.featured)?.id ?? null,
  prefersReducedMotion: false,
  theme: readInitialTheme(),

  setActiveSectionId: (id) => set({ activeSectionId: id }),
  setScrollProgress: (value) => set({ scrollProgress: value }),
  setActiveRoleId: (id) => set({ activeRoleId: id }),
  toggleProject: (id) =>
    set((state) => ({ openProjectId: state.openProjectId === id ? null : id })),
  selectProject: (id) => set({ openProjectId: id }),
  setPrefersReducedMotion: (value) => set({ prefersReducedMotion: value }),
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
}));
