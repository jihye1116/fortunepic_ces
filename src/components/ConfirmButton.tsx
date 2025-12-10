import { cn } from "@sglara/cn";

interface ConfirmButtonProps {
  onConfirm: () => void;
  children: React.ReactNode;
  className?: string;
}

export const ConfirmButton = ({
  onConfirm,
  children,
  className,
}: ConfirmButtonProps) => {
  return (
    <button
      onClick={onConfirm}
      className={cn(
        "flex w-full items-center justify-center rounded-3xl bg-[#E1E2E4] py-10",
        className,
      )}
    >
      <p className="text-[2.5rem] leading-[1.3] font-medium tracking-[-0.015rem] text-[#171719]">
        {children}
      </p>
    </button>
  );
};
