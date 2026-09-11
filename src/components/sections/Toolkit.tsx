import Section from '@/components/layout/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import RichText from '@/components/ui/RichText';
import { toolGroups } from '@/data/toolkit';

const Toolkit = () => (
  <Section id="toolkit">
    <SectionHeading
      title="What I actually use"
      lede="Grouped by honesty rather than by category — how often I reach for something says more than a logo wall."
    />

    <div className="grid gap-x-16 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">
      {toolGroups.map((group, index) => (
        <Reveal key={group.id} delay={index * 80}>
          <div className="border-t border-rule pt-5">
            <h3 className="font-display text-lg font-semibold tracking-tight">
              {group.label}
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              <RichText text={group.note} />
            </p>

            <ul className="mt-5 flex flex-col">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="border-b border-rule/70 py-2 font-data text-sm last:border-b-0"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  </Section>
);

export default Toolkit;
