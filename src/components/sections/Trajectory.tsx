import { useEffect, useRef } from 'react';
import Section from '@/components/layout/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import RichText from '@/components/ui/RichText';
import StackList from '@/components/ui/StackList';
import { roles } from '@/data/experience';
import { useUiStore } from '@/store/useUiStore';

/**
 * The progression, oldest to newest. The left rail pins in place and swaps
 * as you scroll, so the year and organisation stay readable while you read
 * the detail beside them.
 */
const Trajectory = () => {
  const activeRoleId = useUiStore((state) => state.activeRoleId);
  const setActiveRoleId = useUiStore((state) => state.setActiveRoleId);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const entries = listRef.current?.querySelectorAll('[data-role-id]');
    if (!entries?.length) return;

    const observer = new IntersectionObserver(
      (observed) => {
        const visible = observed
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const id = visible?.target.getAttribute('data-role-id');
        if (id) setActiveRoleId(id);
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );

    entries.forEach((entry) => observer.observe(entry));
    return () => observer.disconnect();
  }, [setActiveRoleId]);

  const activeRole = roles.find((role) => role.id === activeRoleId) ?? roles[0];

  return (
    <Section id="trajectory">
      <SectionHeading
        title="Four years, one direction"
        lede="From a two-person student project to charging the front end of the systems."
      />

      <div className="grid gap-y-14 md:grid-cols-[15rem_1fr] md:gap-x-16 lg:grid-cols-[18rem_1fr]">
        <div className="hidden md:block">
          <div className="sticky top-28">
            <p
              aria-hidden="true"
              className="font-display text-6xl font-semibold leading-none tracking-tight text-accent transition-opacity duration-300 lg:text-7xl"
            >
              {activeRole.year}
            </p>
            <p aria-hidden="true" className="mt-3 text-sm text-ink-muted">
              {activeRole.org}
            </p>

            <ol aria-hidden="true" className="mt-8 flex flex-col gap-2">
              {roles.map((role) => (
                <li key={role.id} className="flex items-center gap-3">
                  <span
                    className={`h-px transition-all duration-300 ${
                      role.id === activeRole.id
                        ? 'w-10 bg-accent'
                        : 'w-4 bg-rule'
                    }`}
                  />
                  <span
                    className={`font-data text-[0.7rem] transition-colors duration-300 ${
                      role.id === activeRole.id ? 'text-ink' : 'text-ink-muted'
                    }`}
                  >
                    {role.year}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <ol ref={listRef} className="flex flex-col gap-20 sm:gap-28">
          {roles.map((role) => (
            <li key={role.id} data-role-id={role.id}>
              <Reveal>
                <article>
                  <p className="font-data text-xs text-ink-muted md:hidden">
                    {role.year}
                  </p>

                  <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1 md:mt-0">
                    <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
                      {role.title}
                    </h3>
                    {role.isCurrent ? (
                      <span className="flex items-center gap-1.5 font-data text-[0.7rem] text-live">
                        <span
                          aria-hidden="true"
                          className="inline-block h-1.5 w-1.5 rounded-full bg-live"
                        />
                        current
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-1.5 text-base text-ink">{role.org}</p>
                  <p className="mt-1 font-data text-xs text-ink-muted">
                    {role.period} — {role.location}
                  </p>

                  <div className="mt-5 lg:grid lg:grid-cols-[minmax(0,1fr)_12rem] lg:gap-x-12">
                    <div>
                      <p className="max-w-prose text-base leading-relaxed text-ink-muted">
                        <RichText text={role.summary} />
                      </p>

                      <ul className="mt-6 flex max-w-prose flex-col gap-3 border-l border-rule pl-5">
                        {role.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="text-[0.95rem] leading-relaxed"
                          >
                            <RichText text={highlight} />
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 lg:mt-1">
                      <StackList
                        items={role.stack}
                        label={`Tools used at ${role.org}`}
                        layout="stacked"
                      />
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
};

export default Trajectory;
