import { useTranslation } from "react-i18next";

import { DailyAnimalCard } from "@/components/report/DailyAnimalCard";
import { DailyPilarCard } from "@/components/report/DailyPilarCard";
import { FaceReading } from "@/components/report/FaceReading";
import { ReportFooter } from "@/components/report/ReportFooter";
import { ReportHeader } from "@/components/report/ReportHeader";
import { TagListSection } from "@/components/report/TagListSection";
import { dummyReportData } from "@/data/reportDummy";

export default function DailyPilarFortunePage() {
  const { t } = useTranslation();
  const data = dummyReportData;

  const fortuneResult = getFortuneResultFromStorage();
  const dayPillarAnimal = fortuneResult?.[0]?.result?.dayPillarAnimal;
  const nickname = fortuneResult?.[0]?.nickname || data.nickname;

  // 1. Strength & Weakness Mapping
  const mappedStrengthWeakness = dayPillarAnimal
    ? [
        {
          tag: t("report.dailyPillar.tags.strength"),
          tagColor: "#5B72B7",
          description: dayPillarAnimal.strengths,
        },
        {
          tag: t("report.dailyPillar.tags.weakness"),
          tagColor: "#F16C6E",
          description: dayPillarAnimal.weaknesses,
        },
      ]
    : [
        {
          tag: t("report.dailyPillar.tags.recommend"),
          tagColor: "#5B72B7",
          description: t("report.dailyPillar.defaultDescription"),
        },
        {
          tag: t("report.dailyPillar.tags.avoid"),
          tagColor: "#F16C6E",
          description: t("report.dailyPillar.defaultDescription"),
        },
      ];

  // 2. Current State Mapping
  const currentState = dayPillarAnimal?.currentLifeStageStatus
    ? {
        status: dayPillarAnimal.currentLifeStageStatus.currentStatus,
        physiognomy: dayPillarAnimal.currentLifeStageStatus.physiognomyBasis,
      }
    : {
        status: t("report.dailyPillar.defaultDescription"),
        physiognomy: t("report.dailyPillar.defaultDescription"),
      };

  // 3. Compatible & Incompatible People Mapping
  const mappedCompatible = dayPillarAnimal?.compatibleAnimals
    ? [
        {
          tag: t("report.dailyPillar.tags.helpful"),
          tagColor: "#5B72B7",
          description: dayPillarAnimal.compatibleAnimals.helpful,
        },
        {
          tag: t("report.dailyPillar.tags.challenging"),
          tagColor: "#F16C6E",
          description: dayPillarAnimal.compatibleAnimals.challenging,
        },
      ]
    : [
        {
          tag: t("report.dailyPillar.tags.recommend"),
          tagColor: "#5B72B7",
          description: t("report.dailyPillar.defaultDescription"),
        },
        {
          tag: t("report.dailyPillar.tags.avoid"),
          tagColor: "#F16C6E",
          description: t("report.dailyPillar.defaultDescription"),
        },
      ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#141415] text-[#DBDCDF]">
      <main className="relative z-10 mx-auto max-w-screen-sm pb-14">
        <ReportHeader sourceOfInsight="Day Pillar Animal" />

        <div className="space-y-8 px-4">
          <DailyAnimalCard
            nickname={nickname}
            animal={dayPillarAnimal?.animalEnglish}
            description={dayPillarAnimal?.summary}
          />

          <DailyPilarCard nickname={nickname} />

          <TagListSection
            title="Strength & Weakness"
            items={mappedStrengthWeakness}
          />

          <section className="space-y-8 rounded-2xl bg-[#171719] p-[28px_20px]">
            <h2 className="text-[18px] font-semibold text-[#878A93]">
              Current State
            </h2>

            <div className="space-y-6">
              <div className="text-[14px] leading-[1.57] whitespace-pre-line text-[#AEB0B6]">
                {currentState.status}
              </div>
              <div className="text-[14px] leading-[1.57] whitespace-pre-line text-[#AEB0B6]">
                {currentState.physiognomy}
              </div>
            </div>
          </section>

          <TagListSection
            title="Compatible & Incompatible people"
            items={mappedCompatible}
          />

          <FaceReading faceReadingAreas={data.faceReadingAreas} />

          <ReportFooter />
        </div>
      </main>
    </div>
  );
}

function getFortuneResultFromStorage() {
  try {
    const saved = localStorage.getItem("fortuneResultAtom");
    if (saved) return JSON.parse(saved);
  } catch {
    /* empty */
  }
  return undefined;
}
