import Hero from '../components/home/Hero.jsx';
import WhoWeAre from '../components/home/WhoWeAre.jsx';
import FeaturedProperties from '../components/home/FeaturedProperties.jsx';
import ServicesSection from '../components/home/ServicesSection.jsx';
import WhyHorizon from '../components/home/WhyHorizon.jsx';
import TestimonialsSection from '../components/home/TestimonialsSection.jsx';
import TeamSection from '../components/home/TeamSection.jsx';
import CtaSection from '../components/home/CtaSection.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <FeaturedProperties />
      <ServicesSection />
      <WhyHorizon />
      <TestimonialsSection />
      <TeamSection />
      <CtaSection />
    </>
  );
}
