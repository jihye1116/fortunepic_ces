import { cn } from "@sglara/cn";

interface TitleProps {
  text: string;
  subtext?: string;
}

export const Title = ({ text, subtext }: TitleProps) => {
  return (
    <div className="flex flex-col gap-3 px-20 py-10">
      <h1
        className={cn(
          "gradient-text text-[3.5rem] leading-[1.3] font-medium tracking-[-0.07rem]",
          !subtext && "h-[calc(3.5rem*1.3*2)]",
        )}
      >
        {text}
      </h1>
      {subtext && (
        <h2 className="text-[2.5rem] leading-[1.3] tracking-[-0.01rem] text-[#989ba2]">
          {subtext}
        </h2>
      )}
    </div>
  );
};
