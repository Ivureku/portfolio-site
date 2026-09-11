import { useEffect } from 'react';
import { useUiStore } from '@/store/useUiStore';
import { sections, type SectionId } from '@/data/sections';

/** Keeps store.activeSectionId in sync with whatever fills the viewport. */
export const useActiveSection = () => {
  const setActiveSectionId = useUiStore((state) => state.setActiveSectionId);

  useEffect(() => {
    const elements = sections
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSectionId(visible.target.id as SectionId);
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [setActiveSectionId]);
};
