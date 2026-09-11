export type ToolGroup = {
  id: string;
  /** Honest heading — how often you actually reach for these. */
  label: string;
  note: string;
  items: string[];
};

export const toolGroups: ToolGroup[] = [
  {
    id: 'daily',
    label: 'Reach for every day',
    note: 'Fastest and most opinionated in these.',
    items: [
      'React',
      'TypeScript',
      'Claude Code',
      'Next.js',
      'Tailwind CSS',
      'React Query',
      'Zustand',
      'Axios',
      'Git',
    ],
  },
  {
    id: 'shipped',
    label: 'Have shipped with',
    note: 'Used in production, comfortable picking back up.',
    items: [
      'MobX',
      'Ant Design',
      'shadcn/ui',
      'React Leaflet',
      'Storybook',
      'HTML & CSS',
      'JavaScript',
    ],
  },
  {
    id: 'edges',
    label: 'Work at the edges of',
    note: 'Enough to unblock myself and the back end.',
    items: ['.NET API / Entity', 'Swagger', 'Wordpress'],
  },
  {
    id: 'working',
    label: 'How I work',
    note: 'Learned on teams, not from a course.',
    items: [
      'Agile & sprints',
      'Daily scrum',
      'Code review',
      'Component libraries',
      'Pairing with back-end devs',
    ],
  },
];
