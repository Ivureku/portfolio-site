/**
 * QA hub: a ticket dragged across the board, To test → Testing → Passed.
 *
 * The moving card rides in its own layer over the board, laid out on the
 * same grid, so the columns can clip their own cards without clipping it.
 * The card only ever travels sideways, which holds because every column has
 * the same number of resting cards above the slot a new card drops into, and
 * every column label stays on one line (whitespace-nowrap) whatever the
 * width or text size.
 *
 * The kanban-* keyframes in index.css drive it on one shared loop, and they
 * move the card one column at a time by its own width plus the column
 * padding (p-1.5, twice) and gap (gap-2) written here — change those
 * together.
 */
const COLUMNS = ['To test', 'Testing', 'Passed'] as const;

/** Bar widths for the two placeholder lines on each resting card. */
type Lines = readonly [string, string];

const RESTING: readonly (readonly [Lines, Lines])[] = [
  [
    ['w-3/4', 'w-1/2'],
    ['w-2/3', 'w-1/3'],
  ],
  [
    ['w-1/2', 'w-2/3'],
    ['w-3/4', 'w-1/4'],
  ],
  [
    ['w-2/3', 'w-1/2'],
    ['w-1/2', 'w-1/4'],
  ],
];

const MOVING: Lines = ['w-2/3', 'w-1/2'];

/** Two lines of text, abstracted to bars. */
const Bars = ({ lines }: { lines: Lines }) => (
  <>
    <span className={`block h-1 bg-ink/25 ${lines[0]}`} />
    <span className={`mt-1.5 block h-1 bg-ink/10 ${lines[1]}`} />
  </>
);

const Card = ({ lines }: { lines: Lines }) => (
  <div className="rounded-sm border border-rule bg-paper p-1.5">
    <Bars lines={lines} />
  </div>
);

/** A card-sized gap at the top of a column, outlined while a card is over it. */
const Slot = ({ outline }: { outline?: string }) => (
  <div className="relative rounded-sm border border-transparent p-1.5">
    <div className="invisible">
      <Bars lines={MOVING} />
    </div>
    {outline ? (
      <span
        className={`${outline} absolute -inset-px rounded-sm border border-dashed border-accent opacity-0`}
      />
    ) : null}
  </div>
);

const ColumnLabel = ({ label }: { label: string }) => (
  <p className="whitespace-nowrap px-0.5 font-data text-xs text-ink-muted">
    {label}
  </p>
);

const SLOT_OUTLINES = [undefined, 'kanban-slot-testing', 'kanban-slot-passed'];

const KanbanSketch = () => (
  <div className="kanban absolute inset-0">
    <div className="grid h-full grid-cols-3 gap-2 p-3">
      {COLUMNS.map((label, column) => (
        <div
          key={label}
          className="flex min-h-0 flex-col gap-1.5 overflow-hidden rounded-sm bg-paper-deep p-1.5"
        >
          <ColumnLabel label={label} />
          {RESTING[column].map((lines, index) => (
            <Card key={index} lines={lines} />
          ))}
          <Slot outline={SLOT_OUTLINES[column]} />
        </div>
      ))}
    </div>

    {/* The card being dragged, over the first column's slot. */}
    <div className="absolute inset-0 grid grid-cols-3 gap-2 p-3">
      <div className="flex flex-col gap-1.5 p-1.5">
        <div className="invisible">
          <ColumnLabel label={COLUMNS[0]} />
          {RESTING[0].map((lines, index) => (
            <div key={index} className="mt-1.5">
              <Card lines={lines} />
            </div>
          ))}
        </div>
        <div className="kanban-card relative rounded-sm border border-rule bg-paper p-1.5">
          <Bars lines={MOVING} />
          <span className="kanban-progress absolute inset-x-1.5 bottom-0.5 h-px origin-left scale-x-0 bg-accent" />
          <span className="kanban-ring absolute -inset-px rounded-sm border border-accent opacity-0" />
          <svg
            aria-hidden="true"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="kanban-check absolute right-1.5 top-1 h-2.5 w-2.5 text-accent opacity-0"
          >
            <path d="M2 6.5 4.5 9 10 3" />
          </svg>
          <svg
            aria-hidden="true"
            viewBox="0 0 12 16"
            strokeWidth="1"
            strokeLinejoin="round"
            className="kanban-cursor absolute -bottom-3 right-3 h-4 w-3 fill-ink stroke-paper opacity-0"
          >
            <path d="M1 1v11.5l3-3 2.4 5 2-1-2.4-4.8H10.5Z" />
          </svg>
        </div>
      </div>
    </div>
  </div>
);

export default KanbanSketch;
