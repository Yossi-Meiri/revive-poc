import Link from 'next/link';
import Button from '@/components/Button';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <header className={styles.hero}>
        <div className={styles.heroBg} />
        <div aria-hidden="true" className={styles.heroScrimEdge} />
        <div aria-hidden="true" className={styles.heroScrimGrad} />

        <div aria-hidden="true" className={styles.heroLabel}>
          <span className={styles.heroLabelDot} />
          Memory Film &middot; 0:48
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroInner}>
            <h1 className={styles.heroH1}>
              See them again,<br />for the first time.
            </h1>
            <p className={styles.heroBody}>
              Send us one old photo. We&rsquo;ll turn it into a short film you&rsquo;ll keep forever.
            </p>
            <div className={styles.heroCtas}>
              <Button href="/order">Order Your Memory Film</Button>
              <span className={styles.heroSubtext}>Delivered within 24 hours</span>
            </div>
          </div>
        </div>

        <div aria-hidden="true" className={styles.heroScrubber}>
          <div className={styles.heroScrubberBar} />
        </div>
      </header>

      {/* ── The Transformation ───────────────────────────── */}
      <section className={styles.transform}>
        <div aria-hidden="true" className={styles.transformGrain} />
        <div className={styles.transformInner}>
          <div className={styles.transformHead}>
            <p className={styles.transformEyebrow}>From one still photo</p>
            <h2 className={styles.transformH2}>We bring it gently into motion.</h2>
          </div>

          <div className={styles.transformPanels}>
            <figure className={styles.transformFig}>
              <div className={`${styles.transformImgWrap}`}>
                <div className={`${styles.transformPlaceholder} ${styles['transformPlaceholder--before']}`} />
                <span className={`${styles.transformBadge} ${styles['transformBadge--before']}`}>
                  The photo you send
                </span>
              </div>
              <figcaption className={styles.transformCaption}>
                Faded, cracked, yellowed by decades.
              </figcaption>
            </figure>

            <div aria-hidden="true" className={styles.transformArrow}>→</div>

            <figure className={styles.transformFig}>
              <div className={`${styles.transformImgWrap} ${styles['transformImgWrap--after']}`}>
                <div className={`${styles.transformPlaceholder} ${styles['transformPlaceholder--after']}`} />
                <div aria-hidden="true" className={styles.transformImgScrim} />
                <span className={`${styles.transformBadge} ${styles['transformBadge--after']}`}>
                  The film you get back
                </span>
                <div aria-hidden="true" className={styles.transformScrubber}>
                  <div className={styles.transformScrubberBar} />
                </div>
              </div>
              <figcaption className={styles.transformCaption}>
                Restored, scored, and quietly in motion.
              </figcaption>
            </figure>
          </div>

          <p className={styles.transformBody}>
            Cracks, yellowing, the blur of decades: we repair it all by hand.
            Every frame is reviewed by a person before it reaches you.
          </p>
        </div>
      </section>

      {/* ── Belief Statement ─────────────────────────────── */}
      <section className={styles.belief}>
        <p className={styles.beliefText}>
          Some photos are too important to stay still.
          <span className={styles.beliefSub}>
            That blurry birthday. The last one of them together.
          </span>
          <span className={styles.beliefClose}>
            Rekindled turns it into something you can actually feel.
          </span>
        </p>
      </section>

      {/* ── What You Get ─────────────────────────────────── */}
      <section className={styles.get}>
        <p className={styles.getEyebrow}>What you get</p>
        <div className={styles.getGrid}>

          <div className={styles.getCard}>
            <div className={styles.getCardImg} style={{ background: '#c0a882' }} />
            <div className={styles.getCardBody}>
              <svg width="30" height="30" viewBox="0 0 34 34" fill="none" stroke="#C4843A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="6" width="26" height="20" rx="1.5" />
                <path d="M4 21l7-7 5 5 4-4 10 10" />
                <circle cx="12" cy="13" r="2.2" />
              </svg>
              <h3 className={styles.getCardH3}>Restored</h3>
              <p className={styles.getCardP}>
                We repair faded color, cracks, and damage by hand, so the photo looks the way you remember it.
              </p>
            </div>
          </div>

          <div className={styles.getCard}>
            <div className={styles.getCardImg} style={{ background: '#a89070' }} />
            <div className={styles.getCardBody}>
              <svg width="30" height="30" viewBox="0 0 34 34" fill="none" stroke="#C4843A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="17" cy="17" r="13" />
                <path d="M14 12l8 5-8 5z" fill="#C4843A" stroke="none" />
              </svg>
              <h3 className={styles.getCardH3}>Animated</h3>
              <p className={styles.getCardP}>
                Gentle, cinematic motion brings the moment to life. No uncanny valley, just a held breath.
              </p>
            </div>
          </div>

          <div className={styles.getCard}>
            <div className={styles.getCardImg} style={{ background: '#8a7560' }} />
            <div className={styles.getCardBody}>
              <svg width="30" height="30" viewBox="0 0 34 34" fill="none" stroke="#C4843A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 24V9l14-3v15" />
                <circle cx="10" cy="24" r="3" />
                <circle cx="24" cy="21" r="3" />
              </svg>
              <h3 className={styles.getCardH3}>Scored</h3>
              <p className={styles.getCardP}>
                Music chosen for the mood and the occasion. The difference between watching and remembering.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── Recent Films Gallery ──────────────────────────── */}
      <section className={styles.gallery}>
        <p className={styles.galleryEyebrow}>Recent films</p>
        <h2 className={styles.galleryH2}>A few we&rsquo;ve made lately.</h2>
        <div className={styles.galleryGrid}>

          {[
            { bg: '#7a6248', title: 'A father & son', meta: '70th Birthday · Film', duration: '0:48' },
            { bg: '#9a7d5a', title: 'Her first summer', meta: "Baby's First Year · Film", duration: '0:36' },
            { bg: '#5a4a38', title: 'In loving memory', meta: 'Memorial · Film', duration: '1:12' },
          ].map(({ bg, title, meta, duration }) => (
            <div className={styles.tile} key={title}>
              <div className={styles.tileImgWrap}>
                <div className={styles.tileImg} style={{ background: bg }} />
                <div aria-hidden="true" className={styles.tileScrim} />
                <div aria-hidden="true" className={styles.tilePlay}>
                  <span className={styles.tilePlayBtn}>
                    <span className={styles.tilePlayTriangle} />
                  </span>
                  {duration}
                </div>
              </div>
              <p className={styles.tileTitle}>{title}</p>
              <p className={styles.tileMeta}>{meta}</p>
            </div>
          ))}

        </div>
        <div className={styles.galleryMore}>
          <Link href="/examples" className={styles.galleryMoreLink}>
            See more films →
          </Link>
        </div>
      </section>

      {/* ── Testimonials Grid ────────────────────────────── */}
      <section className={styles.testimonials}>
        <p className={styles.testimonialsEyebrow}>What people say</p>
        <h2 className={styles.testimonialsH2}>Worth more than they expected.</h2>
        <div className={styles.testimonialsGrid}>

          {[
            {
              quote: "When his face moved and the music started, my mother had to leave the room. Then she watched it four more times.",
              attrib: "Maya · for her father's 70th",
            },
            {
              quote: "I gave it at the anniversary dinner. The whole table went quiet, then everyone was crying and laughing at once.",
              attrib: "Daniel · 50th anniversary gift",
            },
            {
              quote: "It was the only photo we had of her as a girl. Seeing it breathe again felt like she was in the room with us.",
              attrib: "Sofia · in memory of her grandmother",
            },
          ].map(({ quote, attrib }) => (
            <figure className={styles.quoteCard} key={attrib}>
              <div aria-hidden="true" className={styles.quoteMark}>&ldquo;</div>
              <blockquote className={styles.quoteText}>{quote}</blockquote>
              <figcaption className={styles.quoteAttrib}>{attrib}</figcaption>
            </figure>
          ))}

        </div>
        <div className={styles.testimonialsMore}>
          <Link href="/examples" className={styles.testimonialsMoreLink}>
            See the films &amp; stories →
          </Link>
        </div>
      </section>

      {/* ── Featured Testimonial ─────────────────────────── */}
      <section className={styles.featured}>
        <div className={styles.featuredInner}>
          <div className={styles.featuredImgSide}>
            <div className={styles.featuredPlaceholder} />
            <div aria-hidden="true" className={styles.featuredImgFade} />
          </div>
          <div className={styles.featuredCopy}>
            <div className={styles.featuredMark}>&ldquo;</div>
            <p className={styles.featuredQuote}>
              We&rsquo;ve watched it on every birthday since. It&rsquo;s the closest thing to having him walk back through the door.
            </p>
            <p className={styles.featuredAttrib}>The Okafor family &middot; a memorial film</p>
          </div>
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────────────────── */}
      <section className={styles.cta}>
        <div aria-hidden="true" className={styles.ctaGrain} />
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaH2}>
            The photo you keep coming back to deserves more than a frame.
          </h2>
          <div className={styles.ctaBtnWrap}>
            <Button href="/order">Order a Memory Film</Button>
          </div>
          <p className={styles.ctaPrice}>Starting at $29</p>
        </div>
      </section>
    </>
  );
}
