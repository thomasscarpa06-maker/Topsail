// Logo Topsail, aligné sur public/logo.svg. SVG inline (et non <img>) pour que
// currentColor hérite de la couleur du texte : grande voile + mot suivent les
// deux états de l'en-tête ; petite voile et vague restent en safran.
export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="-12 -12 1256 453"
      role="img"
      aria-label="Topsail"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Topsail</title>
      <g transform="translate(-316,-250)">
        <path
          d="M452 250 C585 297 700 370 747 457 C773 505 770 552 748 592 C711 583 677 583 635 598 C659 529 653 450 614 376 C575 301 516 267 452 250 Z"
          fill="currentColor"
        />
        <path
          d="M542 322 C566 384 566 447 544 503 C526 548 501 579 468 603 C510 598 548 600 584 610 C613 545 618 472 599 409 C586 367 566 339 542 322 Z"
          fill="#D98C1F"
        />
        <path
          d="M377 635 C452 590 520 598 584 619 C649 641 710 650 778 636 C812 629 843 615 874 593 C851 628 815 653 770 667 C705 687 641 679 579 659 C511 637 454 627 377 653 C355 661 335 669 316 678 C332 661 352 647 377 635 Z"
          fill="#D98C1F"
        />
      </g>
      <text
        x="618"
        y="300"
        textAnchor="start"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="190"
        fontWeight="700"
        letterSpacing="-7"
        fill="currentColor"
      >
        Topsail
      </text>
    </svg>
  );
}
