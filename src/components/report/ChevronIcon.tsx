export type ChevronDirection = "right" | "down" | "left" | "up";

export function ChevronIcon({
  className,
  direction = "right",
}: {
  className?: string;
  direction?: ChevronDirection;
}) {
  const rotation =
    direction === "down"
      ? "rotate-90"
      : direction === "left"
        ? "rotate-180"
        : direction === "up"
          ? "-rotate-90"
          : "";

  return (
    <svg
      className={`${className ?? ""} ${rotation} transition-transform`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 6l6 6-6 6"
      />
    </svg>
  );
}
