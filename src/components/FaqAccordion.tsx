import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export type FaqItem = {
  question: string;
  answer: string;
};

const DEFAULT_FAQS: FaqItem[] = [
  {
    question: 'Are your pieces really handmade?',
    answer:
      'Yes — every Buneko piece is stitched by hand in our studio. No machines, no mass production. Small variations in stitching are part of what makes each piece one of a kind.',
  },
  {
    question: 'What yarn do you use?',
    answer:
      'We work with quality acrylic, cotton, and blended yarns chosen for softness, durability, and colorfastness. Every listing names the exact yarn so you know what you are getting.',
  },
  {
    question: 'Do you take custom orders?',
    answer:
      'Absolutely. Pick a design, choose your colors and size, and our makers will create it for you. Custom pieces usually take 7–10 days plus shipping time.',
  },
  {
    question: 'How do I care for crochet items?',
    answer:
      'Gentle hand wash in cold water with mild soap, reshape while damp, and dry flat away from direct sun. With this care, your piece will stay soft and shapely for years.',
  },
  {
    question: 'What about shipping and returns?',
    answer:
      'We ship across India in 3–5 working days, plastic-free with a handwritten note. Unused pieces can be returned within 7 days — custom orders excepted.',
  },
];

/**
 * Minimalist FAQ accordion — divider lines only, no cards, no shadows,
 * sharp corners. One panel open at a time, first item expanded by default.
 */
export default function FaqAccordion({ items = DEFAULT_FAQS }: { items?: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div key={item.question} className="faq-dots relative">
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : index)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-6 px-2 py-6 text-left md:py-8"
            >
              <span className="font-sans text-base font-bold text-text-primary md:text-lg">
                {item.question}
              </span>
              <ChevronDown
                aria-hidden="true"
                className={`h-5 w-5 shrink-0 text-text-secondary transition-transform duration-300 ease-in-out ${
                  open ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <p
                  className={`px-2 text-sm font-light leading-relaxed text-text-secondary transition-all delay-75 duration-300 ease-in-out md:text-base ${
                    open ? 'translate-y-0 pb-6 opacity-100 md:pb-8' : '-translate-y-1 opacity-0'
                  }`}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
