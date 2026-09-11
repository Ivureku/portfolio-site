import { profile } from '@/data/profile';

const SiteFooter = () => (
  <footer className="border-t border-rule px-5 py-8 sm:px-8">
    <div className="mx-auto flex max-w-shell flex-col gap-2 font-data text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
      <p>
        {profile.fullName} — {profile.city}
      </p>
      <p>Built with React, TypeScript, and Tailwind CSS.</p>
    </div>
  </footer>
);

export default SiteFooter;
