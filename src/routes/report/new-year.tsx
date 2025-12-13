/* eslint-disable @typescript-eslint/no-explicit-any */
import "../../global.css";

import { createFileRoute } from "@tanstack/react-router";

import { AreaSpecificStrategies } from "@/components/report/AreaSpecificStrategies";
import { BasicEnergyInterpretation } from "@/components/report/BasicEnergyInterpretation";
import { FaceReading } from "@/components/report/FaceReading";
import { LifePhaseFlow } from "@/components/report/LifePhaseFlow";
import { PersonalizedAdvice } from "@/components/report/PersonalizedAdvice";
import { ReportFooter } from "@/components/report/ReportFooter";
import { ReportHeader } from "@/components/report/ReportHeader";
import { dummyReportData } from "@/data/reportDummy";
import { AreaStrategy, RegulatingEnergy } from "@/types/report";

export const Route = createFileRoute("/report/new-year")({
  component: NewYearReportPage,
});


function NewYearReportPage() {
  // 실제 API 응답을 localStorage에서 가져오거나, 없으면 dummy 사용
  const data = dummyReportData;
  const fortuneResult = getFortuneResultFromStorage();
  // new-year는 fortuneResult?.[0]?.result?.yearlyFortune 기준
  const yearlyFortune = fortuneResult?.[0]?.result?.yearlyFortune;
  const sajuInfo = fortuneResult?.[0]?.sajuInfo;

  // Pillars 매핑 (sajuInfo.pillars)
  const mappedPillars = sajuInfo?.pillars ? mapApiToPillars(sajuInfo.pillars) : data.pillars;

  // LifePhases 매핑 (yearlyFortune.firstHalf, secondHalf, futureYears)
  const mappedLifePhases = yearlyFortune
    ? mapYearlyLifePhases(yearlyFortune)
    : data.lifePhases;

  // AreaSpecificStrategies 매핑 (yearlyFortune.categoryFortune)
  const mappedAreaStrategies = yearlyFortune
    ? mapYearlyAreaStrategies(yearlyFortune.categoryFortune)
    : data.areaStrategies;

  // PersonalizedAdvice 매핑 (yearlyFortune.elementGuidance)
  const mappedBeneficialEnergies = yearlyFortune
    ? mapYearlyBeneficialEnergies(yearlyFortune.elementGuidance)
    : data.beneficialEnergies;
  const mappedRegulatingEnergies: RegulatingEnergy[] = [];

  const nickname = fortuneResult?.[0]?.nickname || data.nickname;
  const mappedFaceReadingAreas = data.faceReadingAreas; // API에 없으므로 dummy 사용

  return (
    <div className="relative min-h-screen bg-[#141415] text-[#DBDCDF] overflow-hidden">
      <main className="relative z-10 max-w-screen-sm mx-auto pb-14">
        <ReportHeader sourceOfInsight="Four Pillars of Destiny" />
        <div className="px-4 space-y-8">
          <BasicEnergyInterpretation
            nickname={nickname}
            pillars={mappedPillars}
          />
          <FaceReading faceReadingAreas={mappedFaceReadingAreas} />
          <LifePhaseFlow lifePhases={mappedLifePhases} />
          <AreaSpecificStrategies areaStrategies={mappedAreaStrategies} />
          <PersonalizedAdvice
            beneficialEnergies={mappedBeneficialEnergies}
            regulatingEnergies={mappedRegulatingEnergies}
          />
          <ReportFooter />
        </div>
      </main>
    </div>
  );
}

// 연도별 운세 lifePhases 매핑
function mapYearlyLifePhases(yearlyFortune: any) {
  const phases = [];
  if (yearlyFortune.firstHalf) {
    phases.push({
      ageRange: yearlyFortune.firstHalf.period || "상반기",
      phase: "상반기",
      description: yearlyFortune.firstHalf.analysis || "",
    });
  }
  if (yearlyFortune.secondHalf) {
    phases.push({
      ageRange: yearlyFortune.secondHalf.period || "하반기",
      phase: "하반기",
      description: yearlyFortune.secondHalf.analysis || "",
    });
  }
  if (yearlyFortune.futureYears) {
    Object.entries(yearlyFortune.futureYears).forEach(([year, info]: any) => {
      phases.push({
        ageRange: year + "년",
        phase: info.yearPillar || year,
        description: info.analysis || "",
      });
    });
  }
  return phases;
}

// 연도별 운세 areaStrategies 매핑
function mapYearlyAreaStrategies(categoryFortune: any): AreaStrategy[] {
  if (!categoryFortune) return [];
  return [
    {
      area: "career",
      title: "커리어 운",
      description: categoryFortune.career || "",
      bgColor: "#324EA5",
    },
    {
      area: "health",
      title: "건강 운",
      description: categoryFortune.health || "",
      bgColor: "#2C925E",
    },
    {
      area: "wealth",
      title: "부(재물) 운",
      description: categoryFortune.wealth || "",
      bgColor: "#F6E24A",
    },
    {
      area: "relationship",
      title: "관계 운",
      description: categoryFortune.relationship || "",
      bgColor: "#F16C6E",
    },
  ];
}

// 연도별 운세 beneficialEnergies 매핑
function mapYearlyBeneficialEnergies(elementGuidance: any) {
  if (!elementGuidance) return [];
  return [
    {
      title: "이로운 오행/에너지",
      description: elementGuidance,
    },
  ];
}

// 연도별 운세 regulatingEnergies 매핑 (여기선 없음, 빈 배열)


// Mapping functions (copied from lifetime.tsx)
function mapApiToPillars(apiPillars: any): any[] {
  const order = [
    { key: "year", name: "Year Pillar", color: "#5B72B7" },
    { key: "month", name: "Month Pillar", color: "#F6E24A" },
    { key: "day", name: "Day Pillar", color: "#2C925E" },
    { key: "hour", name: "Hour Pillar", color: "#E16B8C" },
  ];
  return order.map(({ key, name, color }) => {
    const p = apiPillars[key];
    return {
      name,
      color,
      keywords: [
        { text: p.stem },
        { text: p.tenGodsStem },
        { text: p.branch },
        { text: p.tenGodsBranch },
        { text: p.twelveStage },
      ],
    };
  });
}



// LocalStorage util (copied from lifetime.tsx)
function getFortuneResultFromStorage() {
  try {
    const saved = localStorage.getItem("fortuneResultAtom");
    if (saved) return JSON.parse(saved);
  } catch { /* empty */ }
  return undefined;
}
