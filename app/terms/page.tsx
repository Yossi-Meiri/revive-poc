import styles from '../legal.module.css';

export const metadata = {
  title: 'Terms of Service — Rekindled',
};

export default function Terms() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.h1}>Terms of Service</h1>
        <div className={styles.meta}>
          <span><span className={styles.metaKey}>Effective Date:</span> July 2026</span>
          <span><span className={styles.metaKey}>Last Updated:</span> July 2026</span>
        </div>
        <p className={styles.intro}>
          These Terms of Service govern your use of Rekindled, operated by Jonathan Cohen (&ldquo;Rekindled,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;). By placing an order, you agree to these terms.
        </p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.h2}>1. The Service</h2>
        <p className={styles.p}>
          Rekindled is a custom digital video service. We transform your old family photos into short emotional video films featuring photo restoration, animation, music, and a personal message overlay. Each video is a custom-commissioned digital product, created specifically for you.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>2. Placing an Order</h2>
        <ul className={styles.ul}>
          <li className={styles.li}>Orders are placed through our website. You will receive an email confirmation once your order is received.</li>
          <li className={styles.li}>You are responsible for ensuring that the photos you upload are owned by you or that you have the right to use them.</li>
          <li className={styles.li}>By uploading photos, you grant us a limited, non-exclusive license to use those images solely for the purpose of fulfilling your order.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>3. Delivery</h2>
        <ul className={styles.ul}>
          <li className={styles.li}><span className={styles.strong}>Single Memory ($29):</span> Delivered within 24 hours</li>
          <li className={styles.li}><span className={styles.strong}>Memory Film ($69):</span> Delivered within 24 hours</li>
          <li className={styles.li}><span className={styles.strong}>Legacy Film ($129):</span> Delivered within 48 hours</li>
        </ul>
        <p className={styles.p}>
          Delivery times are business day estimates. You will receive your finished video as a private link to a securely hosted file.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>4. Revisions</h2>
        <ul className={styles.ul}>
          <li className={styles.li}><span className={styles.strong}>Single Memory:</span> No revisions included</li>
          <li className={styles.li}><span className={styles.strong}>Memory Film:</span> One revision included</li>
          <li className={styles.li}><span className={styles.strong}>Legacy Film:</span> Two revisions included</li>
        </ul>
        <p className={styles.p}>
          A revision is a reasonable modification to the video based on your feedback (e.g. adjusting the personal message, music selection, or pacing). Revisions do not include a full re-shoot with different photos or a complete change of creative direction.
        </p>
        <p className={styles.p}>
          Additional revisions beyond what is included in your package may be requested at an additional fee, at our discretion.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>5. Refund Policy</h2>
        <p className={styles.p}>
          Because Rekindled produces custom digital goods, all sales are final once production has begun.
        </p>
        <p className={styles.p}>
          However, we stand behind our work. If you are unsatisfied with your video:
        </p>
        <ol className={styles.ol}>
          <li className={styles.li}>Contact us at <a href="mailto:hello@rekindled.studio" className={styles.link}>hello@rekindled.studio</a> within 7 days of delivery</li>
          <li className={styles.li}>We will schedule a brief conversation to understand what went wrong and review the video together</li>
          <li className={styles.li}>If the issue is on our end (quality, technical error, failure to follow your brief), we will offer a full refund or a redo at no charge</li>
        </ol>
        <p className={styles.p}>
          We do not issue refunds for subjective preferences that were not communicated at the time of ordering (e.g. a different music style not specified in the intake form).
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>6. Your Content</h2>
        <ul className={styles.ul}>
          <li className={styles.li}>You retain full ownership of your photos and personal message.</li>
          <li className={styles.li}>We do not claim any ownership over your family photos or the finished video.</li>
          <li className={styles.li}>We may request your permission separately to feature your video (anonymized or credited, your choice) as an example on our website. This is always opt-in and never assumed.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>7. Prohibited Use</h2>
        <p className={styles.p}>
          You may not use Rekindled to process photos you do not own or have rights to, or to create content that is misleading, harmful, or violates the rights of others.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>8. Limitation of Liability</h2>
        <p className={styles.p}>
          Rekindled is a custom creative service. We are not liable for delays caused by circumstances outside our control. Our total liability for any claim related to an order is limited to the amount paid for that order.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>9. Governing Law</h2>
        <p className={styles.p}>
          These terms are governed by the laws of the State of Israel.
        </p>
      </section>

      <section className={styles.sectionLast}>
        <h2 className={styles.h2}>10. Contact</h2>
        <p className={styles.p}>
          For any questions about these terms, contact us at:{' '}
          <a href="mailto:hello@rekindled.studio" className={styles.link}>hello@rekindled.studio</a>
        </p>
      </section>

      <p className={styles.footerNote}>
        Rekindled is operated by Jonathan Cohen, registered as an Esek Patur under Israeli law.
      </p>
    </div>
  );
}
