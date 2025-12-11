
export interface CarouselCardItem {
  id: string | number;
  imageUrl: string;
  chipText: string;
  chipStyle?: {
    backgroundColor: string;
    color: string;
  };
  description: string;
}

interface CardCarouselProps {
  title: string;
  items: CarouselCardItem[];
  cardWidth?: string; // e.g. "w-[305px]" or "w-[240px]"
}

export function CardCarousel({
  title,
  items,
  cardWidth = "w-[305px]",
}: CardCarouselProps) {
  return (
    <section className="rounded-2xl bg-[#171719] p-[28px_20px] space-y-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-medium text-[#878A93]">{title}</h2>
      </div>

      <div className="relative">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory">
          {items.map((item) => (
            <div
              key={item.id}
              className={`shrink-0 snap-start ${cardWidth} rounded-xl overflow-hidden bg-[#171719] flex flex-col`}
            >
              <div className="relative h-[122px] p-[16px_12px]">
                <img
                  src={item.imageUrl}
                  alt={item.chipText}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="relative z-10 flex items-start">
                  <span
                    className="px-3 py-1.5 rounded-[28px] text-[13px]"
                    style={{
                      backgroundColor:
                        item.chipStyle?.backgroundColor ||
                        "rgba(255, 255, 255, 0.6)",
                      color: item.chipStyle?.color || "#171719",
                    }}
                  >
                    {item.chipText}
                  </span>
                </div>
              </div>
              <div className="bg-[#212225] p-[24px_20px] flex-1">
                <p className="text-[14px] leading-[1.57] text-[#AEB0B6]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-1.5 mt-6">
          {items.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all ${
                idx === 0 ? "w-[26px] bg-[#DBDCDF]" : "w-1.5 bg-[#5A5C63]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
