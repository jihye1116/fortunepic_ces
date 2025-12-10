import { cn } from "@sglara/cn";

interface OutlineButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export const OutlineButton = ({
  onClick,
  children,
  disabled = false,
}: OutlineButtonProps) => {
  return (
    <button
      className={cn(
        "flex w-full items-center justify-center rounded-3xl border-4 py-10",
        disabled
          ? "border-[#212225]"
          : "border-[#37383C] text-[#AEB0B6] active:border-[#212225] active:bg-[radial-gradient(120%_100%_at_0%_50%,rgba(132,149,201,0.2)_0%,rgba(66,75,101,0.13)_50%,rgba(0,0,0,0.06)_100%)] active:text-white",
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <p
        className={cn(
          "font-pretendard text-[2.5rem] leading-[1.3] font-medium tracking-[-0.0375rem]",
          disabled && "text-[#70737C]",
        )}
      >
        {children}
      </p>
    </button>
  );
};
