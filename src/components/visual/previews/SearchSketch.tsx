/**
 * HR ERP: a search narrowing the employee records. "014" is typed, the rows
 * that don't match fade out, a match slides up into the gap, and the matched
 * digits light up. Then the search clears and every row comes back.
 *
 * Records are drawn the way the site draws its own index: rows between
 * hairlines, an ID in the mono face, bars standing in for the name and the
 * position, so no real person is shown.
 *
 * The search-* keyframes in index.css drive it. They carry the query's
 * length (3ch, typed in 3 steps) and the one-row shift — change them with
 * the rows below. Under reduced motion the classes here draw the filtered
 * state, since that is the frame that says what the feature does.
 */
const QUERY = '014';

type Row = {
  id: string;
  /** Widths of the bars standing in for the name and the position. */
  name: string;
  position: string;
  /** How this row moves when the search applies. */
  role: 'stay' | 'leave' | 'shift';
};

const ROWS: readonly Row[] = [
  { id: 'EMP-0142', name: 'w-1/2', position: 'w-1/4', role: 'stay' },
  { id: 'EMP-0305', name: 'w-2/5', position: 'w-1/3', role: 'leave' },
  { id: 'EMP-0147', name: 'w-3/5', position: 'w-1/5', role: 'shift' },
  { id: 'EMP-0291', name: 'w-1/3', position: 'w-1/4', role: 'leave' },
];

const ROLE_CLASS: Record<Row['role'], string> = {
  stay: '',
  leave: 'search-leave opacity-0',
  shift: 'search-shift -translate-y-full',
};

/** The ID, with the part the query matches marked. */
const RecordId = ({ id }: { id: string }) => {
  const at = id.indexOf(QUERY);
  if (at < 0) return <span className="text-ink-muted">{id}</span>;

  return (
    <span className="text-ink-muted">
      {id.slice(0, at)}
      <span className="search-match text-accent">{QUERY}</span>
      {id.slice(at + QUERY.length)}
    </span>
  );
};

const SearchSketch = () => (
  <div className="search absolute inset-0 p-3">
    <div className="flex items-center gap-2">
      <div className="relative flex h-8 min-w-0 flex-1 items-center gap-2 rounded-sm border border-rule bg-paper-deep px-2.5">
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          className="h-3.5 w-3.5 shrink-0 text-ink-muted"
        >
          <circle cx="7" cy="7" r="4.5" />
          <path d="m10.5 10.5 3.5 3.5" />
        </svg>
        <span className="grid min-w-0 font-data text-xs">
          <span className="search-placeholder col-start-1 row-start-1 truncate text-ink-muted opacity-0">
            Search by ID
          </span>
          <span className="col-start-1 row-start-1 flex items-center">
            <span className="search-typed overflow-hidden whitespace-nowrap text-ink">
              {QUERY}
            </span>
            <span className="search-caret ml-px h-3.5 w-px bg-accent opacity-0" />
          </span>
        </span>
        <span className="search-focus absolute -inset-px rounded-sm border border-accent opacity-0" />
      </div>

      <span className="relative inline-block shrink-0 whitespace-nowrap font-data text-xs text-ink-muted">
        {ROWS.length} records
        <span className="search-count absolute inset-0 bg-paper">
          {ROWS.filter((row) => row.id.includes(QUERY)).length} records
        </span>
      </span>
    </div>

    <ul className="mt-2 border-t border-rule">
      {ROWS.map((row) => (
        <li
          key={row.id}
          className={`${ROLE_CLASS[row.role]} flex items-center gap-3 border-b border-rule py-1 font-data text-xs`}
        >
          <RecordId id={row.id} />
          <span className="min-w-0 flex-1">
            <span className={`block h-1 bg-ink/25 ${row.name}`} />
          </span>
          <span className={`block h-1 bg-ink/25 ${row.position}`} />
        </li>
      ))}
    </ul>
  </div>
);

export default SearchSketch;
