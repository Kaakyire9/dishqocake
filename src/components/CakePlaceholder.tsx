import React from 'react';

export default function CakePlaceholder({ label, className }: { label?: string; className?: string }) {
  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="160" height="120" viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-90">
        <rect x="0" y="0" width="160" height="120" rx="12" fill="#fff7f9" />
        <path d="M40 70c10-18 30-18 40 0 10-18 30-18 40 0v20H40V70z" fill="#ffd7e6" />
        <ellipse cx="80" cy="72" rx="48" ry="12" fill="#fff1f4" />
        {label && <text x="80" y="100" textAnchor="middle" fontSize="12" fill="#b34b6b">{label}</text>}
      </svg>
    </div>
  );
}
