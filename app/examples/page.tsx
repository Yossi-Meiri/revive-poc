import Button from '@/components/Button';
import FilmGallery from './FilmGallery';
import BeforeAfterSlider from './BeforeAfterSlider';
import styles from './page.module.css';

export default function Examples() {
  return (
    <>
      {/* ── Page Header ───────────────────────────────────── */}
      <header className={styles.header}>
        <p className={styles.headerEyebrow}>The gallery</p>
        <h1 className={styles.headerH1}>What a memory film feels like.</h1>
        <p className={styles.headerBody}>
          Every film below was made from a single photo, or a small set. Real occasions. Real families.
        </p>
      </header>

      {/* ── Film Gallery + Modal (client) ─────────────────── */}
      <FilmGallery />

      {/* ── Before / After Slider (client) ───────────────── */}
      <BeforeAfterSlider />

      {/* ── Testimonial ───────────────────────────────────── */}
      <section className={styles.testimonial}>
        <div className={styles.testimonialInner}>
          <div aria-hidden="true" className={styles.testimonialMark}>&ldquo;</div>
          <p className={styles.testimonialQuote}>I didn&rsquo;t expect to cry. I cried.</p>
          <p className={styles.testimonialAttrib}>A daughter &middot; 70th birthday gift</p>
        </div>
      </section>

      {/* ── Closing CTA ───────────────────────────────────── */}
      <section className={styles.cta}>
        <div aria-hidden="true" className={styles.ctaGrain} />
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaH2}>Your photo is waiting.</h2>
          <div className={styles.ctaBtnWrap}>
            <Button href="/order">Order a Memory Film</Button>
          </div>
          <p className={styles.ctaSub}>Starting at $29 &middot; Delivered within 24 hours</p>
        </div>
      </section>
    </>
  );
}
