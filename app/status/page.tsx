'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import styles from './page.module.css';

function StatusContent() {
  const params = useSearchParams();
  const jobId = params.get('jobId');

  return (
    <div className={styles.page}>
      <div className={styles.icon}>✦</div>
      <h1 className={styles.heading}>We&rsquo;re working on your memory.</h1>
      <p className={styles.body}>
        Your film is being restored and composed by hand. You&rsquo;ll receive it by email within 24 hours.
      </p>
      <p className={styles.body}>
        No need to stay on this page — we&rsquo;ll come to you.
      </p>
      {jobId && (
        <p className={styles.jobId}>Order reference: {jobId}</p>
      )}
    </div>
  );
}

export default function StatusPage() {
  return (
    <Suspense>
      <StatusContent />
    </Suspense>
  );
}
