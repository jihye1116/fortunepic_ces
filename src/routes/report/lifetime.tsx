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

export const Route = createFileRoute("/report/lifetime")({
  component: LifetimeReportPage,
});


function LifetimeReportPage() {
  const data = dummyReportData;
  // localStorage 우선, 없으면 jotai atom

  const fortuneResult = getFortuneResultFromStorage();
  const lifetimeFortune = fortuneResult?.[0];

  // pillars 매핑: sajuInfo.pillars에서 추출
  const mappedPillars = lifetimeFortune?.sajuInfo?.pillars
    ? mapApiToPillars(lifetimeFortune.sajuInfo.pillars)
    : data.pillars;


  // lifePhases 매핑
  const mappedLifePhases = lifetimeFortune?.result?.lifetimeFortune?.lifePeriodFlow
    ? mapLifePhases(lifetimeFortune.result.lifetimeFortune.lifePeriodFlow)
    : data.lifePhases;



  const mappedBeneficialEnergies = lifetimeFortune?.result?.lifetimeFortune?.elementGuidance
    ? mapBeneficialEnergies(lifetimeFortune.result.lifetimeFortune.elementGuidance)
    : data.beneficialEnergies;
  const mappedRegulatingEnergies = lifetimeFortune?.result?.lifetimeFortune?.elementGuidance
    ? mapRegulatingEnergies(lifetimeFortune.result.lifetimeFortune.elementGuidance)
    : data.regulatingEnergies;
  const nickname = lifetimeFortune?.nickname || data.nickname;

  // AreaSpecificStrategies 매핑
  const mappedAreaStrategies = lifetimeFortune?.result?.lifetimeFortune?.domainKaiun
    ? mapAreaStrategies(lifetimeFortune.result.lifetimeFortune.domainKaiun)
    : data.areaStrategies;

  // 디버깅용 콘솔
  console.log('lifetimeFortune:', lifetimeFortune);


  return (
    <div className="relative min-h-screen bg-[#141415] text-[#DBDCDF] overflow-hidden">
      <main className="relative z-10 max-w-screen-sm mx-auto pb-14">
        <ReportHeader sourceOfInsight="Four Pillars of Destiny" />
        <div className="px-4 space-y-8">
          <BasicEnergyInterpretation
            nickname={nickname}
            pillars={mappedPillars}
          />

          <FaceReading faceReadingAreas={data.faceReadingAreas} />

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

function mapLifePhases(apiLifePeriodFlow: any): any[] {
  console.log('apiLifePeriodFlow:', apiLifePeriodFlow);

  if (!apiLifePeriodFlow) return [];

  const phases = [];

  if (apiLifePeriodFlow.youthPeriod) {
    const youth = apiLifePeriodFlow.youthPeriod;
    const match = youth.title?.match(/^(.+?)\((.+?)\)/);
    phases.push({
      ageRange: match ? match[2] : "20~39세",
      phase: match ? match[1] : "청년기",
      description: youth.analysis || "",
    });
  }

  if (apiLifePeriodFlow.middleAgePeriod) {
    const middle = apiLifePeriodFlow.middleAgePeriod;
    const match = middle.title?.match(/^(.+?)\((.+?)\)/);
    phases.push({
      ageRange: match ? match[2] : "40~59세",
      phase: match ? match[1] : "중년기",
      description: middle.analysis || "",
    });
  }

  if (apiLifePeriodFlow.seniorAgePeriod) {
    const senior = apiLifePeriodFlow.seniorAgePeriod;
    const match = senior.title?.match(/^(.+?)\((.+?)\)/);
    phases.push({
      ageRange: match ? match[2] : "60세 이상",
      phase: match ? match[1] : "노년기",
      description: senior.analysis || "",
    });
  }

  return phases;
}

function mapBeneficialEnergies(api: any): any[] {
  if (!api?.beneficialElements) return [];
  return [
    {
      title: api.beneficialElements.elements,
      description: api.beneficialElements.explanation,
    },
  ];
}

function mapRegulatingEnergies(api: any): any[] {
  if (!api?.elementsToControl) return [];
  return [
    {
      title: api.elementsToControl.elements,
      description: api.elementsToControl.explanation,
    },
  ];
}

function mapAreaStrategies(domainKaiun: any): any[] {
  if (!domainKaiun) return [];

  const strategies = [];

  if (domainKaiun.career) {
    const innate = domainKaiun.career.innateAbility || "";
    const peak = domainKaiun.career.peakTiming || "";
    strategies.push({
      area: "career" as const,
      title: domainKaiun.career.title || "커리어 운",
      description: innate + "\n\n" + peak,
      bgColor: "#324EA5",
    });
  }

  if (domainKaiun.health) {
    const strong = domainKaiun.health.strongAndWeakAreas || "";
    const manage = domainKaiun.health.management || "";
    strategies.push({
      area: "health" as const,
      title: domainKaiun.health.title || "건강 운",
      description: strong + "\n\n" + manage,
      bgColor: "#2C925E",
    });
  }

  if (domainKaiun.wealth) {
    const method = domainKaiun.wealth.method || "";
    const prep = domainKaiun.wealth.preparation || "";
    strategies.push({
      area: "wealth" as const,
      title: domainKaiun.wealth.title || "부(재물) 운",
      description: method + "\n\n" + prep,
      bgColor: "#F6E24A",
    });
  }

  if (domainKaiun.relationship) {
    const style = domainKaiun.relationship.benefactorStyle || "";
    const attitude = domainKaiun.relationship.requiredAttitude || "";
    strategies.push({
      area: "relationship" as const,
      title: domainKaiun.relationship.title || "관계 운",
      description: style + "\n\n" + attitude,
      bgColor: "#F16C6E",
    });
  }

  return strategies;
}

function getFortuneResultFromStorage() {
  try {
    const saved = localStorage.getItem("fortuneResultAtom");
    if (saved) return JSON.parse(saved);
  } catch { /* empty */ }
  return undefined;
}
