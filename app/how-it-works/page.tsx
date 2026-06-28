import Button from '@/components/Button';
import styles from './page.module.css';

const steps = [
  {
    num: '01',
    heading: 'You send us the photo',
    body: 'Any photo. Faded, damaged, even blurry. We’ve seen worse. Upload it at checkout; it takes about thirty seconds.',
    imgClass: styles['stepPlaceholder--before'],
    badgeText: 'Your original',
    badgePos: styles['stepBadge--topLeft'],
    badgeColor: styles['stepBadge--dark'],
    variant: 'left',
    wrapClass: '',
  },
  {
    num: '02',
    heading: 'We restore it carefully',
    body: 'Our team uses AI-assisted restoration, then reviews every result by eye. We fix damage, recover color, and sharpen faces, without erasing the soul of the original.',
    imgClass: styles['stepPlaceholder--after'],
    badgeText: 'Restored by eye',
    badgePos: styles['stepBadge--topLeft'],
    badgeColor: styles['stepBadge--amber'],
    variant: 'right',
    wrapClass: '',
  },
  {
    num: '03',
    heading: 'We animate and score it',
    body: 'Gentle, cinematic motion, with no robotic eye-tracking, no unnatural movement. Then music, chosen for your occasion and mood.',
    imgClass: styles['stepPlaceholder--motion'],
    badgeText: null, // special motion badge
    badgePos: '',
    badgeColor: '',
    variant: 'left',
    wrapClass: styles['stepImgWrap--amber'],
  },
  {
    num: '04',
    heading: 'You receive a film',
    body: 'A private link, not just a file. It opens full-screen, ready to share on WhatsApp, play at a dinner table, or keep forever.',
    imgClass: styles['stepPlaceholder--delivery'],
    badgeText: 'A private link · opens full-screen',
    badgePos: styles['stepBadge--bottomLeft'],
    badgeColor: styles['stepBadge--dark'],
    variant: 'right',
    wrapClass: '',
    gradScrim: true,
  },
] as const;

export default function HowItWorks() {
  return (
    <>
      {/* ── Page Header ───────────────────────────────────── */}
      <header className={styles.header}>
        <p className={styles.headerEyebrow}>How it works</p>
        <h1 className={styles.headerH1}>
          Made by hand.<br />Delivered in 24 hours.
        </h1>
        <p className={styles.headerBody}>
          We&rsquo;re not an app. Every order gets human attention before it leaves our studio.
        </p>
      </header>

      {/* ── Process Steps ─────────────────────────────────── */}
      <section className={styles.process}>
        {steps.map((step) => {
          const isRight = step.variant === 'right';
          return (
            <div className={styles.step} key={step.num}>
              {/* Text */}
              <div
                className={`${styles.stepText} ${isRight ? styles['stepText--right'] : ''}`}
                style={{ order: isRight ? 2 : 1 }}
              >
                <div className={styles.stepNum}>{step.num}</div>
                <h2 className={styles.stepH2}>{step.heading}</h2>
                <p className={styles.stepBody}>{step.body}</p>
              </div>

              {/* Image */}
              <div
                className={styles.stepImg}
                style={{ order: isRight ? 1 : 2 }}
              >
                <div className={`${styles.stepImgWrap} ${step.wrapClass}`}>
                  <div className={`${styles.stepPlaceholder} ${step.imgClass}`} />

                  {/* Step 3 special: scrim + motion badge + scrubber */}
                  {step.num === '03' && (
                    <>
                      <div aria-hidden="true" className={styles.stepScrim} />
                      <div aria-hidden="true" className={styles.stepBadgeMotion}>
                        <span className={styles.stepBadgeMotionDot} />
                        In motion &middot; with score
                      </div>
                      <div aria-hidden="true" className={styles.stepScrubber}>
                        <div className={styles.stepScrubberBar} />
                      </div>
                    </>
                  )}

                  {/* Step 4: bottom gradient scrim */}
                  {step.num === '04' && (
                    <div aria-hidden="true" className={styles.stepScrimGrad} />
                  )}

                  {/* Regular badge (steps 1, 2, 4) */}
                  {step.badgeText && (
                    <span className={`${styles.stepBadge} ${step.badgePos} ${step.badgeColor}`}>
                      {step.badgeText}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* ── The Difference ────────────────────────────────── */}
      <section className={styles.difference}>
        <div aria-hidden="true" className={styles.differenceGrain} />
        <div className={styles.differenceInner}>
          <p className={styles.differenceEyebrow}>The difference</p>
          <h2 className={styles.differenceH2}>This is not a generator.</h2>
          <p className={styles.differenceItalic}>
            Apps can animate a face in thirty seconds. We take twenty-four hours because we actually look at your photo.
          </p>
          <p className={styles.differenceBody}>
            We check the restoration. We choose the music by feel. We deliver something a grandchild will show their kids.
          </p>
        </div>
      </section>

      {/* ── Personal Message Callout ──────────────────────── */}
      <section className={styles.message}>
        <div className={styles.messageBox}>
          <div className={styles.messageText}>
            <p className={styles.messageEyebrow}>A personal touch</p>
            <h2 className={styles.messageH2}>Every film ends with your message.</h2>
            <p className={styles.messageBody}>
              At checkout you write a short message, a few words in your voice. We fade it in over the final frames, so the film closes on something only you could say.
            </p>
          </div>

          <div className={styles.messageMockupWrap}>
            <div className={styles.messageMockup}>
              <div className={styles.messageMockupBg} />
              <div aria-hidden="true" className={styles.messageMockupScrim} />
              <div className={styles.messageMockupOverlay}>
                <p className={styles.messageMockupText}>
                  Happy 70th, Dad.<br />With love, the kids.
                </p>
              </div>
              <div aria-hidden="true" className={styles.messageScrubber}>
                <div className={styles.messageScrubberBar} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing CTA ───────────────────────────────────── */}
      <section className={styles.cta}>
        <div aria-hidden="true" className={styles.ctaGrain} />
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaH2}>Ready to start?</h2>
          <div className={styles.ctaBtnWrap}>
            <Button href="/order">Order a Memory Film</Button>
          </div>
          <p className={styles.ctaSub}>Starting at $29 &middot; Delivered within 24 hours</p>
        </div>
      </section>
    </>
  );
}
