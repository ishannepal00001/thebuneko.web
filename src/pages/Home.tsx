import SplitText from '../components/SplitText';
import ParallaxSection from '../components/parallax';
import ScrollAnimation from '../components/scroll-animation';
import ContactDisc from '../components/contact-disc';
import { useRef, useState } from 'react';
import { Link } from '@tanstack/react-router';
import Marquee from '../components/Marquee';
import BlurText from '../components/BlurText';
import AIChatInput from '../components/AIChatInput';
import FaqAccordion from '../components/FaqAccordion';
import Stepper, { Step } from '../components/Stepper';
import ImageTrail from '../components/ImageTrail';

const TRAIL_IMAGES = [
  'https://ik.imagekit.io/demo/tr:w-400,q-70,f-auto/img/image1.jpeg',
  'https://ik.imagekit.io/demo/tr:w-400,q-70,f-auto/img/image2.jpeg',
  'https://ik.imagekit.io/demo/tr:w-400,q-70,f-auto/img/image4.jpeg',
  'https://ik.imagekit.io/demo/tr:w-400,q-70,f-auto/img/image5.jpeg',
  'https://ik.imagekit.io/demo/tr:w-400,q-70,f-auto/img/image6.jpeg',
  'https://ik.imagekit.io/demo/tr:w-400,q-70,f-auto/img/image7.jpeg',
  'https://ik.imagekit.io/demo/tr:w-400,q-70,f-auto/img/image8.jpeg',
  'https://ik.imagekit.io/demo/tr:w-400,q-70,f-auto/img/image9.jpeg',
];
import { motion, useScroll, useSpring, useTransform } from 'motion/react';

export default function Home() {
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [contactSent, setContactSent] = useState(false);
  const { scrollYProgress } = useScroll({
    target: scrollSectionRef,
    offset: ['start end', 'end start'],
  });
  // Full-background colour slider sweeps in from the left — sequenced after
  // the hero panel has scaled in, so the two never play at once
  const sliderX = useSpring(useTransform(scrollYProgress, [0.45, 0.65], ['-100%', '0%']), {
    damping: 30,
    stiffness: 100,
  });

  return (
    <div className="bg-background text-text-primary">
      {/* Header wordmark with parallaxing backdrop text */}
      <ParallaxSection
        strength={120}
        background={
          <h3
            aria-hidden="true"
            className="flex h-full w-full select-none items-center justify-center whitespace-nowrap font-display text-[13vw] uppercase leading-none tracking-[0.05em] text-text-primary opacity-10"
          >
            Our Most Loved
          </h3>
        }
      >
        <header ref={heroRef} className="relative flex min-h-[80svh] items-center justify-center overflow-hidden px-6 py-16">
          {/* Cursor image trail behind the headline */}
          <div className="absolute inset-0 z-0" aria-hidden="true">
            <ImageTrail items={TRAIL_IMAGES} variant={1} />
          </div>
          <SplitText
            text="Handmade with love."
            tag="h1"
            className="relative z-10 max-w-6xl font-display text-5xl uppercase leading-[1.1] tracking-[0.15em] text-text-primary sm:text-6xl md:text-7xl lg:text-8xl"
            delay={70}
            duration={0.9}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
          <div className="absolute bottom-0 right-6 z-10 md:bottom-10 md:right-12">
            <ContactDisc href="#" />
          </div>
          <AIChatInput heroRef={heroRef} />
        </header>
      </ParallaxSection>

      {/* Features header — paused for now
      <section className="border-t border-border bg-background">
        <div className="mx-auto w-full max-w-7xl px-6 pb-10 pt-14 md:px-10 md:pt-20">
          <p className="font-display text-base italic text-text-secondary">
            Why Buneko
          </p>
          <h2 className="mt-2 font-display text-3xl uppercase tracking-[0.06em] text-text-primary md:text-5xl">
            Signature Features
          </h2>
        </div>
      </section>
      */}

      {/* Buneko hero inside the scroll section — colour slider sweeps over it */}
      <div ref={scrollSectionRef}>
      <ScrollAnimation
        overlay={
          <motion.div
            className="flex h-full w-full flex-col justify-between overflow-hidden bg-secondary py-6 md:py-8"
            style={{ x: sliderX }}
          >
            <Marquee className="w-full shrink-0" direction="ltr" tileClassName="h-36 w-48 mr-4 shrink-0 md:h-40 md:w-56 md:mr-6" />

            {/* Editorial wordmark with blur-in type, centred between marquees */}
            <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center overflow-hidden px-6 py-4 text-center">
              <BlurText
                text="The Wellness"
                animateBy="letters"
                delay={60}
                direction="top"
                className="justify-center font-display text-4xl italic leading-[1.05] text-background md:text-6xl"
              />
              <div aria-hidden="true" className="my-4 flex w-56 items-center gap-3 md:my-5 md:w-72">
                <span className="h-px flex-1 bg-background/60" />
                <span className="h-1.5 w-1.5 rotate-45 bg-background" />
                <span className="h-px flex-1 bg-background/60" />
              </div>
              <BlurText
                text="SPACE"
                animateBy="letters"
                delay={90}
                direction="bottom"
                className="ml-[0.5em] justify-center font-display text-xl font-bold uppercase tracking-[0.5em] text-background md:text-3xl"
              />
              <BlurText
                text="Slow rituals for soft living"
                animateBy="words"
                delay={40}
                direction="top"
                className="mt-4 justify-center font-sans text-[11px] font-light uppercase tracking-[0.3em] text-background/70 md:mt-5 md:text-xs"
              />
              <div aria-hidden="true" className="grain-overlay pointer-events-none absolute inset-0" />
            </div>

            <Marquee className="w-full shrink-0" direction="rtl" tileClassName="h-36 w-48 mr-4 shrink-0 md:h-40 md:w-56 md:mr-6" />
          </motion.div>
        }
      >
          <section className="flex h-full w-full flex-col overflow-hidden bg-background-accent">
            {/* Thin nav strip, cropped at the top edge */}

            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-10 md:px-10 md:py-14">
              <h1 className="text-center font-sans text-[7vw] font-black uppercase leading-[0.95] tracking-tight text-text-primary md:text-[5vw]">
                <span className="block">Say Hello To Buneko</span>
                <span className="block">Handmade Crochet & Yarn Goods</span>
                <span className="block">Crafted With Love</span>
              </h1>

              <p className="mx-auto mt-8 max-w-2xl text-center text-sm font-light leading-relaxed text-text-secondary md:mt-10 md:w-[42%] md:max-w-none md:text-base">
                At Buneko, every piece is stitched by hand with care. We offer a
                thoughtfully curated range of crochet creations and accessories to
                suit every style — from cozy everyday wear to one-of-a-kind gifts.
                Our team is here to help you find the perfect piece, made with
                quality yarn and genuine craftsmanship. Join us and discover the
                warmth of handmade!
              </p>

              <div className="mt-8 flex justify-center md:mt-10">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-sans text-xs font-medium uppercase tracking-[0.25em] text-on-primary transition-colors hover:bg-accent"
                >
                  See Products
                </Link>
              </div>
            </div>
          </section>
        </ScrollAnimation>
      </div>

      {/* FAQ + Contact side by side */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto w-full max-w-7xl px-6 py-14 md:px-10 md:py-20">
          <div className="flex flex-col gap-14 md:flex-row md:gap-12">
            {/* FAQ — flat accordion, dividers only */}
            <div className="flex-1">
              <p className="font-display text-base italic text-text-secondary">Good to know</p>
              <h2 className="mt-2 font-display text-3xl uppercase tracking-[0.06em] text-text-primary md:text-5xl">
                Questions
              </h2>
              <div className="mt-8 md:mt-10">
                <FaqAccordion />
              </div>
            </div>

            {/* Contact — 3-step form: name, number, message */}
            <div className="flex-1">
              <p className="font-display text-base italic text-text-secondary">Get in touch</p>
              <h2 className="mt-2 font-display text-3xl uppercase tracking-[0.06em] text-text-primary md:text-5xl">
                Contact
              </h2>
              <div className="mt-8 md:mt-10">
            {contactSent ? (
              <div className="mx-auto w-full bg-transparent px-8 py-12 text-center">
                <p className="font-display text-2xl uppercase tracking-[0.06em] text-text-primary md:text-3xl">
                  Thank you
                </p>
                <p className="mt-3 text-sm font-light leading-relaxed text-text-secondary">
                  Your message is on its way. A maker will get back to you within a day.
                </p>
              </div>
            ) : (
              <Stepper onFinalStepCompleted={() => setContactSent(true)} completeButtonText="Send">
                <Step>
                  <label htmlFor="contact-name" className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-text-secondary">
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Asha Sharma"
                    className="mt-3 w-full rounded-none border-0 bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-colors placeholder:text-text-secondary focus:bg-background-accent/50"
                  />
                </Step>
                <Step>
                  <label htmlFor="contact-number" className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-text-secondary">
                    Phone number
                  </label>
                  <input
                    id="contact-number"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+91 98765 43210"
                    className="mt-3 w-full rounded-none border-0 bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-colors placeholder:text-text-secondary focus:bg-background-accent/50"
                  />
                </Step>
                <Step>
                  <label htmlFor="contact-message" className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-text-secondary">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your custom order…"
                    className="mt-3 w-full resize-none rounded-none border-0 bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-colors placeholder:text-text-secondary focus:bg-background-accent/50"
                  />
                </Step>
              </Stepper>
            )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing footer — gives the scroll triggers a reachable end point */}
    </div>
  );
}
