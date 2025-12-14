import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { LifetimeReportData } from "@/types/report";

interface BasicEnergyInterpretationProps {
  nickname: string;
  pillars: LifetimeReportData["pillars"];
}

const pillarNameMap: Record<string, string> = {
  "Year Pillar": "year",
  "Month Pillar": "month",
  "Day Pillar": "day",
  "Hour Pillar": "hour",
};

export function BasicEnergyInterpretation({
  nickname,
  pillars,
}: BasicEnergyInterpretationProps) {
  const { t } = useTranslation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
      setScrollProgress(progress);
    }
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setStartScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = startScrollLeft - walk;
  };

  return (
    <section className="rounded-2xl bg-linear-to-b from-black/20 to-[#171719] p-[28px_20px] space-y-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
      <div className="space-y-0">
        <h2 className="text-[18px] font-medium text-[#878A93]">
          {t("report.basicEnergyInterpretation.title", { nickname })}
        </h2>
      </div>

      <div className="relative">
        {/* Scroll Fade Right */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-[71px] bg-linear-to-l from-[#171719] to-transparent z-10" />

        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          className={`flex gap-14 overflow-x-auto no-scrollbar pb-4 px-1 cursor-grab ${
            isDragging ? "cursor-grabbing select-none" : ""
          }`}
          style={{ scrollSnapType: isDragging ? "none" : "x mandatory" }}
        >
          {pillars.map((pillar) => (
            <div
              key={pillar.name}
              className="shrink-0 flex flex-col gap-3 snap-center"
            >
              <h3 className="text-[16px] font-medium text-[#E1E2E4]">
                {t(`report.pillars.${pillarNameMap[pillar.name]}`, {
                  defaultValue: pillar.name,
                })}
              </h3>
              <div className="flex flex-col gap-2 items-start">
                {pillar.keywords.map((keyword) => (
                  <span
                    key={keyword.text}
                    className="px-3 py-1.5 rounded-[28px] text-[13px] text-black/70 flex justify-center items-center whitespace-nowrap"
                    style={{ backgroundColor: pillar.color }}
                  >
                    {keyword.text}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-2">
          <div className="w-[132px] h-1.5 bg-[#212225] rounded-full relative overflow-hidden">
            <div
              className={`absolute top-0 h-full w-8 bg-[#DBDCDF] transition-all duration-100 ${
                scrollProgress > 0.95 ? "rounded-full" : "rounded-l-full"
              }`}
              style={{
                left: `${scrollProgress * (132 - 32)}px`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
