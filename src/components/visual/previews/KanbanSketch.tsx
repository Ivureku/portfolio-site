/**
 * QA Hub: ticket #12 dragged across the board, In progress → Fixed → Done.
 *
 * Drawn after the real board: an outlined status label with a ticket count
 * over each column, a ticket number and a stripe on each card, a dashed drop
 * zone. It shows three of the board's five columns, because five don't fit a
 * phone.
 *
 * The moving card rides in its own layer over the board, laid out on the
 * same grid, so the columns can clip their own cards without clipping it.
 * The card only ever travels sideways, which holds because every column has
 * the same number of resting cards above the slot a new card drops into, and
 * every header stays on one line (truncate) whatever the width or text size.
 *
 * The kanban-* keyframes in index.css drive it on one shared loop, and they
 * move the card one column at a time by its own width plus the column
 * padding (p-1.5, twice) and gap (gap-2) written here — change those
 * together.
 */
type Ticket = {
  id: number;
  /** Width of the bar standing in for the ticket's title. */
  title: string;
};

type Column = {
  label: string;
  /** The ticket count before and after #12 arrives or leaves. */
  counts: readonly [number, number];
  /** Animates the second count in. */
  countClass: string;
  /** Light up the label and the drop slot while #12 is dragged in. */
  labelClass?: string;
  slotClass?: string;
  resting: readonly [Ticket, Ticket];
};

const COLUMNS: readonly Column[] = [
  {
    label: 'In progress',
    counts: [3, 2],
    countClass: 'kanban-count-start',
    resting: [
      { id: 20, title: 'w-3/4' },
      { id: 31, title: 'w-1/2' },
    ],
  },
  {
    label: 'Fixed',
    counts: [2, 3],
    countClass: 'kanban-count-fixed',
    labelClass: 'kanban-label-fixed',
    slotClass: 'kanban-slot-fixed',
    resting: [
      { id: 37, title: 'w-2/3' },
      { id: 29, title: 'w-3/4' },
    ],
  },
  {
    label: 'Done',
    counts: [2, 3],
    countClass: 'kanban-count-done',
    labelClass: 'kanban-label-done',
    slotClass: 'kanban-slot-done',
    resting: [
      { id: 18, title: 'w-1/2' },
      { id: 15, title: 'w-2/3' },
    ],
  },
];

const MOVING: Ticket = { id: 12, title: 'w-2/3' };

const CARD =
  'relative flex items-center gap-1.5 rounded-sm border py-1.5 pl-2.5 pr-1.5';

const Header = ({
  column,
  still = false,
}: {
  column: Column;
  /** The spacer copy in the moving layer: same size, nothing animated. */
  still?: boolean;
}) => (
  <div className="flex min-w-0 items-center gap-1.5">
    <span
      className={`${still ? '' : (column.labelClass ?? '')} min-w-0 truncate rounded-sm border border-rule px-1 font-data text-xs text-ink-muted`}
    >
      {column.label}
    </span>
    {/* No room for the count beside "In progress" on a phone. */}
    <span className="relative hidden shrink-0 font-data text-xs text-ink-muted sm:inline-block">
      {column.counts[0]}
      {still ? null : (
        <span
          className={`${column.countClass} absolute inset-0 bg-paper-deep opacity-0`}
        >
          {column.counts[1]}
        </span>
      )}
    </span>
  </div>
);

/** Ticket number, then a bar for its title, in whatever room is left. */
const TicketLine = ({ ticket }: { ticket: Ticket }) => (
  <>
    <span className="absolute inset-y-0 left-0 w-0.5 bg-ink-muted" />
    <span className="font-data text-xs text-ink-muted">#{ticket.id}</span>
    <span className="min-w-0 flex-1">
      <span className={`block h-1 bg-ink/25 ${ticket.title}`} />
    </span>
  </>
);

const Card = ({ ticket }: { ticket: Ticket }) => (
  <div className={`${CARD} border-rule bg-paper`}>
    <TicketLine ticket={ticket} />
  </div>
);

/** A card-sized gap under a column's cards, outlined while a card is over it. */
const Slot = ({ outline }: { outline?: string }) => (
  <div className={`${CARD} border-transparent`}>
    <span className="invisible font-data text-xs">#{MOVING.id}</span>
    {outline ? (
      <span
        className={`${outline} absolute inset-0 rounded-sm border border-dashed border-accent opacity-0`}
      />
    ) : null}
  </div>
);

const KanbanSketch = () => (
  <div className="kanban absolute inset-0">
    <div className="grid h-full grid-cols-3 gap-2 p-3">
      {COLUMNS.map((column) => (
        <div
          key={column.label}
          className="flex min-h-0 min-w-0 flex-col gap-1.5 overflow-hidden rounded-sm bg-paper-deep p-1.5"
        >
          <Header column={column} />
          {column.resting.map((ticket) => (
            <Card key={ticket.id} ticket={ticket} />
          ))}
          <Slot outline={column.slotClass} />
        </div>
      ))}
    </div>

    {/* Ticket #12, over the first column's slot. */}
    <div className="absolute inset-0 grid grid-cols-3 gap-2 p-3">
      <div className="flex min-w-0 flex-col gap-1.5 p-1.5">
        <div className="invisible flex flex-col gap-1.5">
          <Header column={COLUMNS[0]} still />
          {COLUMNS[0].resting.map((ticket) => (
            <Card key={ticket.id} ticket={ticket} />
          ))}
        </div>
        <div className={`${CARD} kanban-card border-rule bg-paper`}>
          <TicketLine ticket={MOVING} />
          <svg
            aria-hidden="true"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="kanban-check h-2.5 w-2.5 shrink-0 text-accent opacity-0"
          >
            <path d="M2 6.5 4.5 9 10 3" />
          </svg>
          <span className="kanban-progress absolute bottom-0 left-2.5 right-1.5 h-px origin-left scale-x-0 bg-accent" />
          <span className="kanban-ring absolute -inset-px rounded-sm border border-accent opacity-0" />
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
