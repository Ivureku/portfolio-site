import type { ComponentType } from 'react';
import type { PreviewSketch, Project } from '@/data/projects';
import KanbanSketch from './KanbanSketch';
import ReadingSketch from './ReadingSketch';
import SearchSketch from './SearchSketch';

/** Every sketch a project can name in its `preview`. */
const SKETCHES: Record<PreviewSketch, ComponentType> = {
  kanban: KanbanSketch,
  reading: ReadingSketch,
  search: SearchSketch,
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
 *
 * The caller sets the margin above it, as with StackList.
 */
const ProjectPreview = ({ preview }: ProjectPreviewProps) => {
  const Sketch = SKETCHES[preview.sketch];

  return (
    <figure className="preview">
      {/* A height in rem, not a ratio of the width: the sketches are sized in
          rem, so frame and drawing grow together when a visitor enlarges
          their text, and a wide tablet row doesn't open up empty board.
          Every sketch is drawn to fit it. */}
      <div
        aria-hidden="true"
        className="relative h-44 overflow-hidden rounded-sm border border-rule bg-paper"
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
