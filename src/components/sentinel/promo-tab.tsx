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
        <div className="h-8 w-8 bg-white/90 rounded-sm flex items-center justify-center text-xs font-bold text-black">
          LOGO
        </div>
        <span>From www.novaexams.com</span>
      </a>
    </div>
  );
}
