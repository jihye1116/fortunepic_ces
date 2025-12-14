import { LifetimeReportData } from "@/types/report";

interface PersonalizedAdviceProps {
  beneficialEnergies: LifetimeReportData["beneficialEnergies"];
  regulatingEnergies: LifetimeReportData["regulatingEnergies"];
}

export function PersonalizedAdvice({
  beneficialEnergies,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // regulatingEnergies,
}: PersonalizedAdviceProps) {
  return (
    <section className="rounded-2xl bg-[#171719] p-[28px_20px] space-y-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
      <h2 className="text-[18px] font-medium text-[#878A93]">
        Personalized Advice for Success
      </h2>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-xl bg-[#292A2D] px-3 py-1.5 text-[15px] font-medium text-[#DBDCDF] h-[34px]">
            Beneficial Energies
          </div>
          <div className="space-y-4">
            {beneficialEnergies.map((energy) => (
              <div key={energy.title} className="space-y-1">
                <p className="text-[14px] leading-[1.57] text-[#AEB0B6] whitespace-pre-line">
                  {energy.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* changed planning
        <div className="h-0.5 w-full bg-[#212225]" />

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-xl bg-[#292A2D] px-3 py-1.5 text-[15px] font-medium text-[#DBDCDF] h-[34px]">
            Energies Requiring Regulation
          </div>
          <div className="space-y-4">
            {regulatingEnergies.map((energy) => (
              <div key={energy.title} className="space-y-1">
                <p className="text-[14px] leading-[1.57] text-[#AEB0B6] whitespace-pre-line">
                  {energy.description}
                </p>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
}
