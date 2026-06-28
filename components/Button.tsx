import Link from 'next/link';
import styles from './Button.module.css';

type ButtonProps = {
  variant?: 'primary' | 'secondary';
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit';
};

export default function Button({
  variant = 'primary',
  href,
  onClick,
  children,
  type = 'button',
}: ButtonProps) {
  const className = `${styles.btn} ${variant === 'secondary' ? styles.secondary : styles.primary}`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
}
