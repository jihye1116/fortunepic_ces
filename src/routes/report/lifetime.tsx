/* eslint-disable @typescript-eslint/no-explicit-any */
import "../../global.css";

import { createFileRoute } from "@tanstack/react-router";
import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const data = dummyReportData;
  // localStorage 우선, 없으면 jotai atom

  const fortuneResult = getFortuneResultFromStorage();
  const lifetimeFortune = fortuneResult?.[0];

  // pillars 매핑: sajuInfo.pillars에서 추출
  const mappedPillars = lifetimeFortune?.sajuInfo?.pillars
    ? mapApiToPillars(lifetimeFortune.sajuInfo.pillars, t)
    : data.pillars;


  // lifePhases 매핑
  const mappedLifePhases = lifetimeFortune?.result?.lifetimeFortune?.lifePeriodFlow
    ? mapLifePhases(lifetimeFortune.result.lifetimeFortune.lifePeriodFlow, t)
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
    ? mapAreaStrategies(lifetimeFortune.result.lifetimeFortune.domainKaiun, t)
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

function mapApiToPillars(apiPillars: any, t: TFunction): any[] {
  const order = [
    { key: "year", name: t("report.pillars.year"), color: "#5B72B7" },
    { key: "month", name: t("report.pillars.month"), color: "#F6E24A" },
    { key: "day", name: t("report.pillars.day"), color: "#2C925E" },
    { key: "hour", name: t("report.pillars.hour"), color: "#E16B8C" },
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

function mapLifePhases(apiLifePeriodFlow: any, t: TFunction): any[] {
  console.log('apiLifePeriodFlow:', apiLifePeriodFlow);

  if (!apiLifePeriodFlow) return [];

  const phases = [];

  if (apiLifePeriodFlow.youthPeriod) {
    const youth = apiLifePeriodFlow.youthPeriod;
    const match = youth.title?.match(/^(.+?)\((.+?)\)/);
    phases.push({
      ageRange: match ? match[2] : t("report.lifePhases.defaultAge.youth"),
      phase: match ? match[1] : t("report.lifePhases.youth"),
      description: youth.analysis || "",
    });
  }

  if (apiLifePeriodFlow.middleAgePeriod) {
    const middle = apiLifePeriodFlow.middleAgePeriod;
    const match = middle.title?.match(/^(.+?)\((.+?)\)/);
    phases.push({
      ageRange: match ? match[2] : t("report.lifePhases.defaultAge.middle"),
      phase: match ? match[1] : t("report.lifePhases.middleAge"),
      description: middle.analysis || "",
    });
  }

  if (apiLifePeriodFlow.seniorAgePeriod) {
    const senior = apiLifePeriodFlow.seniorAgePeriod;
    const match = senior.title?.match(/^(.+?)\((.+?)\)/);
    phases.push({
      ageRange: match ? match[2] : t("report.lifePhases.defaultAge.senior"),
      phase: match ? match[1] : t("report.lifePhases.seniorAge"),
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

function mapAreaStrategies(domainKaiun: any, t: TFunction): any[] {
  if (!domainKaiun) return [];

  const strategies = [];

  if (domainKaiun.career) {
    const innate = domainKaiun.career.innateAbility || "";
    const peak = domainKaiun.career.peakTiming || "";
    strategies.push({
      area: "career" as const,
      title: domainKaiun.career.title || t("report.strategies.career"),
      description: innate + "\n\n" + peak,
      bgColor: "#324EA5",
    });
  }

  if (domainKaiun.health) {
    const strong = domainKaiun.health.strongAndWeakAreas || "";
    const manage = domainKaiun.health.management || "";
    strategies.push({
      area: "health" as const,
      title: domainKaiun.health.title || t("report.strategies.health"),
      description: strong + "\n\n" + manage,
      bgColor: "#2C925E",
    });
  }

  if (domainKaiun.wealth) {
    const method = domainKaiun.wealth.method || "";
    const prep = domainKaiun.wealth.preparation || "";
    strategies.push({
      area: "wealth" as const,
      title: domainKaiun.wealth.title || t("report.strategies.wealth"),
      description: method + "\n\n" + prep,
      bgColor: "#F6E24A",
    });
  }

  if (domainKaiun.relationship) {
    const style = domainKaiun.relationship.benefactorStyle || "";
    const attitude = domainKaiun.relationship.requiredAttitude || "";
    strategies.push({
      area: "relationship" as const,
      title: domainKaiun.relationship.title || t("report.strategies.relationship"),
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
