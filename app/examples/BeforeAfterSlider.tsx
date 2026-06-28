'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import styles from './page.module.css';

export default function BeforeAfterSlider() {
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePos = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100));
    setPos(p);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    updatePos(e.clientX);
  };

  useEffect(() => {
    const onMove = (e: PointerEvent) => { if (dragging.current) updatePos(e.clientX); };
    const onUp   = () => { dragging.current = false; };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [updatePos]);

  return (
    <section className={styles.beforeAfter}>
      <div aria-hidden="true" className={styles.beforeAfterGrain} />
      <div className={styles.beforeAfterInner}>
        <p className={styles.beforeAfterEyebrow}>The restoration</p>
        <h2 className={styles.beforeAfterH2}>Before we touched it. After.</h2>

        <div
          ref={containerRef}
          className={styles.slider}
          onPointerDown={onPointerDown}
        >
          {/* After (full width underneath) */}
          <div className={styles.sliderImgAfter} />

          {/* Before (clipped on the left) */}
          <div
            className={styles.sliderImgBeforeWrap}
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <div className={styles.sliderImgBefore} />
          </div>

          <span className={styles.sliderLabelBefore}>Before</span>
          <span className={styles.sliderLabelAfter}>After</span>

          {/* Divider line */}
          <div
            aria-hidden="true"
            className={styles.sliderLine}
            style={{ left: `${pos}%` }}
          />
          {/* Handle */}
          <div
            aria-hidden="true"
            className={styles.sliderHandle}
            style={{ left: `${pos}%` }}
          >
            ⟷
          </div>
        </div>

        <p className={styles.beforeAfterHint}>Drag to compare</p>
      </div>
    </section>
  );
}
