/* eslint-disable @typescript-eslint/no-explicit-any */

import type { TFunction } from "i18next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { instance } from "@/apis/instance";
import { AreaSpecificStrategies } from "@/components/report/AreaSpecificStrategies";
import { BasicEnergyInterpretation } from "@/components/report/BasicEnergyInterpretation";
import { FaceReading } from "@/components/report/FaceReading";
import { LifePhaseFlow } from "@/components/report/LifePhaseFlow";
import { PersonalizedAdvice } from "@/components/report/PersonalizedAdvice";
import { ReportFooter } from "@/components/report/ReportFooter";
import { ReportHeader } from "@/components/report/ReportHeader";
import { mapApiToPillars } from "@/core/mapApiToPillars";
import { dummyReportData } from "@/data/reportDummy";
import { AreaStrategy, RegulatingEnergy } from "@/types/report";

export default function NewYearReportPage({ id }: { id: string }) {
  const { t } = useTranslation();

  const [result, setResult] = useState<any>();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await instance.get(`/anthropic/fortunePic/${id}`);
    setResult(data.data);
  };

  // 실제 API 응답을 localStorage에서 가져오거나, 없으면 dummy 사용
  const data = dummyReportData;
  const fortuneResult = result;
  // new-year는 fortuneResult?.result?.yearlyFortune 기준
  const yearlyFortune = fortuneResult?.result?.yearlyFortune;
  const sajuInfo = fortuneResult?.sajuInfo;

  // Pillars 매핑 (sajuInfo.pillars)
  const mappedPillars = sajuInfo?.pillars
    ? mapApiToPillars(sajuInfo.pillars, t)
    : data.pillars;

  // LifePhases 매핑 (yearlyFortune.firstHalf, secondHalf, futureYears)
  const mappedLifePhases = yearlyFortune
    ? mapYearlyLifePhases(yearlyFortune, t)
    : data.lifePhases;

  // AreaSpecificStrategies 매핑 (yearlyFortune.categoryFortune)
  const mappedAreaStrategies = yearlyFortune
    ? mapYearlyAreaStrategies(yearlyFortune.categoryFortune, t)
    : data.areaStrategies;

  // PersonalizedAdvice 매핑 (yearlyFortune.elementGuidance)
  const mappedBeneficialEnergies = yearlyFortune
    ? mapYearlyBeneficialEnergies(yearlyFortune.elementGuidance, t)
    : data.beneficialEnergies;
  const mappedRegulatingEnergies: RegulatingEnergy[] = [];

  const nickname = fortuneResult?.nickname || data.nickname;
  const mappedFaceReadingAreas = data.faceReadingAreas; // API에 없으므로 dummy 사용

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#141415] text-[#DBDCDF]">
      <main className="relative z-10 mx-auto max-w-screen-sm pb-14">
        <ReportHeader sourceOfInsight="Four Pillars of Destiny" />
        <div className="space-y-8 px-4">
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
function mapYearlyLifePhases(yearlyFortune: any, t: TFunction) {
  const phases = [];
  if (yearlyFortune.firstHalf) {
    phases.push({
      ageRange:
        yearlyFortune.firstHalf.period || t("report.lifePhases.firstHalf"),
      phase: t("report.lifePhases.firstHalf"),
      description: yearlyFortune.firstHalf.analysis || "",
    });
  }
  if (yearlyFortune.secondHalf) {
    phases.push({
      ageRange:
        yearlyFortune.secondHalf.period || t("report.lifePhases.secondHalf"),
      phase: t("report.lifePhases.secondHalf"),
      description: yearlyFortune.secondHalf.analysis || "",
    });
  }
  if (yearlyFortune.futureYears) {
    Object.entries(yearlyFortune.futureYears).forEach(([year, info]: any) => {
      phases.push({
        ageRange: year + t("report.date.yearSuffix"),
        phase: info.yearPillar || year,
        description: info.analysis || "",
      });
    });
  }
  return phases;
}

// 연도별 운세 areaStrategies 매핑
function mapYearlyAreaStrategies(
  categoryFortune: any,
  t: TFunction,
): AreaStrategy[] {
  if (!categoryFortune) return [];
  return [
    {
      area: "career",
      title: t("report.strategies.career"),
      description: categoryFortune.career || "",
      bgColor: "#324EA5",
    },
    {
      area: "health",
      title: t("report.strategies.health"),
      description: categoryFortune.health || "",
      bgColor: "#2C925E",
    },
    {
      area: "wealth",
      title: t("report.strategies.wealth"),
      description: categoryFortune.wealth || "",
      bgColor: "#F6E24A",
    },
    {
      area: "relationship",
      title: t("report.strategies.relationship"),
      description: categoryFortune.relationship || "",
      bgColor: "#F16C6E",
    },
  ];
}

// 연도별 운세 beneficialEnergies 매핑
function mapYearlyBeneficialEnergies(elementGuidance: any, t: TFunction) {
  if (!elementGuidance) return [];
  return [
    {
      title: t("report.sections.beneficialEnergies"),
      description: elementGuidance,
    },
  ];
}

// 연도별 운세 regulatingEnergies 매핑 (여기선 없음, 빈 배열)
