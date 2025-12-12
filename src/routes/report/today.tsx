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

export const Route = createFileRoute("/report/today")({
  component: TodayFortunePage,
});

function TodayFortunePage() {
  const data = dummyReportData;

  const fortuneResult = getFortuneResultFromStorage();
  const todayFortune = fortuneResult?.find((item: any) => item.result?.todayFortune);

  // pillars 매핑
  const mappedPillars = todayFortune?.sajuInfo?.pillars
    ? mapApiToPillars(todayFortune.sajuInfo.pillars)
    : data.pillars;

  const nickname = todayFortune?.nickname || data.nickname;

  // overallSummary를 DetailedEnergyAnalysis의 description으로 사용
  const overallSummary = todayFortune?.result?.todayFortune?.overallSummary ||
    `당신의 청년기는 초기에는 환경 적응력과 기본 역량을 안정적으로 다지는 기운이 중심이 되고, 이후에는 능력 발현과 성과 확장을 극대화하는 기운이 펼쳐지는 성장 구조로 전개되는 시기입니다. 내부를 정비한 뒤 외부로 도약하는, 단계적으로 균형 잡힌 상승 흐름이 특징입니다.`;

  // timeAnalysis를 CardCarousel용으로 매핑
  const mappedTimeFlows = todayFortune?.result?.todayFortune?.timeAnalysis
    ? mapTimeFlows(todayFortune.result.todayFortune.timeAnalysis)
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

  // Timing Prediction 매핑
  const mappedTimingPrediction = todayFortune?.result?.todayFortune
    ? mapTimingPrediction(todayFortune.result.todayFortune)
    : [
        {
          tag: "Best Time",
          tagColor: "#5B72B7",
          description: data.timingPrediction.bestTime,
        },
        {
          tag: "Caution Time",
          tagColor: "#F16C6E",
          description: data.timingPrediction.cautionTime,
        },
      ];

  // Action Guide 매핑
  const mappedActionGuide = todayFortune?.result?.todayFortune
    ? mapActionGuide(todayFortune.result.todayFortune)
    : [
        {
          tag: "Recommend",
          tagColor: "#5B72B7",
          description: data.actionGuide.recommend,
        },
        {
          tag: "Avoid",
          tagColor: "#F16C6E",
          description: data.actionGuide.avoid,
        },
      ];

  // Lucky Food 매핑
  const mappedLuckyFood = todayFortune?.result?.todayFortune?.luckyFood
    ? mapLuckyFood(todayFortune.result.todayFortune.luckyFood)
    : {
        title: "Lucky Korean Food",
        imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&auto=format&fit=crop&q=60",
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
            score={85}
            keywords={["Growth", "Harmony", "Opportunity"]}
            description={overallSummary}
          />

          <CardCarousel
            title="Time Based Flow"
            cardWidth="w-[240px]"
            items={mappedTimeFlows}
          />

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

function mapTimeFlows(timeAnalysis: any): any[] {
  const flows = [];

  if (timeAnalysis.morning) {
    flows.push({
      id: "Morning",
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=60",
      chipText: "Morning",
      description: `${timeAnalysis.morning.analysis}\n\n${timeAnalysis.morning.advice}`,
    });
  }

  if (timeAnalysis.afternoon) {
    flows.push({
      id: "Afternoon",
      imageUrl: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&auto=format&fit=crop&q=60",
      chipText: "Afternoon",
      description: `${timeAnalysis.afternoon.analysis}\n\n${timeAnalysis.afternoon.advice}`,
    });
  }

  if (timeAnalysis.evening) {
    flows.push({
      id: "Evening",
      imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop&q=60",
      chipText: "Evening",
      description: `${timeAnalysis.evening.analysis}\n\n${timeAnalysis.evening.advice}`,
    });
  }

  return flows;
}

function mapTimingPrediction(todayFortune: any): any[] {
  const items = [];

  if (todayFortune.bestHour) {
    const bestHour = todayFortune.bestHour;
    items.push({
      tag: "Best Time",
      tagColor: "#5B72B7",
      description: `${bestHour.time}\n\n${bestHour.reason}\n\nActivities: ${bestHour.activities.join(", ")}`,
    });
  }

  if (todayFortune.worstHour) {
    const worstHour = todayFortune.worstHour;
    items.push({
      tag: "Caution Time",
      tagColor: "#F16C6E",
      description: `${worstHour.time}\n\n${worstHour.reason}\n\nCaution: ${worstHour.caution.join(", ")}`,
    });
  }

  return items;
}

function mapActionGuide(todayFortune: any): any[] {
  const items = [];

  if (todayFortune.recommendedActions) {
    items.push({
      tag: "Recommend",
      tagColor: "#5B72B7",
      description: todayFortune.recommendedActions.content,
    });
  }

  if (todayFortune.thingsToAvoid) {
    items.push({
      tag: "Avoid",
      tagColor: "#F16C6E",
      description: todayFortune.thingsToAvoid.content,
    });
  }

  return items;
}

function mapLuckyFood(luckyFood: any): any {
  return {
    title: "Lucky Korean Food",
    imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&auto=format&fit=crop&q=60",
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
  } catch { /* empty */ }
  return undefined;
}
