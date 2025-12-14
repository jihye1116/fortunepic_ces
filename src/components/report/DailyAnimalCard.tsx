import { useTranslation } from "react-i18next";

interface DailyAnimalCardProps {
  nickname: string;
  animal?: string;
  description?: string;
}

export function DailyAnimalCard({
  nickname,
  animal,
  description,
}: DailyAnimalCardProps) {
  const { t } = useTranslation();

  return (
    <section className="rounded-2xl bg-linear-to-b from-black/20 to-[#171719] p-[28px_20px] space-y-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] relative">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-0">
          <h2 className="text-[18px] font-medium text-[#878A93]">
            {t("report.dailyAnimalCard.title", { nickname })}
          </h2>
        </div>
      </div>

      <div className="relative w-40 h-40 bg-black/40 rounded-xl border border-white/5 flex items-center justify-center mx-auto">
        {/* Talisman image would go here */}
        <button className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 16L12 4"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M8 12L12 16L16 12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 20H20"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
      <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#1E2F63] text-[22px] font-bold text-center">
        {animal || t("report.dailyAnimalCard.defaultAnimal")}
      </h2>
      <div className="text-[14px] leading-[1.57] text-[#AEB0B6] whitespace-pre-line text-center">
        {description || t("report.dailyAnimalCard.defaultDescription")}
      </div>
    </section>
  );
}
