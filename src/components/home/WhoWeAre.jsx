import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { aboutImageMainId, aboutImageSideId } from '../../data/site.js';
import { photo, photoSrcSet } from '../../lib/images.js';
import Button from '../ui/Button.jsx';
import Reveal from '../ui/Reveal.jsx';

/** About block: editorial copy on the left, asymmetric image pairing right. */
export default function WhoWeAre() {
  return (
    <section className="section bg-paper" aria-labelledby="who-we-are-title">
      <div className="shell grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="max-w-xl">
          <p className="eyebrow">About Us</p>
          <h2 id="who-we-are-title" className="section-title mt-5">
            Who We Are
          </h2>
          <p className="body-lg mt-7">
            At Horizon Properties, we connect people with extraordinary homes and smart
            investments. Integrity, transparency, and client satisfaction are at the heart of
            everything we do.
          </p>
          <p className="mt-5 text-[15px] leading-[1.75] text-navy-400">
            Sixteen years, four advisors, and a deliberately short list of properties we are
            proud to put our name against.
          </p>
          <Button to="/about" variant="primary" icon={ArrowRight} className="mt-9">
            Learn More
          </Button>
        </Reveal>

        <Reveal delay={120} className="relative">
          <div className="grid grid-cols-5 gap-4 sm:gap-5">
            <div className="media zoomable col-span-3 aspect-[4/5]">
              <img
                src={photo(aboutImageMainId, 1280)}
                srcSet={photoSrcSet(aboutImageMainId)}
                sizes="(min-width: 1024px) 36vw, 55vw"
                alt="A modern luxury home with a swimming pool and glass facade"
                width={1280}
                height={1600}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="media zoomable col-span-2 mt-10 aspect-[3/4] sm:mt-14">
              <img
                src={photo(aboutImageSideId, 900)}
                srcSet={photoSrcSet(aboutImageSideId, [640, 960, 1280])}
                sizes="(min-width: 1024px) 24vw, 36vw"
                alt="A bright contemporary living room opening onto a terrace"
                width={900}
                height={1200}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <Link
            to="/properties"
            aria-label="Explore our property portfolio"
            className="group absolute left-[60%] top-[38%] hidden h-[68px] w-[68px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-lift transition-all duration-500 ease-premium hover:bg-navy-900 hover:text-white sm:inline-flex"
          >
            <ArrowUpRight
              aria-hidden="true"
              className="h-5 w-5 transition-transform duration-500 ease-premium group-hover:rotate-45"
              strokeWidth={1.8}
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
