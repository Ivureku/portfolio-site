import RouteMap from '@/components/visual/RouteMap';
import RichText from '@/components/ui/RichText';
import { profile } from '@/data/profile';

const Intro = () => (
  <section
    id="intro"
    className="relative flex min-h-[100svh] items-end overflow-hidden px-5 pb-14 pt-28 sm:px-8 sm:pb-20"
  >
    <RouteMap />

    <div className="relative mx-auto w-full max-w-shell">
      <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-data text-xs text-ink-muted">
        <span className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 rounded-full bg-live"
          />
          {profile.city}
        </span>
        <span aria-hidden="true" className="h-3 w-px bg-rule" />
        <span>
          {profile.coordinates.lat.toFixed(4)}° N,{' '}
          {profile.coordinates.lng.toFixed(4)}° E
        </span>
      </p>

      <h1 className="mt-5 font-display text-[clamp(2.9rem,10vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.03em]">
        {profile.nameLines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h1>

      <div className="mt-9 grid gap-8 border-t border-rule pt-7 md:grid-cols-[1fr_auto] md:items-start md:gap-16">
        <p className="max-w-prose text-lg leading-relaxed text-balance sm:text-xl">
          <RichText text={profile.statement} />
        </p>

        <dl className="grid gap-4 font-data text-xs sm:grid-cols-2 md:w-72 md:grid-cols-1">
          <div>
            <dt className="text-ink-muted">Currently</dt>
            <dd className="mt-1 leading-snug">{profile.currentRole}</dd>
          </div>
          <div>
            <dt className="text-ink-muted">Focus</dt>
            <dd className="mt-1 leading-snug">
              React and TypeScript front ends for internal business systems
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
);

export default Intro;
