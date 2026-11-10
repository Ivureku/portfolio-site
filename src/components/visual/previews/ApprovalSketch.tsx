/**
 * Concept paper approval: a paper signed off office by office until it's
 * approved. Three offices sit on a line under the paper; each one's circle
 * takes a check in turn, the line fills toward the next, and once the last
 * has signed the status turns from Pending to Approved.
 *
 * The offices share the width equally, with no gap between columns, so the
 * line runs between the first and last circle centres — a sixth of the
 * width in from each side, set in index.css — and fills by half for each
 * office signed. The office count is written three times: grid-cols-3
 * here, the sixth in .approval-track, and the half steps and three sign
 * keyframes in index.css. Change them together. The approval-* keyframes
 * drive it. Under reduced motion the classes here show two of the
 * three offices signed, still pending: the paper partway through.
 */
const OFFICES = [
  { name: 'Adviser', sign: 'approval-sign-1', still: '' },
  { name: 'Dean', sign: 'approval-sign-2', still: '' },
  { name: 'Student Affairs', sign: 'approval-sign-3', still: 'opacity-0' },
] as const;

const TAG =
  'col-start-1 row-start-1 rounded-sm border px-1.5 py-0.5 text-center';

const ApprovalSketch = () => (
  <div className="approval absolute inset-0 flex flex-col justify-center gap-4 p-3 font-data text-xs">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0 flex-1">
        <p className="text-ink-muted">Concept paper</p>
        <span className="mt-1.5 block h-1 w-2/3 max-w-xs bg-ink/25" />
      </div>
      <span className="grid shrink-0">
        <span className={`approval-pending ${TAG} border-rule text-ink-muted`}>
          Pending
        </span>
        <span
          className={`approval-approved ${TAG} border-accent text-accent opacity-0`}
        >
          Approved
        </span>
      </span>
    </div>

    <div className="relative grid grid-cols-3">
      <span className="approval-track absolute top-2 h-px -translate-y-1/2 bg-rule">
        <span className="approval-line absolute inset-0 origin-left scale-x-50 bg-accent" />
      </span>
      {OFFICES.map((office) => (
        <div
          key={office.name}
          className="flex flex-col items-center gap-1.5 text-center"
        >
          <span className="relative h-4 w-4 rounded-full border border-rule bg-paper">
            <span
              className={`${office.sign} ${office.still} absolute -inset-px grid place-items-center rounded-full border border-accent bg-paper`}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-2.5 w-2.5 text-accent"
              >
                <path d="M2 6.5 4.5 9 10 3" />
              </svg>
            </span>
          </span>
          <span className="leading-tight text-ink-muted">{office.name}</span>
        </div>
      ))}
    </div>
  </div>
);

export default ApprovalSketch;
