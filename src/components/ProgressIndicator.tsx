interface ProgressIndicatorProps {
  current: 1 | 2 | 3 | 4;
}

export const ProgressIndicator = ({ current }: ProgressIndicatorProps) => {
  const getBarClassName = (index: number) => {
    const baseClass = "h-3 flex-1";
    const roundingClass =
      index === 1
        ? "rounded-l-xl rounded-r-xs"
        : index === 4
          ? "rounded-r-xl rounded-l-xs  "
          : "rounded-xs";

    if (index < current) {
      // 값 미만: #5B72B7
      return `${baseClass} ${roundingClass} bg-[#5B72B7]`;
    } else if (index === current) {
      // 현재 값: 그라데이션
      return `${baseClass} ${roundingClass} bg-linear-to-r from-[#5B72B7] to-[#F16C6E]`;
    } else {
      // 값 초과: #1B1C1E
      return `${baseClass} ${roundingClass} bg-[#1B1C1E]`;
    }
  };

  return (
    <div className="flex w-full items-center justify-center gap-5.5 px-20">
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className={getBarClassName(i + 1)} />
      ))}
    </div>
  );
};
