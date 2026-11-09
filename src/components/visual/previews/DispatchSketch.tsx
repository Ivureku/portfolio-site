import type { CSSProperties } from 'react';

/**
 * Emergency vehicle tracking: a unit followed along its route on the live
 * map until it's on scene, with its status beside the map.
 *
 * Everything is placed in one coordinate system, percent of the frame: the
 * SVG's 100×100 viewBox is stretched to the frame (preserveAspectRatio none,
 * with strokes that don't stretch), and the unit and the pin are positioned
 * in the same percentages. ROUTE is the one source: it draws the line, and
 * it reaches the dispatch-unit keyframes in index.css as --x0…--y4.
 *
 * The unit is accent, not the intro map's ochre: ochre stays reserved for
 * "live now". Under reduced motion the classes here draw the unit partway
 * along, en route.
 */
const ROUTE = [
  [12, 85],
  [12, 55],
  [56, 55],
  [56, 25],
  [78, 25],
] as const;

const VERTICAL_STREETS = [12, 34, 56, 78];
const HORIZONTAL_STREETS = [25, 55, 85];

const routeProperties = Object.fromEntries(
  ROUTE.flatMap(([x, y], index) => [
    [`--x${index}`, `${x}%`],
    [`--y${index}`, `${y}%`],
  ])
) as CSSProperties;

const [destinationX, destinationY] = ROUTE[ROUTE.length - 1];

const DispatchSketch = () => (
  <div className="dispatch absolute inset-0" style={routeProperties}>
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      fill="none"
      className="absolute inset-0 h-full w-full"
    >
      <g className="stroke-rule" strokeWidth="1">
        {VERTICAL_STREETS.map((x) => (
          <line
            key={`v-${x}`}
            x1={x}
            y1="0"
            x2={x}
            y2="100"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {HORIZONTAL_STREETS.map((y) => (
          <line
            key={`h-${y}`}
            x1="0"
            y1={y}
            x2="100"
            y2={y}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
      <polyline
        points={ROUTE.map(([x, y]) => `${x},${y}`).join(' ')}
        className="stroke-accent"
        strokeWidth="2"
        strokeOpacity="0.45"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>

    {/* Destination: a ring that fills once the unit arrives. */}
    <span
      className="absolute grid h-3 w-3 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-accent bg-paper"
      style={{ left: `${destinationX}%`, top: `${destinationY}%` }}
    >
      <span className="dispatch-arrived h-1.5 w-1.5 rounded-full bg-accent opacity-0" />
    </span>

    <span className="dispatch-unit absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent">
      <span className="absolute -inset-1 rounded-full border border-accent/40" />
    </span>

    {/* Status, where a dispatcher would read it. Both are eight characters
        in the mono face, so the box never changes width. */}
    <span className="absolute bottom-3 right-3 flex items-center gap-1.5 whitespace-nowrap rounded-sm border border-rule bg-paper px-1.5 py-0.5 font-data text-xs">
      <span className="text-ink">Unit 7</span>
      <span className="text-ink-muted">·</span>
      <span className="grid">
        <span className="dispatch-en-route col-start-1 row-start-1 text-ink-muted">
          En route
        </span>
        <span className="dispatch-on-scene col-start-1 row-start-1 text-accent opacity-0">
          On scene
        </span>
      </span>
    </span>
  </div>
);

export default DispatchSketch;
