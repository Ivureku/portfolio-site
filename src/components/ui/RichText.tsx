type RichTextProps = {
  /** Plain copy from src/data. Wrap words in **double asterisks** to bold them. */
  text: string;
};

/**
 * Lets data files highlight a phrase without importing React. Splitting on a
 * capture group leaves the bolded runs at the odd indices.
 */
const RichText = ({ text }: RichTextProps) => (
  <>
    {text.split(/\*\*(.+?)\*\*/g).map((part, index) =>
      index % 2 === 1 ? (
        <strong key={index} className="font-semibold text-ink">
          {part}
        </strong>
      ) : (
        part
      )
    )}
  </>
);

export default RichText;
