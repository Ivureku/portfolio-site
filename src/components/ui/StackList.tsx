type StackListProps = {
  items: string[];
  /** Screen-reader label, since a bare list of tools has no context. */
  label: string;
  /** 'inline' reads as a caption; 'stacked' suits a narrow side column. */
  layout?: 'inline' | 'stacked';
};

/** Technologies as a hairline-separated list rather than pills. */
const StackList = ({ items, label, layout = 'inline' }: StackListProps) => {
  if (layout === 'stacked') {
    return (
      <ul aria-label={label} className="flex flex-col">
        {items.map((item) => (
          <li
            key={item}
            className="border-b border-rule/70 py-1.5 font-data text-xs text-ink-muted last:border-b-0"
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul aria-label={label} className="flex flex-wrap gap-x-3 gap-y-1.5">
      {items.map((item, index) => (
        <li key={item} className="flex items-center gap-3 font-data text-xs">
          {index > 0 ? (
            <span aria-hidden="true" className="h-3 w-px bg-rule" />
          ) : null}
          <span className="text-ink-muted">{item}</span>
        </li>
      ))}
    </ul>
  );
};

export default StackList;
