import styles from '../legal.module.css';

export const metadata = {
  title: 'Privacy Policy — Rekindled',
};

export default function Privacy() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.h1}>Privacy Policy</h1>
        <div className={styles.meta}>
          <span><span className={styles.metaKey}>Effective Date:</span> July 2026</span>
          <span><span className={styles.metaKey}>Last Updated:</span> July 2026</span>
        </div>
        <p className={styles.intro}>
          This Privacy Policy explains how Rekindled, operated by Jonathan Cohen, collects, uses, and protects your personal information when you use our service. We take your privacy seriously — especially when it comes to your family photos.
        </p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.h2}>1. What We Collect</h2>
        <p className={styles.p}>When you place an order, we collect:</p>
        <ul className={styles.ul}>
          <li className={styles.li}><span className={styles.strong}>Your email address</span> — to deliver your finished film and communicate about your order</li>
          <li className={styles.li}><span className={styles.strong}>Your photos</span> — uploaded by you for the purpose of creating your film</li>
          <li className={styles.li}><span className={styles.strong}>Your personal message</span> — the text you write at checkout to include at the end of your film</li>
          <li className={styles.li}><span className={styles.strong}>Your package and music selection</span> — to fulfill your order correctly</li>
          <li className={styles.li}><span className={styles.strong}>Payment information</span> — processed securely by Stripe. We never see or store your card details.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>2. How We Use Your Information</h2>
        <p className={styles.p}>We use your information only to:</p>
        <ul className={styles.ul}>
          <li className={styles.li}>Fulfill and deliver your order</li>
          <li className={styles.li}>Communicate with you about your order status</li>
          <li className={styles.li}>Process your payment via Stripe</li>
          <li className={styles.li}>Respond to questions or support requests</li>
        </ul>
        <p className={styles.p}>
          We do not use your photos, personal message, or email for marketing purposes without your explicit consent.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>3. Your Photos</h2>
        <ul className={styles.ul}>
          <li className={styles.li}>Your photos are uploaded to secure, private cloud storage solely for the purpose of creating your film.</li>
          <li className={styles.li}>We do not share your photos with third parties except the tools required to process your order (restoration and animation services).</li>
          <li className={styles.li}>Your photos are deleted from our systems within 30 days of your order being completed.</li>
          <li className={styles.li}>We will never use your family photos for training AI models, advertising, or any purpose outside your order.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>4. Third-Party Services</h2>
        <p className={styles.p}>We use the following trusted services to operate Rekindled:</p>
        <ul className={styles.ul}>
          <li className={styles.li}><span className={styles.strong}>Stripe</span> — payment processing. Subject to <a href="https://stripe.com/privacy" className={styles.link} target="_blank" rel="noopener noreferrer">Stripe&rsquo;s Privacy Policy</a>.</li>
          <li className={styles.li}><span className={styles.strong}>Cloudflare R2</span> — secure file storage for your photos and finished film.</li>
          <li className={styles.li}><span className={styles.strong}>Replicate</span> — AI-assisted photo restoration and animation. Images are processed and not retained.</li>
          <li className={styles.li}><span className={styles.strong}>Resend</span> — email delivery of your finished film link.</li>
        </ul>
        <p className={styles.p}>
          None of these services receive your data for any purpose other than fulfilling your order.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>5. Data Retention</h2>
        <ul className={styles.ul}>
          <li className={styles.li}><span className={styles.strong}>Your photos:</span> Deleted within 30 days of order completion</li>
          <li className={styles.li}><span className={styles.strong}>Your finished film:</span> Hosted as a private link for 12 months. You may request early deletion at any time.</li>
          <li className={styles.li}><span className={styles.strong}>Your email and order details:</span> Retained for up to 2 years for support and legal purposes, then deleted.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>6. Your Rights</h2>
        <p className={styles.p}>You have the right to:</p>
        <ul className={styles.ul}>
          <li className={styles.li}>Request access to the personal data we hold about you</li>
          <li className={styles.li}>Request deletion of your data at any time</li>
          <li className={styles.li}>Withdraw consent for any optional use of your data</li>
          <li className={styles.li}>Request that we correct inaccurate information</li>
        </ul>
        <p className={styles.p}>
          To exercise any of these rights, email us at <a href="mailto:hello@rekindled.studio" className={styles.link}>hello@rekindled.studio</a>.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>7. Cookies</h2>
        <p className={styles.p}>
          Rekindled does not use tracking cookies or advertising pixels. We may use minimal session cookies required for the order flow to function. No third-party analytics or behavioral tracking is active on this site.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>8. Security</h2>
        <p className={styles.p}>
          We take reasonable technical and organizational measures to protect your data, including encrypted file storage, HTTPS-only access, and access controls. No method of internet transmission is 100% secure, but we are committed to treating your family photos with the care they deserve.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>9. Governing Law</h2>
        <p className={styles.p}>
          This policy is governed by the laws of the State of Israel and applicable EU/EEA data protection regulations where relevant.
        </p>
      </section>

      <section className={styles.sectionLast}>
        <h2 className={styles.h2}>10. Contact</h2>
        <p className={styles.p}>
          For any privacy-related questions or requests, contact us at:{' '}
          <a href="mailto:hello@rekindled.studio" className={styles.link}>hello@rekindled.studio</a>
        </p>
      </section>

      <p className={styles.footerNote}>
        Rekindled is operated by Jonathan Cohen, registered as an Esek Patur under Israeli law.
      </p>
    </div>
  );
}
