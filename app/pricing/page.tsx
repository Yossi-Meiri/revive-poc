import { Fragment } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import FaqAccordion from './FaqAccordion';
import styles from './page.module.css';

const packages = [
  {
    name: 'Single Memory',
    price: '$29',
    tagline: 'One photo. One moment. Complete.',
    items: [
      '1 photo restored and animated',
      'Music chosen for your mood',
      'Your personal message at the end',
      'Private link, delivered in 24 hours',
    ],
    href: '/order?package=single',
    btnLabel: 'Order Single Memory',
    featured: false,
  },
  {
    name: 'Memory Film',
    price: '$69',
    tagline: 'A short film from the photos that matter most.',
    items: [
      '3–5 photos edited into one cohesive film',
      'Title card with the occasion or year',
      'Music and your personal message',
      'Private link, plus one revision pass',
    ],
    href: '/order?package=memory',
    btnLabel: 'Order Memory Film',
    featured: true,
  },
  {
    name: 'Legacy Film',
    price: '$129',
    tagline: 'For the stories that deserve to be told whole.',
    items: [
      '8–12 photos, careful editorial curation',
      'Premium music selection and title card',
      'Personal message and two revision passes',
      'Private link, delivered in 48 hours',
    ],
    href: '/order?package=legacy',
    btnLabel: 'Order Legacy Film',
    featured: false,
  },
] as const;

const comparisonRows = [
  { app: 'Automated in 30 seconds',  rek: 'Reviewed by our team' },
  { app: 'Generic music',            rek: 'Music chosen by feel' },
  { app: 'No restoration',           rek: 'Photo carefully restored' },
  { app: 'Download a file',          rek: 'Private film link, ready to share' },
] as const;

export default function Pricing() {
  return (
    <>
      {/* ── Page Header ───────────────────────────────────── */}
      <header className={styles.header}>
        <p className={styles.headerEyebrow}>Pricing</p>
        <h1 className={styles.headerH1}>Choose your film.</h1>
        <p className={styles.headerBody}>
          Every order includes restoration, animation, music, and a personal message. Delivered in 24 hours.
        </p>
      </header>

      {/* ── Packages ──────────────────────────────────────── */}
      <section className={styles.packages}>
        <div className={styles.packagesGrid}>
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`${styles.card} ${pkg.featured ? styles['card--featured'] : styles['card--default']}`}
            >
              {pkg.featured && (
                <span className={styles.featuredBadge}>Most chosen</span>
              )}
              <p className={`${styles.cardName} ${pkg.featured ? styles['cardName--featured'] : styles['cardName--default']}`}>
                {pkg.name}
              </p>
              <p className={styles.cardPrice}>{pkg.price}</p>
              <p className={styles.cardTagline}>{pkg.tagline}</p>
              <div className={`${styles.cardDivider} ${pkg.featured ? styles['cardDivider--featured'] : styles['cardDivider--default']}`} />
              <ul className={styles.cardList}>
                {pkg.items.map((item) => (
                  <li key={item} className={styles.cardListItem}>{item}</li>
                ))}
              </ul>
              <Link
                href={pkg.href}
                className={`${styles.cardBtn} ${pkg.featured ? styles['cardBtn--featured'] : styles['cardBtn--default']}`}
              >
                {pkg.btnLabel}
              </Link>
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div className={styles.trust}>
          <p className={styles.trustItem}>Human eyes on every order</p>
          <span aria-hidden="true" className={styles.trustDot}>·</span>
          <p className={styles.trustItem}>Full refund if you don&rsquo;t love it</p>
          <span aria-hidden="true" className={styles.trustDot}>·</span>
          <p className={styles.trustItem}>Private link, yours to keep forever</p>
        </div>
      </section>

      {/* ── Comparison (dark) ─────────────────────────────── */}
      <section className={styles.comparison}>
        <div aria-hidden="true" className={styles.comparisonGrain} />
        <div className={styles.comparisonInner}>
          <h2 className={styles.comparisonH2}>Why not just use an app?</h2>
          <div className={styles.comparisonTable}>
            {/* Header row */}
            <div className={styles.compCell}>
              <p className={`${styles.compHeader} ${styles['compHeader--app']}`}>An app</p>
            </div>
            <div className={`${styles.compCell} ${styles['compCell--right']}`}>
              <p className={`${styles.compHeader} ${styles['compHeader--rekindled']}`}>Rekindled</p>
            </div>
            {/* Data rows */}
            {comparisonRows.map((row, i) => {
              const isLast = i === comparisonRows.length - 1;
              return (
                <Fragment key={i}>
                  <div className={`${styles.compCell} ${isLast ? styles['compCell--noBorder'] : ''}`}>
                    <p className={`${styles.compValue} ${styles['compValue--app']}`}>{row.app}</p>
                  </div>
                  <div className={`${styles.compCell} ${styles['compCell--right']} ${isLast ? styles['compCell--noBorder'] : ''}`}>
                    <p className={`${styles.compValue} ${styles['compValue--rekindled']}`}>{row.rek}</p>
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ (client) ──────────────────────────────────── */}
      <FaqAccordion />

      {/* ── Closing CTA ───────────────────────────────────── */}
      <section className={styles.cta}>
        <div aria-hidden="true" className={styles.ctaGrain} />
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaH2}>
            Still not sure? Start with the $29 Single Memory.
          </h2>
          <p className={styles.ctaBody}>
            It comes with a full refund guarantee. If it doesn&rsquo;t move you, you don&rsquo;t pay.
          </p>
          <div className={styles.ctaBtnWrap}>
            <Button href="/order?package=single">Order Single Memory</Button>
          </div>
        </div>
      </section>
    </>
  );
}
