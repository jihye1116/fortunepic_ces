import { LifetimeReportData } from "@/types/report";

interface AreaSpecificStrategiesProps {
  areaStrategies: LifetimeReportData["areaStrategies"];
}

export function AreaSpecificStrategies({
  areaStrategies,
}: AreaSpecificStrategiesProps) {
  const areaImages: Record<string, string> = {
    career: "/src/assets/images/report/career-2f9ea5.png",
    health: "/src/assets/images/report/health.png",
    wealth: "/src/assets/images/report/wealth.png",
    relationship: "/src/assets/images/report/relationship.png",
  };

  return (
    <section className="rounded-2xl bg-[#171719] p-[28px_20px] space-y-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-medium text-[#878A93]">
          Area-Specific Strategies
        </h2>
      </div>

      <div className="relative">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory">
          {areaStrategies.map((strategy) => {
            const styles = {
              career: { bg: "#324EA5", text: "#DBDCDF" },
              health: { bg: "#2C925E", text: "#212225" },
              wealth: { bg: "#F6E24A", text: "#212225" },
              relationship: { bg: "#F16C6E", text: "#212225" },
            }[strategy.area] || { bg: strategy.bgColor, text: "#171719" };

            return (
              <div
                key={strategy.title}
                className="shrink-0 snap-start w-[305px] h-[447px] rounded-xl overflow-hidden bg-[#171719] flex flex-col"
              >
                <div className="relative h-[122px] p-[16px_12px]">
                  <img
                    src={areaImages[strategy.area]}
                    alt={strategy.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="relative z-10 flex items-start">
                    <span
                      className="px-3 py-1.5 rounded-[28px] text-[13px]"
                      style={{
                        backgroundColor: styles.bg,
                        color: styles.text,
                      }}
                    >
                      {strategy.title}
                    </span>
                  </div>
                </div>
                <div className="bg-[#212225] p-[24px_20px] flex-1">
                  <p className="text-[14px] leading-[1.57] text-[#AEB0B6]">
                    {strategy.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-1.5 mt-6">
          {areaStrategies.map((_, idx) => (
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
