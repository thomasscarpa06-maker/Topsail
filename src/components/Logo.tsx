/* Logo existant du dépôt : public/topsail_logo.svg (conservé tel quel). */
export function Logo({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/topsail_logo.svg" alt="Topsail" className={className} width={140} height={36} />
  );
}
