import Link from 'next/link';
import * as React from 'react';

function NovaLogo(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            {...props}
        >
            <circle cx="50" cy="50" r="48" stroke="#D4AF37" strokeWidth="4" fill="white" />
            <path d="M 28,75 L 28,25 L 35,25 L 35,55 L 50,25 L 57,25 L 37,60 L 37,75 L 28,75 Z" fill="#1E3A8A" />
            <path d="M 62,25 L 82,25 L 82,32 L 69,32 L 69,46 L 80,46 L 80,53 L 69,53 L 69,68 L 82,68 L 82,75 L 62,75 Z" fill="#1E3A8A" />
            <g transform="rotate(-40 40 40)">
                <path d="M 25,40 L 45,20 L 48,23 L 28,43 Z" fill="#CA8A04" />
                <path d="M 24,41 L 21,44 L 23,46 L 26,43 Z" fill="#CA8A04" />
            </g>
        </svg>
    );
}


export function PromoTab() {
  return (
    <div className="absolute top-4 left-4 z-20">
      <a
        href="https://www.novaexams.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 rounded-lg bg-primary/80 px-4 py-2 text-base font-semibold text-primary-foreground shadow-lg backdrop-blur-sm transition-colors hover:bg-primary"
      >
        <NovaLogo className="h-8 w-8" />
        <span>From www.novaexams.com</span>
      </a>
    </div>
  );
}
