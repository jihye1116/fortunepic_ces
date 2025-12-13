import "../../global.css";

import { createFileRoute } from "@tanstack/react-router";

import { DailyAnimalCard } from "@/components/report/DailyAnimalCard";
import { DailyPilarCard } from "@/components/report/DailyPilarCard";
import { FaceReading } from "@/components/report/FaceReading";
import { ReportFooter } from "@/components/report/ReportFooter";
import { ReportHeader } from "@/components/report/ReportHeader";
import { TagListSection } from "@/components/report/TagListSection";
import { dummyReportData } from "@/data/reportDummy";

export const Route = createFileRoute("/report/daily-pilar")({
  component: DailyPilarFortunePage,
});

function DailyPilarFortunePage() {
  const data = dummyReportData;

  const fortuneResult = getFortuneResultFromStorage();
  const dayPillarAnimal = fortuneResult?.[0]?.result?.dayPillarAnimal;
  const nickname = fortuneResult?.[0]?.nickname || data.nickname;

  // 1. Strength & Weakness Mapping
  const mappedStrengthWeakness = dayPillarAnimal
    ? [
        {
          tag: "Strength",
          tagColor: "#5B72B7",
          description: dayPillarAnimal.strengths,
        },
        {
          tag: "Weakness",
          tagColor: "#F16C6E",
          description: dayPillarAnimal.weaknesses,
        },
      ]
    : [
        {
          tag: "Recommend",
          tagColor: "#5B72B7",
          description:
            "당신의 청년기는 초기에는 환경 적응력과 기본 역량을 안정적으로 다지는 기운이 중심이 되고, 이후에는 능력 발현과 성과 확장을 극대화하는 기운이 펼쳐지는 성장 구조로 전개되는 시기입니다. 내부를 정비한 뒤 외부로 도약하는, 단계적으로 균형 잡힌 상승 흐름이 특징입니다.",
        },
        {
          tag: "Avoid",
          tagColor: "#F16C6E",
          description:
            "당신의 청년기는 초기에는 환경 적응력과 기본 역량을 안정적으로 다지는 기운이 중심이 되고, 이후에는 능력 발현과 성과 확장을 극대화하는 기운이 펼쳐지는 성장 구조로 전개되는 시기입니다. 내부를 정비한 뒤 외부로 도약하는, 단계적으로 균형 잡힌 상승 흐름이 특징입니다.",
        },
      ];

  // 2. Current State Mapping
  const currentState = dayPillarAnimal?.currentLifeStageStatus
    ? {
        status: dayPillarAnimal.currentLifeStageStatus.currentStatus,
        physiognomy: dayPillarAnimal.currentLifeStageStatus.physiognomyBasis,
      }
    : {
        status: "당신의 청년기는 초기에는 환경 적응력과 기본 역량을 안정적으로 다지는 기운이 중심이 되고, 이후에는 능력 발현과 성과 확장을 극대화하는 기운이 펼쳐지는 성장 구조로 전개되는 시기입니다. 내부를 정비한 뒤 외부로 도약하는, 단계적으로 균형 잡힌 상승 흐름이 특징입니다.",
        physiognomy: "당신의 청년기는 초기에는 환경 적응력과 기본 역량을 안정적으로 다지는 기운이 중심이 되고, 이후에는 능력 발현과 성과 확장을 극대화하는 기운이 펼쳐지는 성장 구조로 전개되는 시기입니다. 내부를 정비한 뒤 외부로 도약하는, 단계적으로 균형 잡힌 상승 흐름이 특징입니다.",
      };

  // 3. Compatible & Incompatible People Mapping
  const mappedCompatible = dayPillarAnimal?.compatibleAnimals
    ? [
        {
          tag: "Helpful",
          tagColor: "#5B72B7",
          description: dayPillarAnimal.compatibleAnimals.helpful,
        },
        {
          tag: "Challenging",
          tagColor: "#F16C6E",
          description: dayPillarAnimal.compatibleAnimals.challenging,
        },
      ]
    : [
        {
          tag: "Recommend",
          tagColor: "#5B72B7",
          description:
            "당신의 청년기는 초기에는 환경 적응력과 기본 역량을 안정적으로 다지는 기운이 중심이 되고, 이후에는 능력 발현과 성과 확장을 극대화하는 기운이 펼쳐지는 성장 구조로 전개되는 시기입니다. 내부를 정비한 뒤 외부로 도약하는, 단계적으로 균형 잡힌 상승 흐름이 특징입니다.",
        },
        {
          tag: "Avoid",
          tagColor: "#F16C6E",
          description:
            "당신의 청년기는 초기에는 환경 적응력과 기본 역량을 안정적으로 다지는 기운이 중심이 되고, 이후에는 능력 발현과 성과 확장을 극대화하는 기운이 펼쳐지는 성장 구조로 전개되는 시기입니다. 내부를 정비한 뒤 외부로 도약하는, 단계적으로 균형 잡힌 상승 흐름이 특징입니다.",
        },
      ];

  return (
    <div className="relative min-h-screen bg-[#141415] text-[#DBDCDF] overflow-hidden">
      <main className="relative z-10 max-w-screen-sm mx-auto pb-14">
        <ReportHeader sourceOfInsight="Day Pillar Animal" />

        <div className="px-4 space-y-8">
          
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
          
          <section className="rounded-2xl bg-[#171719] p-[28px_20px] space-y-8">
            <h2 className="text-[18px] font-semibold text-[#878A93]">Current State</h2>

            <div className="space-y-6">
              <div className="text-[14px] leading-[1.57] text-[#AEB0B6] whitespace-pre-line">
                {currentState.status}
              </div>
              <div className="text-[14px] leading-[1.57] text-[#AEB0B6] whitespace-pre-line">
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
  } catch { /* empty */ }
  return undefined;
}
