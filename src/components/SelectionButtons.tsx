import { cn } from "@sglara/cn";
import { useState } from "react";

const gradientClasses = [
  "bg-[radial-gradient(90%_260%_at_0%_50%,#f16c6e_0%,#8495c9_40%,rgba(0,0,0,0.3)_100%)]", // 첫번째 - 빨강
  "bg-[radial-gradient(90%_260%_at_0%_50%,#f6e24a_0%,#8495c9_40%,rgba(0,0,0,0.3)_100%)]", // 두번째 - 노랑
  "bg-[radial-gradient(90%_260%_at_0%_50%,#56a87e_0%,#8495c9_40%,rgba(0,0,0,0.3)_100%)]", // 세번째 - 초록
  "bg-[radial-gradient(90%_260%_at_0%_50%,#cacaca_0%,#8495c9_40%,rgba(0,0,0,0.3)_100%)]", // 네번째 - 회색
];

const defaultGradientClass =
  "bg-[radial-gradient(120%_100%_at_0%_50%,rgba(132,149,201,0.20)_0%,rgba(0,0,0,0.06)_100%)]";

interface SelectionOption {
  id: string;
  label: string;
}

interface SelectionButtonsProps {
  options: SelectionOption[];
  onSelect: (id: string) => void;
}

export const SelectionButtons = ({
  options,
  onSelect,
}: SelectionButtonsProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    onSelect(id);
  };

  return (
    <div className="flex flex-col gap-6">
      {options.map((option, index) => {
        const isSelected = selectedId === option.id;
        return (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className={cn(
              "flex items-center rounded-xl px-12 py-10 transition-all duration-300",
              isSelected && "shadow-[0_0_0_4px_#292A2D]",
              isSelected ? gradientClasses[index] : defaultGradientClass,
            )}
          >
            <p
              className={cn(
                "text-[2.5rem] leading-[130%] tracking-[-0.025rem]",
                isSelected ? "font-semibold text-white" : "text-[#E1E2E4]",
              )}
            >
              {option.label}
            </p>
          </button>
        );
      })}
    </div>
  );
};
