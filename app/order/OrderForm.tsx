'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.css';

type Pkg = 'single' | 'memory' | 'legacy';

const packages: { id: Pkg; name: string; price: string; desc: string; badge?: string }[] = [
  { id: 'single', name: 'Single Memory', price: '$29', desc: 'One photo. One moment. Complete.' },
  { id: 'memory', name: 'Memory Film',   price: '$69', desc: 'A short film from the photos that matter most.', badge: 'Most chosen' },
  { id: 'legacy', name: 'Legacy Film',   price: '$129', desc: 'For the stories that deserve to be told whole.' },
];

const occasions = ['Birthday', 'Anniversary', 'Memorial', 'Baby & Family', 'Just Because', 'Other'];
const moods     = ['Warm & Joyful', 'Tender & Quiet', 'Celebratory', 'Bittersweet'];

const prices: Record<Pkg, number> = { single: 29, memory: 69, legacy: 129 };

export default function OrderForm() {
  const params = useSearchParams();
  const [pkg, setPkg] = useState<Pkg>('memory');
  const [occasion, setOccasion] = useState('Birthday');
  const [mood, setMood] = useState('Warm & Joyful');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragover, setDragover] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pre-select package from URL ?package=
  useEffect(() => {
    const p = params.get('package') as Pkg | null;
    if (p && prices[p] != null) setPkg(p);
  }, [params]);

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith('image/')) return;
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreview(url);
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragover(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const radioStyle = (id: Pkg) => ({
    borderColor: pkg === id ? 'var(--color-amber)' : 'rgba(26,22,20,0.12)',
  });

  const radioDotStyle = (id: Pkg) => ({
    background: pkg === id ? 'var(--color-amber)' : 'transparent',
  });

  const pillStyle = (value: string, active: string) =>
    value === active
      ? { background: 'var(--color-amber)', borderColor: 'var(--color-amber)', color: 'var(--color-bg)' }
      : { background: 'transparent', borderColor: 'rgba(26,22,20,0.18)', color: 'rgba(26,22,20,0.78)' };

  const handleSubmit = async () => {
    if (!email || !file) {
      alert('Please add your photo and email before submitting.');
      return;
    }
    setSubmitting(true);
    try {
      const body = new FormData();
      body.append('email', email);
      body.append('music', mood);
      body.append('images', file, file.name);

      const res = await fetch('/api/submit', { method: 'POST', body });
      if (!res.ok) throw new Error(await res.text());
      const { jobId } = await res.json();
      window.location.href = `/status?jobId=${jobId}`;
    } catch (err) {
      alert(`Something went wrong: ${err instanceof Error ? err.message : String(err)}`);
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      {/* ── Header ── */}
      <header className={styles.header}>
        <h1 className={styles.headerH1}>Let&rsquo;s make your film.</h1>
        <p className={styles.headerBody}>
          This takes about 2 minutes. We&rsquo;ll take care of everything else.
        </p>
      </header>

      {/* ── 1. Package ── */}
      <div className={styles.block}>
        <p className={styles.sectionLabel}>1 &middot; Your film</p>
        <div className={styles.pkgList}>
          {packages.map((p) => (
            <div
              key={p.id}
              className={styles.pkg}
              style={radioStyle(p.id)}
              onClick={() => setPkg(p.id)}
              role="radio"
              aria-checked={pkg === p.id}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setPkg(p.id)}
            >
              <span className={styles.radio} style={radioStyle(p.id)}>
                <span className={styles.radioDot} style={radioDotStyle(p.id)} />
              </span>
              <div className={styles.pkgBody}>
                <div className={styles.pkgRow}>
                  <span className={styles.pkgName}>
                    {p.name}
                    {p.badge && <span className={styles.pkgBadge}>{p.badge}</span>}
                  </span>
                  <span className={styles.pkgPrice}>{p.price}</span>
                </div>
                <p className={styles.pkgDesc}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 2. Upload ── */}
      <div className={styles.block}>
        <p className={styles.sectionLabel}>2 &middot; Your photo</p>
        <div
          className={`${styles.uploadZone} ${dragover ? styles['uploadZone--dragover'] : ''}`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragover(true); }}
          onDragLeave={() => setDragover(false)}
          onDrop={onDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className={styles.uploadInput}
            onChange={onFileChange}
            onClick={(e) => e.stopPropagation()}
          />
          {preview ? (
            // next/image cannot load blob: URLs — raw <img> is correct here
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="Your uploaded photo" className={styles.uploadPreview} />
          ) : (
            <>
              <svg className={styles.uploadIcon} width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="7" width="30" height="22" rx="2" />
                <path d="M3 24l8-8 6 6 5-5 11 11" />
                <circle cx="12" cy="14" r="2.5" />
              </svg>
              <p className={styles.uploadPrompt}>
                <span className={styles.uploadPromptAmber}>Click to upload</span> or drag your photo here
              </p>
            </>
          )}
        </div>
        <p className={styles.uploadNote}>
          Any format, any quality. We&rsquo;ve worked with worse.<br />
          <span className={styles.uploadNotePrivacy}>Your photo is private. We only use it to make your film.</span>
        </p>
      </div>

      {/* ── 3. Occasion ── */}
      <div className={styles.block}>
        <p className={styles.sectionLabel}>3 &middot; The occasion</p>
        <div className={styles.pillGroup}>
          {occasions.map((o) => (
            <button
              key={o}
              className={styles.pill}
              style={pillStyle(o, occasion)}
              onClick={() => setOccasion(o)}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      {/* ── 4. Mood ── */}
      <div className={styles.block}>
        <p className={styles.sectionLabel}>4 &middot; The music</p>
        <p className={styles.sectionItalic}>What should the music feel like?</p>
        <div className={styles.pillGroup}>
          {moods.map((m) => (
            <button
              key={m}
              className={styles.pill}
              style={pillStyle(m, mood)}
              onClick={() => setMood(m)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* ── 5. Personal message ── */}
      <div className={styles.block}>
        <p className={styles.sectionLabel}>
          5 &middot; Your message{' '}
          <span className={styles.sectionLabelOptional}>(optional)</span>
        </p>
        <textarea
          className={styles.textarea}
          rows={3}
          placeholder="Happy 70th, Dad. With love from all of us."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <p className={styles.fieldNote}>
          This fades in at the end of your film. Keep it short — one or two lines is perfect.
        </p>
      </div>

      {/* ── 6. Delivery email ── */}
      <div className={styles.blockDelivery}>
        <p className={styles.sectionLabel}>6 &middot; Delivery</p>
        <label className={styles.deliveryLabel}>
          Where should we send your film?
        </label>
        <input
          className={styles.input}
          type="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* ── 7. Submit ── */}
      <button className={styles.submitBtn} onClick={handleSubmit} disabled={submitting}>
        {submitting ? 'Submitting…' : `Order My Film — $${prices[pkg]}`}
      </button>
      <p className={styles.submitNote}>
        Secure payment via Stripe. You&rsquo;ll receive your film within 24 hours.
      </p>

      {/* ── 8. Reassurance ── */}
      <div className={styles.reassurance}>
        <p className={styles.reassuranceLine}>Every film is reviewed before delivery.</p>
        <p className={styles.reassuranceLine}>Full refund if you don&rsquo;t love it.</p>
        <p className={styles.reassuranceLine}>Your photos are never shared or stored beyond your order.</p>
      </div>
    </div>
  );
}
