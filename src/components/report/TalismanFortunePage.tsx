/* eslint-disable @typescript-eslint/no-explicit-any */

import { useAtomValue } from "jotai";
import { useTranslation } from "react-i18next";

import { BasicEnergyInterpretation } from "@/components/report/BasicEnergyInterpretation";
import { DetailedEnergyAnalysis } from "@/components/report/DetailedEnergyAnalysis";
import { FaceReading } from "@/components/report/FaceReading";
import { ReportFooter } from "@/components/report/ReportFooter";
import { ReportHeader } from "@/components/report/ReportHeader";
import { TagListSection } from "@/components/report/TagListSection";
import { mapApiToPillars } from "@/core/mapApiToPillars";
import { dummyReportData } from "@/data/reportDummy";
import { dataAtom } from "@/store/atoms";

export default function TalismanFortunePage() {
  const { t } = useTranslation();
  const data = dummyReportData;

  const fortuneResult = useAtomValue(dataAtom);
  const physiognomy = fortuneResult?.result?.physiognomyAnalysis;
  const sajuInfo = fortuneResult?.sajuInfo;
  const nickname = fortuneResult?.nickname || data.nickname;

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
  const finalTraits =
    combinedTraits.length > 0
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
          },
        ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#141415] text-[#DBDCDF]">
      <main className="relative z-10 mx-auto max-w-screen-sm pb-14">
        <ReportHeader sourceOfInsight="Physiognomy Analysis" />

        <div className="space-y-8 px-4">
          <BasicEnergyInterpretation
            nickname={nickname}
            pillars={mappedPillars}
          />

          <DetailedEnergyAnalysis
            title={t("report.sections.overallImpression")}
            score={85} // Physiognomy might not have a score, using default high
            keywords={["Sensitivity", "Analysis", "Growth"]} // Extract keywords if possible
            description={
              physiognomy?.physiognomyAnalysis?.overallImpression ||
              physiognomy?.overallImpression ||
              t("report.physiognomy.noAnalysis")
            }
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
