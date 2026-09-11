/** Section order + nav labels. Reordering here reorders the nav. */
export type SectionId = 'intro' | 'trajectory' | 'work' | 'toolkit' | 'contact';

export type SectionMeta = {
  id: SectionId;
  navLabel: string;
};

export const sections: SectionMeta[] = [
  { id: 'intro', navLabel: 'Start' },
  { id: 'trajectory', navLabel: 'Path' },
  { id: 'work', navLabel: 'Work' },
  { id: 'toolkit', navLabel: 'Tools' },
  { id: 'contact', navLabel: 'Contact' },
];
