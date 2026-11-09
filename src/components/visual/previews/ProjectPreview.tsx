import type { ComponentType } from 'react';
import type { PreviewSketch, Project } from '@/data/projects';
import KanbanSketch from './KanbanSketch';

/** Every sketch a project can name in its `preview`. */
const SKETCHES: Record<PreviewSketch, ComponentType> = {
  kanban: KanbanSketch,
};

type ProjectPreviewProps = {
  preview: NonNullable<Project['preview']>;
};

/**
 * A looping sketch of what a project does, drawn in the site's own hairlines
 * rather than a screenshot. The drawing is hidden from assistive tech; the
 * caption says the same thing in words.
 *
 * All the motion lives in index.css: the loop itself, the pause while an
 * accordion row is shut, and the still frame under reduced motion.
 */
const ProjectPreview = ({ preview }: ProjectPreviewProps) => {
  const Sketch = SKETCHES[preview.sketch];

  return (
    <figure className="preview mt-6">
      {/* Wider on desktop so the sticky panel still fits a 768px-tall laptop. */}
      <div
        aria-hidden="true"
        className="relative aspect-video overflow-hidden rounded-sm border border-rule bg-paper lg:aspect-[5/2]"
      >
        <Sketch />
      </div>
      <figcaption className="mt-3 font-data text-xs text-ink-muted">
        {preview.caption}
      </figcaption>
    </figure>
  );
};

export default ProjectPreview;
