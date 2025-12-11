import { cn } from "@sglara/cn";
import { Fragment, useState } from "react";

import GreenIcon from "@/assets/icons/green.svg?react";
import RedIcon from "@/assets/icons/red.svg?react";
import WhiteIcon from "@/assets/icons/white.svg?react";
import YellowIcon from "@/assets/icons/yellow.svg?react";

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
  showIcon?: boolean;
}

export const SelectionButtons = ({
  options,
  onSelect,
  showIcon = false,
}: SelectionButtonsProps) => {
  const Icons = [<RedIcon />, <YellowIcon />, <GreenIcon />, <WhiteIcon />];

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    onSelect(id);
  };

  return (
    <div className="flex flex-col gap-6">
      {options.map((option, index) => {
        const isSelected = selectedId === option.id;

        const Button = (
          <button
            onClick={() => handleSelect(option.id)}
            className={cn(
              "relative flex w-full items-center overflow-hidden rounded-xl px-12 py-10",
              isSelected && "shadow-[0_0_0_4px_#292A2D]",
              defaultGradientClass,
            )}
          >
            <div
              className={cn(
                "absolute inset-0 transition-opacity duration-300",
                gradientClasses[index],
                isSelected ? "opacity-100" : "opacity-0",
              )}
            />
            <p
              className={cn(
                "relative z-10 text-[2.5rem] leading-[1.3] tracking-[-0.025rem]",
                isSelected ? "font-semibold text-white" : "text-[#E1E2E4]",
              )}
            >
              {option.label}
            </p>
          </button>
        );

        if (showIcon) {
          return (
            <div key={option.id} className="flex items-center gap-6">
              {Icons[index]}
              {Button}
            </div>
          );
        }

        return <Fragment key={option.id}>{Button}</Fragment>;
      })}
    </div>
  );
};
