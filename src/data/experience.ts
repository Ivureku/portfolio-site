export type Role = {
  id: string;
  /** Shown large in the sticky rail. Keep it to a year or a range. */
  year: string;
  org: string;
  title: string;
  period: string;
  location: string;
  /** One sentence. What you were actually responsible for. */
  summary: string;
  highlights: string[];
  stack: string[];
  isCurrent?: boolean;
};

/** Oldest first — the section reads as a progression from top to bottom. */
export const roles: Role[] = [
  {
    id: 'osa-2022',
    year: '2022',
    org: 'Office of Student Affairs',
    title: 'Front-End Developer',
    period: '2022',
    location: 'Ateneo de Davao University',
    summary:
      'First real client work: a two-person team building the approval system the department uses for events and bookings.',
    highlights: [
      'Built the web interface for a **Concept Paper Approval System** covering school events, proposals, and venue bookings.',
      'Shipped it as a team of two, which meant owning whole features end to end rather than isolated components.',
    ],
    stack: ['Next.js', 'React', 'Tailwind CSS', 'shadcn/ui'],
  },
  {
    id: 'samahan-2023',
    year: '2023—25',
    org: 'SAMAHAN Systems Development',
    title: 'Front-End Developer',
    period: '2023 – 2025',
    location: 'Ateneo de Davao University',
    summary:
      'Two years shipping public-facing sites for university organisations, on real deadlines with real users.',
    highlights: [
      'Built and launched fylp2024.com and the Ateneo Palaro 2024 site, both used by hundreds of student participants.',
      'Moved from plain React into typed React, with server state handled properly by **React Query**.',
      'Worked in Agile sprints with code review, which is where most of my habits around structure came from.',
      'Supervised and facilitated reviews of **Merge Requests** made by junior devs for codebase readability and maintainabaility',
    ],
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'React Query',
      'Axios',
      'Tailwind CSS',
    ],
  },
  {
    id: 'dcwd-2025',
    year: '2025',
    org: 'Davao City Water District',
    title: 'Front-End Developer Intern',
    period: 'January – April 2025',
    location: 'Gen. Douglas MacArthur Highway, Davao City',
    summary:
      'First look at enterprise software: an HR ERP with the density, edge cases, and permissions that come with it.',
    highlights: [
      'Developed pages and components for an HR ERP system used internally by the water district.',
      'Learned a second state model — **MobX** — alongside **React Query**, and where each one belongs.',
      'Daily scrums and sprint planning with a team that had been maintaining these systems for years.',
    ],
    stack: [
      'React',
      'TypeScript',
      'React Query',
      'Ant Design',
      'MobX',
      'Axios',
    ],
  },
  {
    id: 'dcwd-now',
    year: 'Now',
    org: 'Davao City Water District',
    title: 'Senior Computer Services Programmer',
    period: 'October 2025 – present',
    location: 'Gen. Douglas MacArthur Highway, Davao City',
    summary:
      'Came back hired six months later to lead the front end across several ERP projects for a utility serving the whole city.',
    highlights: [
      'Own front-end development for multiple **ERP systems**, from architecture decisions down to component APIs.',
      'Assist BE in writing simple API endpoints in .NET and document them in Swagger.',
      'Use **Claude Code** as part of my daily workflow with prompt engineering guidelines, and reviewing everything it writes before it ships.',
    ],
    stack: [
      'React',
      'TypeScript',
      'React Query',
      'Zustand',
      'Axios',
      '.NET',
      'Swagger',
    ],
    isCurrent: true,
  },
];
