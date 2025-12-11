import { cn } from "@sglara/cn";

interface SecondaryButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export const SecondaryButton = ({
  onClick,
  children,
  disabled = false,
}: SecondaryButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex w-full items-center justify-center rounded-3xl py-10",
        disabled ? "bg-[#212225]" : "bg-[#E1E2E4] active:bg-[#AEB0B6]",
      )}
    >
      <p
        className={cn(
          "font-pretendard text-[2.5rem] leading-[1.3] font-medium tracking-[-0.0375rem] whitespace-nowrap",
          disabled ? "text-[#70737C]" : "text-[#171719]",
        )}
      >
        {children}
      </p>
    </button>
  );
};
