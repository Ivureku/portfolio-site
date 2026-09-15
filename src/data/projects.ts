export type Project = {
  id: string;
  name: string;
  /** Where it lived — org, course, or client. */
  context: string;
  year: string;
  /** Two or three sentences, revealed when the row is opened. */
  detail: string;
  stack: string[];
  link?: { label: string; href: string };
  /**
   * For work whose live site has gone. The screenshots stand in for the link
   * that would otherwise sit here, and `note` says why there isn't one.
   */
  archive?: {
    /** Shown above the screenshots. One sentence on where the site went. */
    note: string;
    /**
     * `src` is a path inside public/ with no leading slash. ArchiveViewer
     * prefixes the deploy base, so it still resolves under a subpath.
     */
    shots: { src: string; alt: string; caption: string }[];
  };
  /** One project starts open. Make it the one you most want read. */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: 'erp-suite',
    name: 'ERP systems',
    context: 'Davao City Water District',
    // year: '2025 – present',
    year: '2025 – 2026',
    detail:
      'Several internal systems that staff spend their whole working day inside. My job is the front end: shared component patterns, server state through React Query, client state through Zustand, and forms that hold up against real operational data.',
    stack: ['React', 'TypeScript', 'React Query', 'Zustand', '.NET'],
    featured: true,
  },
  {
    id: 'hr-erp',
    name: 'HR ERP system',
    context: 'Davao City Water District',
    year: '2025',
    detail:
      'Pages and components for the module handling employee records and HR workflows, built on Ant Design with MobX for local state. My first time working inside an established enterprise codebase rather than starting one.',
    stack: ['React', 'TypeScript', 'Ant Design', 'MobX', 'React Query'],
  },
  {
    id: 'emergency-tracking',
    name: 'Location tracking for emergency service vehicles',
    context: 'Capstone · Ateneo de Davao University',
    year: '2025',
    detail:
      'A dispatcher can only make good decisions if they know where the responding vehicle actually is. I built the web interface and the live map layer, so vehicle position, route, and status read at a glance instead of arriving as a list of coordinates.',
    stack: ['React', 'React Leaflet', 'JavaScript'],
  },
  {
    id: 'fylp-2024',
    name: 'FYLP 2024',
    context: 'SAMAHAN Systems Development',
    year: '2024',
    detail:
      'The public site for the First Year Leadership Program: registration, an application status checker, FAQs, and organisation pages. Built on a component library documented in Storybook so the rest of the team could reuse it.',
    stack: ['Next.js', 'React', 'Tailwind CSS', 'Storybook'],
    archive: {
      note: 'The domain lapsed after the programme ran, so fylp2024.com no longer resolves to the site. Archived here instead.',
      shots: [
        {
          src: 'archive/fylp/home.png',
          alt: 'The FYLP 2024 landing page: the programme wordmark in primary colours beside a collage of geometric shapes, above a register call to action.',
          caption: 'Landing page',
        },
        {
          src: 'archive/fylp/register.png',
          alt: 'The application page, explaining the delegate and mentor routes with an eligibility list under each.',
          caption: 'Application routes',
        },
        {
          src: 'archive/fylp/home-mobile.png',
          alt: 'The same landing page at phone width, the navigation collapsed behind a menu button.',
          caption: 'Landing page at phone width',
        },
      ],
    },
  },
  {
    id: 'palaro-2024',
    name: 'Palaro 2024',
    context: 'SAMAHAN Systems Development',
    year: '2024',
    detail:
      'Site for the university-wide sports festival, covering schedules and event information for a campus-sized audience during the one week it mattered most.',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    link: {
      label: 'samahan.addu.edu.ph/palaro-2024',
      href: 'https://samahan.addu.edu.ph/palaro-2024/',
    },
  },
  {
    id: 'concept-paper',
    name: 'Concept paper approval system',
    context: 'Office of Student Affairs',
    year: '2022',
    detail:
      'A web app that moves student event proposals, bookings, and concept papers through the offices that have to sign them. It replaced a paper trail with something people could check the status of.',
    stack: ['Next.js', 'React', 'Tailwind CSS', 'shadcn/ui'],
  },
];
