/**
 * Palaro 2024: the day's schedule, with what's on now highlighted as the day
 * moves along. Four events hang off a thin timeline; a band marked "Now"
 * steps down it one event at a time, then fades back to the first.
 *
 * Every row is the same height (h-7), so the band moves one event by its own
 * height (100%). It is laid out on the same grid as the rows, sized by an
 * invisible copy of a time, so its dot lands on the timeline. The schedule-*
 * keyframes in index.css drive it. Under reduced motion the classes here
 * leave it on the second event, partway through the day.
 */
const EVENTS = [
  { time: '09:00', name: 'Basketball' },
  { time: '10:30', name: 'Volleyball' },
  { time: '13:00', name: 'Football' },
  { time: '15:00', name: 'Athletics' },
] as const;

/** Time, timeline, event, and room for the "Now" tag. */
const ROW =
  'grid h-7 grid-cols-[auto_0.75rem_minmax(0,1fr)_auto] items-center gap-x-2 px-2';

const ScheduleSketch = () => (
  <div className="schedule absolute inset-0 p-3 font-data text-xs">
    <p className="text-ink-muted">Day 3 of 5</p>

    <div className="relative mt-1.5">
      <ul>
        {EVENTS.map((event, index) => (
          <li key={event.time} className={ROW}>
            <span className="text-ink-muted">{event.time}</span>
            {/* A segment of the timeline per row, so the line is continuous;
                it starts at the first dot and ends at the last. */}
            <span className="relative grid h-full place-items-center">
              <span
                className={`absolute w-px bg-rule ${index === 0 ? 'bottom-0 top-1/2' : index === EVENTS.length - 1 ? 'bottom-1/2 top-0' : 'inset-y-0'}`}
              />
              <span className="relative h-1.5 w-1.5 rounded-full border border-ink-muted bg-paper" />
            </span>
            <span className="truncate text-ink">{event.name}</span>
            <span className="invisible">Now</span>
          </li>
        ))}
      </ul>

      {/* What's on now, over the second event in the still frame. */}
      <div
        className={`schedule-now ${ROW} absolute inset-x-0 top-0 translate-y-full rounded-sm bg-accent/10`}
      >
        <span className="invisible">{EVENTS[0].time}</span>
        <span className="grid place-items-center">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
        <span />
        <span className="text-accent">Now</span>
        <span className="absolute inset-y-0 left-0 w-0.5 rounded-sm bg-accent" />
      </div>
    </div>
  </div>
);

export default ScheduleSketch;
