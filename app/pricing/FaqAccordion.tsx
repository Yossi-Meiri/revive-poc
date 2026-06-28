'use client';

import { useState } from 'react';
import styles from './page.module.css';

const faqs = [
  {
    q: 'What if my photo is very damaged?',
    a: "Send it anyway. Cracks, water damage, fading, missing corners — our team repairs all of it by hand before animating. If a photo truly can’t be saved, we’ll tell you before any work begins and refund you in full.",
  },
  {
    q: 'How does the personal message work?',
    a: 'At checkout you write a short message in your own words — something like “Happy 70th, Dad. With love, the kids.” We fade it in over the final frames, so the film closes on something only you could say.',
  },
  {
    q: 'What format is the film delivered in?',
    a: 'You receive a private link that opens full-screen on any phone or computer — ready to share on WhatsApp or play at a dinner table. You can also download the film as a standard video file to keep forever.',
  },
  {
    q: "What if I'm not happy?",
    a: "Tell us. Memory Film and Legacy Film include revision passes, and if the film still isn't right for you, we offer a full refund. This is a gift — it has to feel like one.",
  },
];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (i: number) => setOpen(open === i ? null : i);

  return (
    <section className={styles.faq}>
      <h2 className={styles.faqH2}>Questions, answered.</h2>
      <div className={styles.faqList}>
        {faqs.map((item, i) => (
          <div
            key={i}
            className={styles.faqItem}
            onClick={() => toggle(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && toggle(i)}
            aria-expanded={open === i}
          >
            <div className={styles.faqRow}>
              <h3 className={styles.faqQ}>{item.q}</h3>
              <span
                className={`${styles.faqIcon} ${open === i ? styles['faqIcon--open'] : ''}`}
                aria-hidden="true"
              >
                +
              </span>
            </div>
            {open === i && (
              <p className={styles.faqA}>{item.a}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
