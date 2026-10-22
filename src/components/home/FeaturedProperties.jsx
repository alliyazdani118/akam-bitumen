import { ArrowRight } from 'lucide-react';
import { getFeaturedProperties } from '../../lib/api.js';
import Button from '../ui/Button.jsx';
import Reveal from '../ui/Reveal.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import PropertyCarousel from '../property/PropertyCarousel.jsx';

export default function FeaturedProperties() {
  const properties = getFeaturedProperties(8);

  return (
    <section className="section bg-white" aria-labelledby="featured-properties-title">
      <div className="shell">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Featured"
            title="Featured Properties"
            copy="A short, deliberately curated selection of the homes and investments we are representing right now."
            titleClassName=""
          />
        </Reveal>

        <Reveal delay={120} className="mt-12 lg:mt-14">
          <PropertyCarousel properties={properties} ariaLabel="Featured properties carousel" />
        </Reveal>

        <Reveal delay={160} className="mt-10 flex justify-center">
          <Button to="/properties" variant="outlineDark" icon={ArrowRight}>
            View all properties
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
