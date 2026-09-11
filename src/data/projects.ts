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
  /** One project starts open. Make it the one you most want read. */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: 'emergency-tracking',
    name: 'Location tracking for emergency service vehicles',
    context: 'Capstone · Ateneo de Davao University',
    year: '2025',
    detail:
      'A dispatcher can only make good decisions if they know where the responding vehicle actually is. I built the web interface and the live map layer, so vehicle position, route, and status read at a glance instead of arriving as a list of coordinates.',
    stack: ['React', 'React Leaflet', 'JavaScript'],
    featured: true,
  },
  {
    id: 'erp-suite',
    name: 'ERP systems',
    context: 'Davao City Water District',
    year: '2025 – present',
    detail:
      'Several internal systems that staff spend their whole working day inside. My job is the front end: shared component patterns, server state through React Query, client state through Zustand, and forms that hold up against real operational data.',
    stack: ['React', 'TypeScript', 'React Query', 'Zustand', '.NET'],
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
    id: 'fylp-2024',
    name: 'FYLP 2024',
    context: 'SAMAHAN Systems Development',
    year: '2024',
    detail:
      'The public site for the First Year Leadership Program: registration, an application status checker, FAQs, and organisation pages. Built on a component library documented in Storybook so the rest of the team could reuse it.',
    stack: ['Next.js', 'React', 'Tailwind CSS', 'Storybook'],
    link: { label: 'fylp2024.com', href: 'https://www.fylp2024.com/' },
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
