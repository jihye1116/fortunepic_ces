/* eslint-disable @typescript-eslint/no-explicit-any */

import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";

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

export default function TodayFortunePage() {
  const { t } = useTranslation();
  // 운세 점수 및 키워드 추출 함수
  function extractScoreAndKeywords(summary: string | undefined) {
    if (!summary) return { score: undefined, keywords: [] };
    // 점수 추출 (예: "오늘의 운세 점수는 65점으로, ...")
    const scoreMatch = summary.match(/운세 점수는 (\d+)점/);
    const score = scoreMatch ? parseInt(scoreMatch[1], 10) : undefined;
    // 키워드 추출 (예: "'적응', '성장', '신중함'을 키워드로 꼽을 수 있습니다.")
    const keywordsMatch = summary.match(
      /'([^']+)'(?:, '([^']+)')?(?:, '([^']+)')?/,
    );
    const keywords = keywordsMatch
      ? keywordsMatch.slice(1).filter(Boolean)
      : [];
    return { score, keywords };
  }
  const data = dummyReportData;

  const fortuneResult = getFortuneResultFromStorage();
  const todayFortune = fortuneResult?.[0]?.result?.todayFortune;
  const sajuInfo = fortuneResult?.[0]?.sajuInfo;
  const nickname = fortuneResult?.[0]?.nickname || data.nickname;

  // pillars 매핑
  const mappedPillars = sajuInfo?.pillars
    ? mapApiToPillars(sajuInfo.pillars, t)
    : data.pillars;

  // overallSummary를 DetailedEnergyAnalysis의 description으로 사용
  const overallSummary =
    todayFortune?.overallSummary || t("report.dailyPillar.defaultDescription");
  const { score: extractedScore, keywords: extractedKeywords } =
    extractScoreAndKeywords(todayFortune?.overallSummary);

  // timeAnalysis를 CardCarousel용으로 매핑
  const mappedTimeFlows = todayFortune?.timeAnalysis
    ? mapTimeFlows(todayFortune.timeAnalysis, t)
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
        chipText: t(`report.time.${flow.time.toLowerCase()}` as any),
        description: flow.description,
      }));

  // Timing Prediction 매핑
  const mappedTimingPrediction = todayFortune
    ? mapTimingPrediction(todayFortune, t)
    : [
        {
          tag: t("report.tags.bestTime"),
          tagColor: "#5B72B7",
          description: data.timingPrediction.bestTime,
        },
        {
          tag: t("report.tags.cautionTime"),
          tagColor: "#F16C6E",
          description: data.timingPrediction.cautionTime,
        },
      ];

  // Action Guide 매핑
  const mappedActionGuide = todayFortune
    ? mapActionGuide(todayFortune, t)
    : [
        {
          tag: t("report.dailyPillar.tags.recommend"),
          tagColor: "#5B72B7",
          description: data.actionGuide.recommend,
        },
        {
          tag: t("report.dailyPillar.tags.avoid"),
          tagColor: "#F16C6E",
          description: data.actionGuide.avoid,
        },
      ];

  // Lucky Food 매핑
  const mappedLuckyFood = todayFortune?.luckyFood
    ? mapLuckyFood(todayFortune.luckyFood, t)
    : {
        title: t("report.sections.luckyFood"),
        imageUrl:
          "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&auto=format&fit=crop&q=60",
        subTitle: "Bibimbap",
        description: "Bibimbap is Korea's iconic, healthy dish",
        items: [
          "Prepare your bowl by arranging the cooked rice, various colorful vegetables, and marinated meat on top.",
          "Fry an egg sunny-side up, ensuring the yolk remains runny and bright.",
          "Place the fried egg, a generous dollop of gochujang (chili paste), and sesame oil onto the rice.",
          "Mix all ingredients thoroughly, adjusting the sauce quantity to match your preferred taste.",
          "Enjoy your beautifully mixed Bibimbap immediately while it's warm!",
        ],
      };

  console.log("todayFortune:", fortuneResult);
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#141415] text-[#DBDCDF]">
      <main className="relative z-10 mx-auto max-w-screen-sm pb-14">
        <ReportHeader sourceOfInsight="Four Pillars of Destiny" />

        <div className="space-y-8 px-4">
          <BasicEnergyInterpretation
            nickname={nickname}
            pillars={mappedPillars}
          />

          <FaceReading faceReadingAreas={data.faceReadingAreas} />

          <DetailedEnergyAnalysis
            score={extractedScore ?? 85}
            keywords={
              extractedKeywords.length > 0
                ? extractedKeywords
                : [
                    t("report.defaults.growth"),
                    t("report.defaults.harmony"),
                    t("report.defaults.opportunity"),
                  ]
            }
            description={overallSummary}
          />

          <CardCarousel
            title={t("report.sections.timeBasedFlow")}
            cardWidth="w-[240px]"
            items={mappedTimeFlows}
          />

          <TagListSection
            title={t("report.sections.timingPrediction")}
            items={mappedTimingPrediction}
          />

          <TagListSection
            title={t("report.sections.actionGuide")}
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

function mapTimeFlows(timeAnalysis: any, t: TFunction): any[] {
  const flows = [];

  if (timeAnalysis.morning) {
    flows.push({
      id: "Morning",
      imageUrl:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=60",
      chipText: t("report.time.morning"),
      description: `${timeAnalysis.morning.analysis}\n\n${timeAnalysis.morning.advice}`,
    });
  }

  if (timeAnalysis.afternoon) {
    flows.push({
      id: "Afternoon",
      imageUrl:
        "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&auto=format&fit=crop&q=60",
      chipText: t("report.time.afternoon"),
      description: `${timeAnalysis.afternoon.analysis}\n\n${timeAnalysis.afternoon.advice}`,
    });
  }

  if (timeAnalysis.evening) {
    flows.push({
      id: "Evening",
      imageUrl:
        "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop&q=60",
      chipText: t("report.time.evening"),
      description: `${timeAnalysis.evening.analysis}\n\n${timeAnalysis.evening.advice}`,
    });
  }

  return flows;
}

function mapTimingPrediction(todayFortune: any, t: TFunction): any[] {
  const items = [];

  if (todayFortune.bestHour) {
    const bestHour = todayFortune.bestHour;
    items.push({
      tag: t("report.tags.bestTime"),
      tagColor: "#5B72B7",
      description: `${bestHour.time}\n\n${bestHour.reason}\n\nActivities: ${bestHour.activities.join(", ")}`,
    });
  }

  if (todayFortune.worstHour) {
    const worstHour = todayFortune.worstHour;
    items.push({
      tag: t("report.tags.cautionTime"),
      tagColor: "#F16C6E",
      description: `${worstHour.time}\n\n${worstHour.reason}\n\nCaution: ${worstHour.caution.join(", ")}`,
    });
  }

  return items;
}

function mapActionGuide(todayFortune: any, t: TFunction): any[] {
  const items = [];

  if (todayFortune.recommendedActions) {
    items.push({
      tag: t("report.dailyPillar.tags.recommend"),
      tagColor: "#5B72B7",
      description: todayFortune.recommendedActions.content,
    });
  }

  if (todayFortune.thingsToAvoid) {
    items.push({
      tag: t("report.dailyPillar.tags.avoid"),
      tagColor: "#F16C6E",
      description: todayFortune.thingsToAvoid.content,
    });
  }

  return items;
}

function mapLuckyFood(luckyFood: any, t: TFunction): any {
  return {
    title: t("report.sections.luckyFood"),
    imageUrl:
      "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&auto=format&fit=crop&q=60",
    subTitle: luckyFood.food,
    description: luckyFood.reason,
    items: [], // 레시피가 API에 없으므로 빈 배열
  };
}

// LocalStorage util
function getFortuneResultFromStorage() {
  try {
    const saved = localStorage.getItem("fortuneResultAtom");
    if (saved) return JSON.parse(saved);
  } catch {
    /* empty */
  }
  return undefined;
}
