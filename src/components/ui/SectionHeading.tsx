import Reveal from '@/components/ui/Reveal';
import RichText from '@/components/ui/RichText';

type SectionHeadingProps = {
  title: string;
  /** One sentence of context. Keep it under two lines. */
  lede?: string;
};

const SectionHeading = ({ title, lede }: SectionHeadingProps) => (
  <Reveal className="mb-14 border-t border-rule pt-5 sm:mb-20">
    <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
      {title}
    </h2>
    {lede ? (
      <p className="mt-3 max-w-prose text-base leading-relaxed text-ink-muted">
        <RichText text={lede} />
      </p>
    ) : null}
  </Reveal>
);

export default SectionHeading;
