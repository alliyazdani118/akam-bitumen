import Hero from '../components/home/Hero.jsx';
import ServicesSection from '../components/home/ServicesSection.jsx';
import StatsBanner from '../components/home/StatsBanner.jsx';
import WhyChooseUs from '../components/home/WhyChooseUs.jsx';
import TestimonialsSection from '../components/home/TestimonialsSection.jsx';
import NewsletterBanner from '../components/layout/NewsletterBanner.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

export default function Home() {
  useDocumentTitle('Bitumen Supply & Industrial Solutions');

  return (
    <>
      <Hero />
      <ServicesSection />
      <StatsBanner />
      <WhyChooseUs />
      <TestimonialsSection />
      <NewsletterBanner />
    </>
  );
}
