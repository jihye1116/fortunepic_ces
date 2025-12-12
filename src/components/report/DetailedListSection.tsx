import React from "react";

interface DetailedListSectionItem {
  title: string;
  description: string;
}

interface DetailedListSectionProps {
  items: DetailedListSectionItem[];
  className?: string;
}

export function DetailedListSection({ items, className = "" }: DetailedListSectionProps) {
  return (
    <section className={`rounded-2xl bg-[#171719] p-[28px_20px] space-y-6 ${className}`}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <div className="space-y-6">
            <h3 className="text-[18px] font-semibold text-[#878A93] leading-[1.44] tracking-[-0.2%]">
              {item.title}
            </h3>
            <p className="text-[14px] leading-[1.57] text-[#AEB0B6] whitespace-pre-line tracking-[1%]">
              {item.description}
            </p>
          </div>
          {index < items.length - 1 && <div className="h-0.5 bg-[#212225]" />}
        </React.Fragment>
      ))}
    </section>
  );
}
