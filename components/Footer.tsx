import Link from 'next/link';
import styles from './Footer.module.css';

const navLinks = [
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/examples', label: 'Examples' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/order', label: 'Order' },
];

const legalLinks = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link href="/" className={styles.wordmark}>Rekindled</Link>
          <p className={styles.tagline}>See them again, for the first time.</p>
        </div>
        <nav className={styles.nav}>
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className={styles.link}>{label}</Link>
          ))}
        </nav>
        <div className={styles.right}>
          {legalLinks.map(({ href, label }) => (
            <Link key={href} href={href} className={styles.legalLink}>{label}</Link>
          ))}
          <p className={styles.copy}>© {new Date().getFullYear()} Rekindled Studio</p>
        </div>
      </div>
    </footer>
  );
}
