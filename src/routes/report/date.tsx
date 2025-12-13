/* eslint-disable @typescript-eslint/no-explicit-any */
import "../../global.css";

import { createFileRoute } from "@tanstack/react-router";

import { BasicEnergyInterpretation } from "@/components/report/BasicEnergyInterpretation";
import { CardCarousel } from "@/components/report/CardCarousel";
import { DetailedEnergyAnalysis } from "@/components/report/DetailedEnergyAnalysis";
import { FaceReading } from "@/components/report/FaceReading";
import { ImageDetailSection } from "@/components/report/ImageDetailSection";
import { ReportFooter } from "@/components/report/ReportFooter";
import { ReportHeader } from "@/components/report/ReportHeader";
import { TagListSection } from "@/components/report/TagListSection";
import { mapApiToPillars } from "@/core/mapApiToPillars";
import { dummyReportData } from "@/data/reportDummy";

export const Route = createFileRoute("/report/date")({
  component: DateFortunePage,
});

function DateFortunePage() {
  const data = dummyReportData;

  const fortuneResult = getFortuneResultFromStorage();
  const dateFortune = fortuneResult?.[0]?.result?.specifiedDateFortune;
  const sajuInfo = fortuneResult?.[0]?.sajuInfo;
  const nickname = fortuneResult?.[0]?.nickname || data.nickname;

  // pillars 매핑
  const mappedPillars = sajuInfo?.pillars
    ? mapApiToPillars(sajuInfo.pillars)
    : data.pillars;

  // domainFortune에서 점수 평균 계산 및 bestDomain 정보 사용
  const { score, keywords, description } = extractAnalysisData(dateFortune);

  // timeAnalysis를 CardCarousel용으로 매핑
  const mappedTimeFlows = dateFortune?.timeAnalysis
    ? mapTimeFlows(dateFortune.timeAnalysis)
    : data.timeFlows.map((flow) => ({
        id: flow.time,
        imageUrl: {
          Morning:
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=60",
          Afternoon:
            "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&auto=format&fit=crop&q=60",
          Evening:
            "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop&q=60",
        }[flow.time],
        chipText: flow.time,
        description: flow.description,
      }));

  // Brightest/Cloudiest Domain Mapping
  const mappedBrightestDomain = mapBrightestDomain(dateFortune);
  const mappedCloudiestDomain = mapCloudiestDomain(dateFortune);

  // Timing/Action Guide Mapping
  const mappedTimingPrediction = mapTimingPrediction(dateFortune, data);
  const mappedActionGuide = mapActionGuide(dateFortune, data);

  // Lucky Food 매핑
  const mappedLuckyFood = dateFortune?.luckyFood
    ? mapLuckyFood(dateFortune.luckyFood)
    : {
        title: "Lucky Space • Activity",
        imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&auto=format&fit=crop&q=60",
        subTitle: "Haeundae",
        description: "Haeundae is Busan's most famous and expansive beach",
        items: [
          "Walk barefoot along the shore during the sunrise hour (Wood/Growth energy) to set intentions for the week ahead.",
          "Spend quiet time near the water (Water/Flow energy) to clarify thoughts and resolve emotional blockages.",
          "Engage in social activities or meet new people (Fire/Connection energy) at the surrounding vibrant restaurants and cafes.",
          "Sit on the warm, dry sand (Earth/Stability energy) to ground yourself and solidify practical plans for the future.",
          "Focus on the distant horizon and breathe deeply (Metal/Clarity energy) to gain perspective and reduce mental clutter.",
        ],
      };

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

          <DetailedEnergyAnalysis
            title="General Analysis"
            score={score ?? 85}
            keywords={keywords.length > 0 ? keywords : ["Growth", "Harmony", "Opportunity"]}
            description={description || `당신의 청년기는 초기에는 환경 적응력과 기본 역량을 안정적으로 다지는 기운이 중심이 되고, 이후에는 능력 발현과 성과 확장을 극대화하는 기운이 펼쳐지는 성장 구조로 전개되는 시기입니다. 내부를 정비한 뒤 외부로 도약하는, 단계적으로 균형 잡힌 상승 흐름이 특징입니다.`}
          />

          <CardCarousel
            title="Time Based Flow"
            cardWidth="w-[240px]"
            items={mappedTimeFlows}
          />

          {/* Brightest Prospects - Best Domain */}
          {mappedBrightestDomain && (
            <DetailedEnergyAnalysis
              title="Brightest Prospects"
              score={mappedBrightestDomain.score}
              keywords={[mappedBrightestDomain.domain]}
              description={`${mappedBrightestDomain.reason}\n\n${mappedBrightestDomain.advice}`}
            />
          )}

          {/* Cloudiest Prospects - Worst Domain */}
          {mappedCloudiestDomain && (
            <DetailedEnergyAnalysis
              title="Cloudiest Prospects"
              score={mappedCloudiestDomain.score}
              keywords={[mappedCloudiestDomain.domain]}
              description={`${mappedCloudiestDomain.reason}\n\n${mappedCloudiestDomain.advice}`}
              tagColor="#F16C6E"
            />
          )}

          <TagListSection
            title="Timing Prediction"
            items={mappedTimingPrediction}
          />

          <TagListSection
            title="Action Guide"
            items={mappedActionGuide}
          />

          <ImageDetailSection
            title={mappedLuckyFood.title}
            imageUrl={mappedLuckyFood.imageUrl}
            subTitle={mappedLuckyFood.subTitle}
            description={mappedLuckyFood.description}
            items={mappedLuckyFood.items}
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

function extractAnalysisData(dateFortune: any) {
  if (!dateFortune) return { score: undefined, keywords: [], description: undefined };

  let score = 0;
  let count = 0;
  if (dateFortune.domainFortune) {
    Object.values(dateFortune.domainFortune).forEach((d: any) => {
      if (typeof d.score === 'number') {
        score += d.score;
        count++;
      }
    });
  }
  const averageScore = count > 0 ? Math.round(score / count) : undefined;

  const bestDomain = dateFortune.bestDomain;
  const keywords = bestDomain?.domain ? [bestDomain.domain] : [];
  const description = bestDomain ? `${bestDomain.reason}\n\n${bestDomain.advice}` : undefined;

  return { score: averageScore, keywords, description };
}

function mapTimeFlows(timeAnalysis: any): any[] {
  const flows = [];

  if (timeAnalysis.morning) {
    flows.push({
      id: "Morning",
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=60",
      chipText: "Morning",
      description: `${timeAnalysis.morning.analysis}\n\n${timeAnalysis.morning.advice.join("\n")}`,
    });
  }

  if (timeAnalysis.afternoon) {
    flows.push({
      id: "Afternoon",
      imageUrl: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&auto=format&fit=crop&q=60",
      chipText: "Afternoon",
      description: `${timeAnalysis.afternoon.analysis}\n\n${timeAnalysis.afternoon.advice.join("\n")}`,
    });
  }

  if (timeAnalysis.evening) {
    flows.push({
      id: "Evening",
      imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop&q=60",
      chipText: "Evening",
      description: `${timeAnalysis.evening.analysis}\n\n${timeAnalysis.evening.advice.join("\n")}`,
    });
  }

  return flows;
}

// Domain Score Finder Helper
function findScoreByDomainTitle(domainFortune: any, title: string): number {
  if (!domainFortune || !title) return 50; // Default
  const found = Object.values(domainFortune).find((d: any) => d.title === title) as any;
  return found ? found.score : 50;
}

// --- New Mappers ---

function mapBrightestDomain(dateFortune: any) {
  if (!dateFortune?.bestDomain) return null;
  const score = findScoreByDomainTitle(dateFortune.domainFortune, dateFortune.bestDomain.domain);
  return {
    ...dateFortune.bestDomain,
    score,
  };
}

function mapCloudiestDomain(dateFortune: any) {
  if (!dateFortune?.worstDomain) return null;
  const score = findScoreByDomainTitle(dateFortune.domainFortune, dateFortune.worstDomain.domain);
  return {
    ...dateFortune.worstDomain,
    score,
  };
}

function mapTimingPrediction(dateFortune: any, defaultData: any): any[] {
  if (!dateFortune) {
    return [
      {
        tag: "Best Time",
        tagColor: "#5B72B7",
        description: defaultData.timingPrediction.bestTime,
      },
      {
        tag: "Caution Time",
        tagColor: "#F16C6E",
        description: defaultData.timingPrediction.cautionTime,
      },
    ];
  }

  const items = [];

  if (dateFortune.bestHour) {
    const bestHour = dateFortune.bestHour;
    items.push({
      tag: "Best Time",
      tagColor: "#5B72B7",
      description: `${bestHour.time}\n\n${bestHour.reason}\n\nActivities: ${bestHour.activities.join(", ")}`,
    });
  }

  if (dateFortune.worstHour) {
    const worstHour = dateFortune.worstHour;
    items.push({
      tag: "Caution Time",
      tagColor: "#F16C6E",
      description: `${worstHour.time}\n\n${worstHour.reason}\n\nCaution: ${worstHour.caution.join(", ")}`,
    });
  }

  return items;
}

function mapActionGuide(dateFortune: any, defaultData: any): any[] {
   if (!dateFortune) {
    return [
      {
        tag: "Recommend",
        tagColor: "#5B72B7",
        description: defaultData.actionGuide.recommend,
      },
      {
        tag: "Avoid",
        tagColor: "#F16C6E",
        description: defaultData.actionGuide.avoid,
      },
    ];
  }

  const items = [];

  if (dateFortune.recommendedActions) {
    items.push({
      tag: "Recommend",
      tagColor: "#5B72B7",
      description: dateFortune.recommendedActions.content,
    });
  }

  if (dateFortune.thingsToAvoid) {
    items.push({
      tag: "Avoid",
      tagColor: "#F16C6E",
      description: dateFortune.thingsToAvoid.content,
    });
  }

  return items;
}

function mapLuckyFood(luckyFood: any): any {
  return {
    title: "Lucky Food",
    imageUrl: "https://images.unsplash.com/photo-1553621642-f6e147245754?w=800&auto=format&fit=crop&q=60",
    subTitle: luckyFood.food,
    description: luckyFood.reason,
    items: [],
  };
}