interface PrimaryButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export const PrimaryButton = ({
  onClick,
  children,
  disabled = false,
}: PrimaryButtonProps) => {
  return (
    <button
      className={`my-8 h-40 w-full rounded-lg max-sm:my-4 max-sm:h-20 ${disabled ? "bg-[#E53888]/32" : "bg-[#E53888]"}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span
        className={`font-pretendard text-5xl leading-[120%] font-bold tracking-[-1px] max-sm:text-2xl ${disabled ? "text-[#777777]" : "text-[#111111]"}`}
      >
        {children}
      </span>
    </button>
  );
};
