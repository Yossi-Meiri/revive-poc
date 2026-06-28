'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './page.module.css';

type Film = {
  tag: string;
  desc: string;
  aspect: string;
  bg: string;
};

const films: Film[] = [
  { tag: '70th Birthday',    desc: 'Three photos from 1974. Her children gave her this at dinner.',       aspect: '4/5', bg: '#6a5238' },
  { tag: 'Anniversary',      desc: 'Fifty years, in one frame. Played at the table before the toast.',     aspect: '4/3', bg: '#8a6a48' },
  { tag: 'Memorial',         desc: 'The only photo they had of him as a young man. Now it moves.',          aspect: '3/4', bg: '#5a4232' },
  { tag: "Baby's First Year",desc: 'Twelve months in ninety seconds. A gift for the grandparents.',        aspect: '4/5', bg: '#9a7a58' },
  { tag: '70th Birthday',    desc: 'A single portrait, restored. She watched it five times.',              aspect: '4/3', bg: '#7a5e42' },
  { tag: 'Memorial',         desc: 'Four generations, one afternoon in the garden. Kept forever.',         aspect: '3/4', bg: '#4a3828' },
];

export default function FilmGallery() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const close = useCallback(() => setActiveIdx(null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  const active = activeIdx !== null ? films[activeIdx] : null;

  return (
    <>
      {/* ── Cards ── */}
      <section className={styles.gallery}>
        <div className={styles.masonry}>
          {films.map((film, i) => (
            <div
              key={i}
              className={styles.card}
              onClick={() => setActiveIdx(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setActiveIdx(i)}
              aria-label={`Watch film: ${film.tag}`}
            >
              <div className={styles.cardImgWrap} style={{ aspectRatio: film.aspect }}>
                <div className={styles.cardImg} style={{ background: film.bg }} />
                <div aria-hidden="true" className={styles.cardScrim} />
                <div aria-hidden="true" className={styles.cardPlay}>
                  <div className={styles.cardPlayTriangle} />
                </div>
              </div>
              <p className={styles.cardTag}>{film.tag}</p>
              <p className={styles.cardDesc}>{film.desc}</p>
            </div>
          ))}
        </div>
        <p className={styles.galleryNote}>
          These are our first pilot films. Frames shown are placeholders until each film is live.
        </p>
      </section>

      {/* ── Modal ── */}
      {active && (
        <div
          className={styles.modalOverlay}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`Film: ${active.tag}`}
        >
          <div
            className={styles.modalInner}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.modalClose} onClick={close} aria-label="Close film">
              Close <span className={styles.modalCloseX}>×</span>
            </button>

            <div className={styles.modalFilm}>
              <div
                className={styles.modalFilmBg}
                style={{ background: active.bg }}
              />
              <div aria-hidden="true" className={styles.modalFilmScrim} />

              <div aria-hidden="true" className={styles.modalLabel}>
                <span className={styles.modalLabelDot} />
                {active.tag} &middot; 0:52
              </div>

              <div aria-hidden="true" className={styles.modalPlayBtn}>
                <div className={styles.modalPlayTriangle} />
              </div>

              <div aria-hidden="true" className={styles.modalScrubber}>
                <div className={styles.modalScrubberBar} />
              </div>
            </div>

            <p className={styles.modalDesc}>{active.desc}</p>
            <p className={styles.modalPlaceholderNote}>
              Placeholder frame &middot; the finished film will play here at launch.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
