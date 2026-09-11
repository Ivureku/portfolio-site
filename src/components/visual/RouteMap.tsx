import { useUiStore } from '@/store/useUiStore';

/**
 * The one bold moment on the page: an abstract street grid with a vehicle
 * tracing a route, echoing the capstone project. Decorative, so it is hidden
 * from assistive tech — every fact it implies is also written in the text.
 *
 * The mask fades the map out toward the bottom-left so the headline and the
 * intro paragraph always sit on clean paper. Retune with the constants below.
 */
const VERTICAL_STREETS = [90, 185, 280, 375, 470, 565, 660];
const HORIZONTAL_STREETS = [90, 180, 270, 360, 450, 540];

const ROUTE =
  'M 210 560 L 210 395 L 390 395 L 390 265 L 560 265 L 560 145 L 705 145';

const COAST =
  'M 900 0 C 800 110 845 270 745 370 C 685 430 725 545 665 640 L 900 640 Z';

const LEGIBILITY_MASK =
  'linear-gradient(to top right, transparent 6%, rgba(0,0,0,0.35) 38%, #000 74%)';

const RouteMap = () => {
  const prefersReducedMotion = useUiStore(
    (state) => state.prefersReducedMotion
  );

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 900 640"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{
        maskImage: LEGIBILITY_MASK,
        WebkitMaskImage: LEGIBILITY_MASK,
      }}
    >
      <g stroke="rgb(var(--color-ink))" strokeWidth="1" opacity="0.1">
        {VERTICAL_STREETS.map((x) => (
          <line key={`v-${x}`} x1={x} y1="0" x2={x + 26} y2="640" />
        ))}
        {HORIZONTAL_STREETS.map((y) => (
          <line key={`h-${y}`} x1="0" y1={y} x2="900" y2={y + 18} />
        ))}
      </g>

      {/* Water sits over the grid so the coastline reads as a real edge. */}
      <path d={COAST} fill="rgb(var(--color-paper))" />
      <path d={COAST} fill="rgb(var(--color-accent))" opacity="0.06" />
      <path
        d={COAST}
        fill="none"
        stroke="rgb(var(--color-accent))"
        strokeWidth="1.25"
        opacity="0.35"
      />

      <path
        id="intro-route"
        d={ROUTE}
        fill="none"
        stroke="rgb(var(--color-accent))"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
        className="route-line"
      />

      <circle cx="705" cy="145" r="3.5" fill="rgb(var(--color-accent))" />

      <g transform={prefersReducedMotion ? 'translate(390, 265)' : undefined}>
        {!prefersReducedMotion && (
          <animateMotion dur="13s" repeatCount="indefinite" rotate="0">
            <mpath href="#intro-route" />
          </animateMotion>
        )}
        <circle
          className={prefersReducedMotion ? undefined : 'pulse-ring'}
          r="7"
          fill="none"
          stroke="rgb(var(--color-live))"
          strokeWidth="1.5"
        />
        <circle r="5" fill="rgb(var(--color-live))" />
      </g>
    </svg>
  );
};

export default RouteMap;
