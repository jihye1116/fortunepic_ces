import { useTranslation } from "react-i18next";

interface DetailedEnergyAnalysisProps {
  title?: string;
  score: number;
  keywords: string[];
  description: string;
  tagColor?: string;
}

export function DetailedEnergyAnalysis({
  title,
  score,
  keywords,
  description,
  tagColor = "#5B72B7",
}: DetailedEnergyAnalysisProps) {
  const { t } = useTranslation();
  const finalTitle = title || t("report.sections.detailedEnergyAnalysis");

  return (
    <section className="rounded-2xl bg-[#171719] p-6 space-y-6">
      <h2 className="text-[18px] font-semibold text-[#878A93]">
        {finalTitle}
      </h2>

      <div className="space-y-1">
        <div className="flex items-center gap-2.5">
          <div className="h-2 flex-1 rounded-full bg-[#46474C] overflow-hidden">
            <div
              className="h-full rounded-full bg-linear-to-r from-[#5B72B7] to-[#F16C6E]"
              style={{ width: `${score}%` }}
            />
          </div>
          <div className="flex items-center gap-0.5 text-[14px]">
            <span className="font-semibold text-[#AEB0B6]">{score}</span>
            <span className="text-[#5A5C63]">/100</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword) => (
          <div
            key={keyword}
            className="rounded-full px-3 py-1.5"
            style={{ backgroundColor: tagColor }}
          >
            <span className="text-[13px] text-black/70">{keyword}</span>
          </div>
        ))}
      </div>

      <p className="text-[14px] leading-[1.57] text-[#AEB0B6] whitespace-pre-line">
        {description}
      </p>
    </section>
  );
}
