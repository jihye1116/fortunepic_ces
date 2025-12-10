interface CancelButtonProps {
  onCancel: () => void;
  children: React.ReactNode;
}

export const CancelButton = ({ onCancel, children }: CancelButtonProps) => {
  return (
    <button
      onClick={onCancel}
      className="flex w-full items-center justify-center rounded-3xl py-10"
    >
      <p className="text-[2.5rem] leading-[1.3] font-medium tracking-[-0.015rem] text-[#989BA2]">
        {children}
      </p>
    </button>
  );
};
