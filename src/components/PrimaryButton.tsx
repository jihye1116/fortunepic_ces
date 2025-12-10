import { cn } from "@sglara/cn";

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
      className={cn(
        "flex w-full items-center justify-center rounded-3xl py-10",
        disabled
          ? "bg-[#212225]"
          : "bg-[radial-gradient(50%_140%_at_50%_50%,#324EA5_0%,#8495C9_50%,#212225_100%)] active:bg-[radial-gradient(76%_214%_at_50%_50%,#324EA5_0%,#8495C9_50%,#212225_100%)]",
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <span
        className={cn(
          "font-pretendard text-[2.5rem] leading-[1.3] font-medium tracking-[-0.0375rem]",
          disabled ? "text-[#70737C]" : "text-white",
        )}
      >
        {children}
      </span>
    </button>
  );
};
