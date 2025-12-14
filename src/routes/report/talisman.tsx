/* eslint-disable @typescript-eslint/no-explicit-any */
import "../../global.css";

import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { BasicEnergyInterpretation } from "@/components/report/BasicEnergyInterpretation";
import { DetailedEnergyAnalysis } from "@/components/report/DetailedEnergyAnalysis";
import { FaceReading } from "@/components/report/FaceReading";
import { ReportFooter } from "@/components/report/ReportFooter";
import { ReportHeader } from "@/components/report/ReportHeader";
import { TagListSection } from "@/components/report/TagListSection";
import { mapApiToPillars } from "@/core/mapApiToPillars";
import { dummyReportData } from "@/data/reportDummy";

export const Route = createFileRoute("/report/talisman")({
  component: TalismanFortunePage,
});

function TalismanFortunePage() {
  const { t } = useTranslation();
  const data = dummyReportData;

  const fortuneResult = getFortuneResultFromStorage();
  const physiognomy = fortuneResult?.[0]?.result?.physiognomyAnalysis;
  const sajuInfo = fortuneResult?.[0]?.sajuInfo;
  const nickname = fortuneResult?.[0]?.nickname || data.nickname;

  // 1. Pillars Mapping
  const mappedPillars = sajuInfo?.pillars
    ? mapApiToPillars(sajuInfo.pillars, t)
    : data.pillars;

  // 2. Face Reading Areas Mapping
  const mappedFaceReadingAreas = physiognomy
    ? [
        { area: "Forehead", description: physiognomy.forehead.description },
        { area: "Glabella", description: physiognomy.glabella.description },
        { area: "Eyebrows", description: physiognomy.eyebrows.description },
        { area: "Eyes", description: physiognomy.eyes.description },
        // Add others if available in the detailed object or map selectively
      ]
    : data.faceReadingAreas;

  // 3. Strength & Weakness Mapping
  const mappedStrengths = physiognomy?.strengths
    ? physiognomy.strengths.map((s: string) => ({
        tag: t("report.dailyPillar.tags.strength"),
        tagColor: "#5B72B7",
        description: s,
      }))
    : [];

  const mappedWeaknesses = physiognomy?.weaknesses
    ? physiognomy.weaknesses.map((w: string) => ({
        tag: t("report.dailyPillar.tags.weakness"),
        tagColor: "#F16C6E",
        description: w,
      }))
    : [];

  const combinedTraits = [...mappedStrengths, ...mappedWeaknesses];
  
  // Fallback for traits if empty
  const finalTraits = combinedTraits.length > 0 
    ? combinedTraits 
    : [
        {
            tag: t("report.dailyPillar.tags.strength"),
            tagColor: "#5B72B7",
            description: t("report.dummy.strength"),
        },
        {
            tag: t("report.dailyPillar.tags.weakness"),
            tagColor: "#F16C6E",
            description: t("report.dummy.weakness"),
        }
    ];

  return (
    <div className="relative min-h-screen bg-[#141415] text-[#DBDCDF] overflow-hidden">
      <main className="relative z-10 max-w-screen-sm mx-auto pb-14">
        <ReportHeader sourceOfInsight="Physiognomy Analysis" />

        <div className="px-4 space-y-8">
          <BasicEnergyInterpretation
            nickname={nickname}
            pillars={mappedPillars}
          />

          <DetailedEnergyAnalysis
            title={t("report.sections.overallImpression")}
            score={85} // Physiognomy might not have a score, using default high
            keywords={["Sensitivity", "Analysis", "Growth"]} // Extract keywords if possible
            description={physiognomy?.physiognomyAnalysis?.overallImpression || physiognomy?.overallImpression || t("report.physiognomy.noAnalysis")}
          />

          <FaceReading faceReadingAreas={mappedFaceReadingAreas} />

          <TagListSection
            title={t("report.sections.personalityTraits")}
            items={finalTraits}
          />

          {physiognomy?.overallAdvice && (
             <DetailedEnergyAnalysis
                title={t("report.sections.advice")}
                score={90}
                keywords={["Growth", "Mindset"]}
                description={physiognomy.overallAdvice}
                tagColor="#2C925E"
             />
          )}

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