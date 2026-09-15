/**
 * Everything about you that appears in more than one place.
 * Edit here, not in the components.
 */
export const profile = {
  fullName: 'Kervi Kent C. Asombrado',
  /** The intro headline, one line per array item. */
  nameLines: ['Kervi Kent', 'Asombrado'],
  shortName: 'Kervi Asombrado',
  /** Header brand on phones. */
  initials: 'KA',
  title: 'Front-End Developer',
  /** The label/role pair in the intro. Swap which pair is commented out. */
  // roleLabel: 'Currently',
  // currentRole: 'Senior Computer Services Programmer, Davao City Water District',
  roleLabel: 'Most recently',
  currentRole:
    'Senior Computer Services Programmer (project-based), Davao City Water District',
  city: 'Davao City, Philippines',

  /** Used for the map readout in the intro. Davao City centre. */
  coordinates: { lat: 7.0731, lng: 125.6128 },

  /** Yes, it's real. */
  email: 'insertmailherelol@gmail.com',
  /** Tooltip on the email address in the contact section. */
  emailNote: 'Yes, that is my actual email.',
  github: 'https://github.com/Ivureku',
  githubHandle: 'Ivureku',
  /** Header badge beside GitHub. */
  linkedin: 'https://www.linkedin.com/in/kervi-asombrado-5ab64b361/',

  /**
   * The contact CTA downloads this. Drop the PDF into public/ under this
   * exact name; `fileName` is what it saves as on the visitor's machine.
   * No leading slash: Contact.tsx prefixes the deploy base, so the link still
   * resolves when the site is served from a subpath.
   */
  resume: {
    href: 'Asombrado-Resume.pdf',
    fileName: 'Asombrado-Resume.pdf',
  },

  /**
   * The intro paragraph. Keep it short; it sits over the map.
   * Wrap a phrase in **double asterisks** to bold it — this works in every
   * description on the site (summaries, highlights, project details, ledes).
   */
  statement:
    'Front-end developer with four years of experience building production web applications in React and TypeScript. ',

  /** Shown in the contact section. */
  availability:
    'Email is the fastest way to reach me. Most of what I can show publicly is on GitHub.',
} as const;
