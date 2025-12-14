import "../../global.css";

import { createFileRoute } from "@tanstack/react-router";

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
    ? mapFiveElementsDistribution(sajuInfo.fiveElements)
    : data.elementDistributionItems?.map(item => ({
        label: item.element,
        value: item.percentage,
        icon: item.icon,
      }));

  // 3. Essential Self Mapping
  const mappedEssentialSelf = sajuInfo
    ? mapEssentialSelf(sajuInfo)
    : data.essentialSelfItems;

  // 4. Image Analysis Mapping
  const mappedImageAnalysis = {
        title: "Growth Direction Guidance",
        imageUrl: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&auto=format&fit=crop&q=60",
        subTitle: "Donations",
        description: "donate to non-profit organizations that support the education",
       detailedDescription: analysisV3.lackingElement.solution,
      };

  // 5. Detailed List Mapping (10 Gods & Life Stages)
  const mappedDetailedList = analysisV3?.dayPillarAnalysis
    ? [
        {
          title: "Heavenly Stems 10 Gods",
          description: analysisV3.dayPillarAnalysis.heavenlyStemAnalysis,
        },
        {
          title: "Earthly Branch 10 Gods",
          description: analysisV3.dayPillarAnalysis.earthlyBranchAnalysis,
        },
        {
          title: "12 Life Stages",
          description: analysisV3.dayPillarAnalysis.twelveStageAnalysis?.combinedAnalysis,
        },
      ]
    : data.tenGodsAndLifeStages
      ? [
          {
            title: "Heavenly Stems 10 Gods",
            description: data.tenGodsAndLifeStages.heavenlyStems,
          },
          {
            title: "Earthly Branch 10 Gods",
            description: data.tenGodsAndLifeStages.earthlyBranches,
          },
          {
            title: "12 Life Stages",
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
              title="Energy Distribution"
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
function mapFiveElementsDistribution(fiveElements: any) {
  const total =
    fiveElements.wood +
    fiveElements.fire +
    fiveElements.earth +
    fiveElements.metal +
    fiveElements.water;
  
  const getPercentage = (val: number) => (total === 0 ? 0 : Math.round((val / total) * 100));

  return [
    {
      label: "Wood",
      value: getPercentage(fiveElements.wood),
      icon: WoodIcon,
    },
    {
      label: "Fire",
      value: getPercentage(fiveElements.fire),
      icon: FireIcon,
    },
    {
      label: "Earth",
      value: getPercentage(fiveElements.earth),
      icon: EarthIcon,
    },
    {
      label: "Metal",
      value: getPercentage(fiveElements.metal),
      icon: MetalIcon,
    },
    {
      label: "Water",
      value: getPercentage(fiveElements.water),
      icon: WaterIcon,
    },
  ];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapEssentialSelf(sajuInfo: any) {
  const items = [
    {
      label: "Daystem",
      element: sajuInfo.dayMaster.element, // e.g. "토" -> Translate? Usually UI expects English or mapped string.
      // If the component just displays string, "토" is fine for Korean locale.
      // But let's check dummy data: "Earth".
      // If I want English, I need a mapper.
      description: `Day Master is ${sajuInfo.dayMaster.stem} (${sajuInfo.dayMaster.element}).`,
    }
  ];

  // Strongest/Weakest as extra info?
  if (sajuInfo.strongestElement) {
      items.push({
          label: "Strongest",
          element: sajuInfo.strongestElement,
          description: `Strongest element is ${sajuInfo.strongestElement}.`
      });
  }

  return items;
}
