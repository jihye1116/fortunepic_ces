/* eslint-disable @typescript-eslint/no-explicit-any */
import "../../global.css";

import { createFileRoute } from "@tanstack/react-router";
import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";

import EarthIcon from "@/assets/icons/elements/earth.svg";
import FireIcon from "@/assets/icons/elements/fire.svg";
import MetalIcon from "@/assets/icons/elements/metal.svg";
import WaterIcon from "@/assets/icons/elements/water.svg";
import WoodIcon from "@/assets/icons/elements/wood.svg";
import { DetailedListSection } from "@/components/report/DetailedListSection";
import { DistributionChartSection } from "@/components/report/DistributionChartSection";
import { EssentialSelfSection } from "@/components/report/EssentialSelfSection";
import { FourPillarsAndFiveElements } from "@/components/report/FourPillarsAndFiveElements";
import { ImageDescriptionSection } from "@/components/report/ImageDescriptionSection";
import { ReportFooter } from "@/components/report/ReportFooter";
import { ReportHeader } from "@/components/report/ReportHeader";
import { dummyReportData } from "@/data/reportDummy";

export const Route = createFileRoute("/report/five-elements")({
  component: FiveElementsFortunePage,
});

function FiveElementsFortunePage() {
  const { t } = useTranslation();
  const data = dummyReportData;

  const fortuneResult = getFortuneResultFromStorage();
  const sajuInfo = fortuneResult?.[0]?.sajuInfo;
  const analysisV3 = fortuneResult?.[0]?.result?.fiveElementsAnalysisV3;
  const nickname = fortuneResult?.[0]?.nickname || data.nickname;

  // 1. Four Pillars Data Mapping
  const mappedFourPillars = sajuInfo?.pillars
    ? mapToFourPillarsData(sajuInfo.pillars)
    : data.fourPillarsData;

  // 2. Element Distribution Mapping
  const mappedDistribution = sajuInfo?.fiveElements
    ? mapFiveElementsDistribution(sajuInfo.fiveElements, t)
    : data.elementDistributionItems?.map(item => ({
        label: t(`report.elements.${item.element.toLowerCase()}` as any),
        value: item.percentage,
        icon: item.icon,
      }));

  // 3. Essential Self Mapping
  const mappedEssentialSelf = sajuInfo
    ? mapEssentialSelf(sajuInfo, t)
    : data.essentialSelfItems;

  // 4. Image Analysis Mapping
  const mappedImageAnalysis = {
        title: t("report.sections.growthDirection"),
        imageUrl: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&auto=format&fit=crop&q=60",
        subTitle: "Donations",
        description: "donate to non-profit organizations that support the education",
       detailedDescription: analysisV3.lackingElement.solution,
      };

  // 5. Detailed List Mapping (10 Gods & Life Stages)
  const mappedDetailedList = analysisV3?.dayPillarAnalysis
    ? [
        {
          title: t("report.sections.tenGodsHeavenly"),
          description: analysisV3.dayPillarAnalysis.heavenlyStemAnalysis,
        },
        {
          title: t("report.sections.tenGodsEarthly"),
          description: analysisV3.dayPillarAnalysis.earthlyBranchAnalysis,
        },
        {
          title: t("report.sections.twelveLifeStages"),
          description: analysisV3.dayPillarAnalysis.twelveStageAnalysis?.combinedAnalysis,
        },
      ]
    : data.tenGodsAndLifeStages
      ? [
          {
            title: t("report.sections.tenGodsHeavenly"),
            description: data.tenGodsAndLifeStages.heavenlyStems,
          },
          {
            title: t("report.sections.tenGodsEarthly"),
            description: data.tenGodsAndLifeStages.earthlyBranches,
          },
          {
            title: t("report.sections.twelveLifeStages"),
            description: data.tenGodsAndLifeStages.lifeStages,
          },
        ]
      : null;

  return (
    <div className="relative min-h-screen bg-[#141415] text-[#DBDCDF] overflow-hidden">
      <main className="relative z-10 max-w-screen-sm mx-auto pb-14">
        <ReportHeader sourceOfInsight="The Five Elements" />

        <div className="px-4 space-y-8">
          {mappedFourPillars && (
            <FourPillarsAndFiveElements
              nickname={nickname}
              data={mappedFourPillars}
            />
          )}

          {mappedDistribution && (
            <DistributionChartSection
              title={t("report.sections.energyDistribution")}
              items={mappedDistribution}
            />
          )}

          {mappedEssentialSelf && (
            <EssentialSelfSection items={mappedEssentialSelf} />
          )}
          
          {mappedDetailedList && (
            <DetailedListSection items={mappedDetailedList} />
          )}

          <ImageDescriptionSection
            title={mappedImageAnalysis.title}
            imageUrl={mappedImageAnalysis.imageUrl}
            subTitle={mappedImageAnalysis.subTitle}
            description={mappedImageAnalysis.description}
            detailedDescription={mappedImageAnalysis.detailedDescription}
          />

          <ReportFooter />
        </div>
      </main>
    </div>
  );
}

// --- Helper Functions ---

function getFortuneResultFromStorage() {
  try {
    const saved = localStorage.getItem("fortuneResultAtom");
    if (saved) return JSON.parse(saved);
  } catch { /* empty */ }
  return undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapToFourPillarsData(pillars: any) {
  return {
    year: {
      heavenlyStem: pillars.year.stemHanja, // or stem
      heavenlyStem10Gods: pillars.year.tenGodsStem,
      earthlyBranch: pillars.year.branchHanja, // or branch
      earthlyBranch10Gods: pillars.year.tenGodsBranch,
      lifeStage12: pillars.year.twelveStage,
    },
    month: {
      heavenlyStem: pillars.month.stemHanja,
      heavenlyStem10Gods: pillars.month.tenGodsStem,
      earthlyBranch: pillars.month.branchHanja,
      earthlyBranch10Gods: pillars.month.tenGodsBranch,
      lifeStage12: pillars.month.twelveStage,
    },
    day: {
      heavenlyStem: pillars.day.stemHanja,
      heavenlyStem10Gods: pillars.day.tenGodsStem,
      earthlyBranch: pillars.day.branchHanja,
      earthlyBranch10Gods: pillars.day.tenGodsBranch,
      lifeStage12: pillars.day.twelveStage,
    },
    hour: {
      heavenlyStem: pillars.hour.stemHanja,
      heavenlyStem10Gods: pillars.hour.tenGodsStem,
      earthlyBranch: pillars.hour.branchHanja,
      earthlyBranch10Gods: pillars.hour.tenGodsBranch,
      lifeStage12: pillars.hour.twelveStage,
    },
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapFiveElementsDistribution(fiveElements: any, t: TFunction) {
  const total =
    fiveElements.wood +
    fiveElements.fire +
    fiveElements.earth +
    fiveElements.metal +
    fiveElements.water;
  
  const getPercentage = (val: number) => (total === 0 ? 0 : Math.round((val / total) * 100));

  return [
    {
      label: t("report.elements.wood"),
      value: getPercentage(fiveElements.wood),
      icon: WoodIcon,
    },
    {
      label: t("report.elements.fire"),
      value: getPercentage(fiveElements.fire),
      icon: FireIcon,
    },
    {
      label: t("report.elements.earth"),
      value: getPercentage(fiveElements.earth),
      icon: EarthIcon,
    },
    {
      label: t("report.elements.metal"),
      value: getPercentage(fiveElements.metal),
      icon: MetalIcon,
    },
    {
      label: t("report.elements.water"),
      value: getPercentage(fiveElements.water),
      icon: WaterIcon,
    },
  ];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapEssentialSelf(sajuInfo: any, t: TFunction) {
  const items = [
    {
      label: t("report.essentialSelf.daystem"),
      element: sajuInfo.dayMaster.element, 
      description: `Day Master is ${sajuInfo.dayMaster.stem} (${sajuInfo.dayMaster.element}).`,
    }
  ];

  // Strongest/Weakest as extra info?
  if (sajuInfo.strongestElement) {
      items.push({
          label: t("report.essentialSelf.strongest"),
          element: sajuInfo.strongestElement,
          description: `Strongest element is ${sajuInfo.strongestElement}.`
      });
  }

  return items;
}
