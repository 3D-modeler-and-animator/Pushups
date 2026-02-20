import Link from 'next/link';
import * as React from 'react';

export function PromoTab() {
  return (
    <div className="absolute top-4 left-4 z-20">
      <a
        href="https://www.novaexams.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 rounded-lg bg-primary/80 px-4 py-2 text-base font-semibold text-primary-foreground shadow-lg backdrop-blur-sm transition-colors hover:bg-primary"
      >
        <div className="h-8 w-8 bg-white/90 rounded-full flex items-center justify-center">
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="15" fill="white" stroke="#DAA520" strokeWidth="2"/>
            <text x="16" y="22" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="16" fill="#1E40AF" textAnchor="middle">
                <tspan dx="-7">N</tspan>
                <tspan dx="2">E</tspan>
            </text>
            <line x1="7" y1="24" x2="17" y2="8" stroke="#DAA520" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>
        <span>From www.novaexams.com</span>
      </a>
    </div>
  );
}
