import { cn } from "@sglara/cn";

interface CancelButtonProps {
  onCancel: () => void;
  children: React.ReactNode;
  className?: string;
}

export const CancelButton = ({
  onCancel,
  children,
  className,
}: CancelButtonProps) => {
  return (
    <button
      onClick={onCancel}
      className={cn(
        "flex w-full items-center justify-center rounded-3xl py-10",
        className,
      )}
    >
      <p className="text-[2.5rem] leading-[1.3] font-medium tracking-[-0.015rem] text-[#989BA2]">
        {children}
      </p>
    </button>
  );
};
