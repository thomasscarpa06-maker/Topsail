/* Logo conservé : public/topsail_logo.svg (carré). */
export function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/topsail_logo.svg" alt="Topsail" className={className} width={40} height={40} />
  );
}
