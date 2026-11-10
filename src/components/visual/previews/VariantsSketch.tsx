/**
 * FYLP 2024: one component from the shared library, switched through its
 * variants the way the team browsed them in Storybook. A canvas holds the
 * button; a control under it steps Solid → Soft → Outline, and the button
 * restyles as each one is picked.
 *
 * The control's three options share the width equally, so its highlight
 * moves one option at a time by its own width (100%). The variants-* keyframes
 * in index.css drive the highlight and the button's colours on one loop.
 * Under reduced motion the classes here draw the first variant, picked.
 */
const VARIANTS = ['Solid', 'Soft', 'Outline'] as const;

const VariantsSketch = () => (
  <div className="variants absolute inset-0 flex flex-col gap-2 p-3">
    <div className="relative grid min-h-0 flex-1 place-items-center rounded-sm bg-paper-deep">
      <span className="absolute left-2 top-1.5 font-data text-xs text-ink-muted">
        Button
      </span>
      <span className="variants-button rounded-sm border border-accent bg-accent px-4 py-1.5 text-sm text-paper">
        Register
      </span>
    </div>

    <div className="flex items-center gap-2 font-data text-xs">
      {/* On phones the three options need the room, at any text size. */}
      <span className="shrink-0 text-ink-muted max-sm:hidden">variant</span>
      <div className="relative grid min-w-0 flex-1 grid-cols-3 rounded-sm border border-rule">
        <span className="variants-pick absolute inset-y-0 left-0 w-1/3 rounded-sm border border-accent" />
        {VARIANTS.map((variant) => (
          <span
            key={variant}
            className="truncate px-1.5 py-1 text-center text-ink-muted"
          >
            {variant}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default VariantsSketch;
