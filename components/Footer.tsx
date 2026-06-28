import Link from 'next/link';
import styles from './Footer.module.css';

const links = [
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/examples', label: 'Examples' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/order', label: 'Order' },
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
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className={styles.link}>{label}</Link>
          ))}
        </nav>
        <p className={styles.copy}>© {new Date().getFullYear()} Rekindled Studio</p>
      </div>
    </footer>
  );
}
