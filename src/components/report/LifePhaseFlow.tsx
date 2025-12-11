import { LifetimeReportData } from "@/types/report";

interface LifePhaseFlowProps {
  lifePhases: LifetimeReportData["lifePhases"];
}

export function LifePhaseFlow({ lifePhases }: LifePhaseFlowProps) {
  return (
    <section className="rounded-2xl bg-[#171719] p-6 space-y-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
      <h2 className="text-[18px] font-semibold text-[#878A93]">
        Life Phase Flow
      </h2>

      <div className="relative h-[560px] overflow-hidden">
        <div className="space-y-8">
          {lifePhases.map((phase, idx) => (
            <div key={phase.phase} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-[34px] shrink-0">
                  <div className="relative flex items-center justify-center w-3.5 h-3.5">
                    <div className="absolute w-3.5 h-3.5 rounded-full bg-[#8495C9]" />
                    <div className="absolute w-2 h-2 rounded-full bg-[#324EA5]" />
                  </div>
                </div>
                {idx < lifePhases.length - 1 && (
                  <div className="w-0.5 flex-1 bg-[#324EA5]/30 mt-4" />
                )}
              </div>
              <div className="flex-1 space-y-3 pb-8">
                <div className="inline-flex items-center gap-2 rounded-xl bg-[#292A2D] px-3 py-1.5 text-[15px] font-medium text-[#DBDCDF] h-[34px]">
                  {phase.phase} ({phase.ageRange})
                </div>
                <p className="text-[14px] leading-[1.57] text-[#AEB0B6] whitespace-pre-line">
                  {phase.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-[154px] bg-linear-to-t from-[#171719] to-transparent pointer-events-none" />
      </div>

      <button className="w-full rounded-lg border border-white/30 px-4 py-3 text-[14px] font-medium text-[#DBDCDF] hover:bg-white/5 transition">
        See All
      </button>
    </section>
  );
}
