import { useEffect, useRef, type PointerEvent } from 'react';
import Section from '@/components/layout/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import RichText from '@/components/ui/RichText';
import StackList from '@/components/ui/StackList';
import ArchiveViewer from '@/components/ui/ArchiveViewer';
import { projects, type Project } from '@/data/projects';
import { useUiStore } from '@/store/useUiStore';

/** Matches Tailwind's `lg` — where the list gains a side panel. */
const DESKTOP_QUERY = '(min-width: 1024px)';

/**
 * How long the pointer has to rest on a row before the panel swaps. Long
 * enough that cutting diagonally across rows toward a link in the panel
 * doesn't flick through every project on the way.
 */
const HOVER_INTENT_MS = 140;

const isDesktop = () => window.matchMedia(DESKTOP_QUERY).matches;

/**
 * What closes a project panel: an archive where the site has gone, a link
 * where it's still up, nothing where there was never anything to visit.
 */
const ProjectTail = ({ project }: { project: Project }) => {
  if (project.archive) {
    return (
      <ArchiveViewer archive={project.archive} projectName={project.name} />
    );
  }

  return project.link ? (
    <a
      href={project.link.href}
      target="_blank"
      rel="noreferrer noopener"
      className="mt-5 inline-block border-b border-accent/40 pb-0.5 font-data text-xs text-accent transition-colors duration-200 hover:border-accent"
    >
      {project.link.label}
    </a>
  ) : null;
};

/**
 * Projects as an index rather than a grid of cards. Rows stay dense and
 * scannable. On desktop the detail sits in a sticky panel that follows the
 * pointer; rows never change height, so nothing jumps out from under the
 * cursor. Below `lg` the rows open in place like an accordion.
 */
const Work = () => {
  const openProjectId = useUiStore((state) => state.openProjectId);
  const toggleProject = useUiStore((state) => state.toggleProject);
  const selectProject = useUiStore((state) => state.selectProject);
  const hoverTimer = useRef<number>();

  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  /** The panel always shows something, even if a phone-width visitor closed every row. */
  const activeProject =
    projects.find((project) => project.id === openProjectId) ?? projects[0];

  const handleClick = (id: string) =>
    isDesktop() ? selectProject(id) : toggleProject(id);

  const handlePointerEnter = (event: PointerEvent, id: string) => {
    if (event.pointerType !== 'mouse' || !isDesktop()) return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(
      () => selectProject(id),
      HOVER_INTENT_MS
    );
  };

  const handlePointerLeave = () => window.clearTimeout(hoverTimer.current);

  return (
    <Section id="work" className="bg-paper-deep">
      <SectionHeading
        title="Selected work"
        lede="Mostly software that people are required to use, which is a harder brief than software people choose to use. Select a project for the detail."
      />

      <div className="lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-x-16">
        <ul className="border-t border-rule">
          {projects.map((project, index) => {
            const isOpen = openProjectId === project.id;
            const isActive = activeProject.id === project.id;
            const panelId = `project-panel-${project.id}`;

            return (
              <li key={project.id} className="border-b border-rule">
                <Reveal delay={index * 60}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => handleClick(project.id)}
                      onPointerEnter={(event) =>
                        handlePointerEnter(event, project.id)
                      }
                      onPointerLeave={handlePointerLeave}
                      aria-expanded={isOpen}
                      aria-controls={`${panelId} project-detail`}
                      className="group grid w-full grid-cols-[3.5rem_1fr_1.5rem] items-baseline gap-x-4 py-6 text-left sm:grid-cols-[6rem_1fr_2rem] sm:gap-x-8 lg:grid-cols-[5rem_1fr_1.5rem] lg:gap-x-6"
                    >
                      <span className="font-data text-xs text-ink-muted">
                        {project.year}
                      </span>

                      <span>
                        <span
                          className={`block font-display text-xl font-medium leading-snug tracking-tight transition-colors duration-200 group-hover:text-accent sm:text-2xl ${
                            isOpen
                              ? 'text-accent'
                              : isActive
                                ? 'lg:text-accent'
                                : ''
                          }`}
                        >
                          {project.name}
                        </span>
                        <span className="mt-1 block text-sm text-ink-muted">
                          {project.context}
                        </span>
                      </span>

                      {/* Plus/minus for the accordion. */}
                      <span
                        aria-hidden="true"
                        className="relative mt-2 h-3 w-3 self-center justify-self-end lg:hidden"
                      >
                        <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-ink-muted" />
                        <span
                          className={`absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-ink-muted transition-transform duration-300 ${
                            isOpen ? 'scale-y-0' : 'scale-y-100'
                          }`}
                        />
                      </span>

                      {/* Arrow pointing at the panel, for the side-by-side layout. */}
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`hidden h-4 w-4 self-center justify-self-end transition-all duration-300 lg:block ${
                          isActive
                            ? 'translate-x-0 text-accent opacity-100'
                            : '-translate-x-1.5 text-ink-muted opacity-0 group-hover:opacity-60'
                        }`}
                      >
                        <path d="M2 8h11M9 4l4 4-4 4" />
                      </svg>
                    </button>
                  </h3>
                </Reveal>

                {/* Inert while shut: grid-rows 0fr hides the content but
                    leaves it in the tab order, so a keyboard visitor could
                    land on links inside a row that looks closed. React 18 has
                    no inert prop, so it's set on the node directly. */}
                <div
                  ref={(node) => {
                    if (node) node.inert = !isOpen;
                  }}
                  className="disclosure lg:hidden"
                  data-open={isOpen}
                >
                  <div>
                    <div
                      id={panelId}
                      className="grid gap-6 pb-8 sm:grid-cols-[6rem_1fr] sm:gap-x-8"
                    >
                      <div className="hidden sm:block" />
                      <div>
                        <p className="max-w-prose text-base leading-relaxed">
                          <RichText text={project.detail} />
                        </p>

                        <div className="mt-5">
                          <StackList
                            items={project.stack}
                            label={`Tools used on ${project.name}`}
                          />
                        </div>

                        <ProjectTail project={project} />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:block">
          <Reveal className="sticky top-28">
            <div
              id="project-detail"
              role="region"
              aria-label="Project detail"
              className="border-t border-rule pt-6"
            >
              {/* Keyed so each swap remounts and replays the fade-in. */}
              <div key={activeProject.id} className="detail-swap">
                <p className="font-data text-xs text-ink-muted">
                  {activeProject.year} · {activeProject.context}
                </p>
                <p className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight">
                  {activeProject.name}
                </p>
                <p className="mt-5 max-w-prose text-lg leading-relaxed">
                  <RichText text={activeProject.detail} />
                </p>

                <div className="mt-6">
                  <StackList
                    items={activeProject.stack}
                    label={`Tools used on ${activeProject.name}`}
                  />
                </div>

                <ProjectTail project={activeProject} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
};

export default Work;
