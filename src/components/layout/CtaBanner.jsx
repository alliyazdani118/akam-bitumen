import Button from '../ui/Button.jsx';
import Reveal from '../ui/Reveal.jsx';

/** Closing call to action reused at the foot of the inner pages. */
export default function CtaBanner({
  title = 'Talk to us about your next supply requirement',
  description = 'Send us the grade or specification, volume, delivery point and timing. We will confirm what can be supplied and when.',
  primary = { label: 'Contact us', to: '/contact' },
  secondary = { label: 'Explore services', to: '/services' },
}) {
  return (
    <section className="border-t border-hairline bg-surface py-12 lg:py-14">
      <Reveal className="shell flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="max-w-2xl">
          <h2 className="text-[22px] font-bold leading-tight text-ink sm:text-[26px]">{title}</h2>
          <p className="mt-3 text-[13.5px] leading-relaxed text-muted">{description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {primary ? <Button to={primary.to}>{primary.label}</Button> : null}
          {secondary ? (
            <Button to={secondary.to} variant="outline">
              {secondary.label}
            </Button>
          ) : null}
        </div>
      </Reveal>
    </section>
  );
}
