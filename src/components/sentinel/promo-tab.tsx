import Link from 'next/link';

export function PromoTab() {
  return (
    <div className="absolute top-4 left-4 z-20">
      <a
        href="https://www.novaexams.com"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-md bg-primary/80 px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg backdrop-blur-sm transition-colors hover:bg-primary"
      >
        From www.novaexams.com
      </a>
    </div>
  );
}
