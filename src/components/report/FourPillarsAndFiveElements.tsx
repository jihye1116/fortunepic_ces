import { useRef, useState } from "react";

import { FourPillarsData } from "@/types/report";

interface FourPillarsAndFiveElementsProps {
  nickname: string;
  data: FourPillarsData;
}

const ROW_LABELS = [
  "Heavenly Stem",
  "Heavenly Stem 10 Gods",
  "Earthly Branch",
  "Earthly Branch 10 Gods",
  "12 Life Stages",
];

export function FourPillarsAndFiveElements({
  nickname,
  data,
}: FourPillarsAndFiveElementsProps) {
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

  const pillars = ["hour", "day", "month", "year"] as const;
  const pillarData = [
    data.hour,
    data.day,
    data.month,
    data.year,
  ];

  const rowsData = [
    pillarData.map((p) => p.heavenlyStem),
    pillarData.map((p) => p.heavenlyStem10Gods),
    pillarData.map((p) => p.earthlyBranch),
    pillarData.map((p) => p.earthlyBranch10Gods),
    pillarData.map((p) => p.lifeStage12),
  ];

  return (
    <section className="rounded-2xl bg-gradient-to-b from-black/20 to-[#171719] p-[28px_20px] space-y-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
      <div className="space-y-0">
        <div className="flex items-center gap-1">
          <span className="text-[18px] font-medium text-[#878A93]">
            {nickname}
          </span>
          <span className="text-[18px] font-medium text-[#878A93]">'s</span>
        </div>
        <h2 className="text-[18px] font-medium text-[#878A93]">
          Four pillars and Five Elements
        </h2>
      </div>

      <div className="relative">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          className={`overflow-x-auto no-scrollbar cursor-grab ${
            isDragging ? "cursor-grabbing select-none" : ""
          }`}
        >
          <div className="inline-flex flex-col items-center gap-[11px]">
            {/* Header Row */}
            <div className="flex bg-[#5B72B7] rounded-4xl">
              <div className="w-[164px] text-center py-2.5 px-2.5 text-[13px] font-medium text-[#C2C4C8]">
                Pillar
              </div>
              {pillars.map((pillar) => (
                <div
                  key={pillar}
                  className="w-[88px] text-center py-2.5 px-2.5 text-[13px] font-medium text-[#C2C4C8] capitalize"
                >
                  {pillar}
                </div>
              ))}
            </div>
            {/* Data Container */}
            <div className="flex justify-between w-[516px]">
              {/* Left Column - Row Labels */}
              <div className="w-[164px] bg-[#171719] rounded-xl overflow-hidden">
                {ROW_LABELS.map((label, index) => (
                  <div key={label}>
                    <div className="h-[38px] px-4 flex items-center text-[13px] text-[#70737C]">
                      {label}
                    </div>
                    {index < ROW_LABELS.length - 1 && (
                      <div className="h-0.5 bg-[#37383C]" />
                    )}
                  </div>
                ))}
              </div>
              {/* Right Column - Data */}
              <div className="bg-[#171719]">
                {rowsData.map((row, rowIndex) => (
                  <div key={rowIndex}>
                    <div className="flex">
                      {row.map((cell, cellIndex) => (
                        <div
                          key={cellIndex}
                          className="w-[88px] h-[38px] flex justify-center items-center text-[13px] font-medium text-[#C2C4C8]"
                        >
                          {cell}
                        </div>
                      ))}
                    </div>
                    {rowIndex < rowsData.length - 1 && (
                      <div className="h-0.5 bg-[#212225]" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Gradient overlay */}
        {/* <div className="pointer-events-none absolute right-0 top-0 h-full w-[71px] bg-linear-to-l from-[#171719] to-transparent z-10" /> */}

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-4">
          <div className="w-[132px] h-1.5 bg-[#212225] rounded-full relative overflow-hidden">
            <div
              className={`absolute top-0 h-full w-8 bg-[#DBDCDF] transition-transform duration-100 ${
                scrollProgress > 0.95 ? "rounded-full" : "rounded-l-full"
              }`}
              style={{
                transform: `translateX(${scrollProgress * (132 - 32)}px)`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}