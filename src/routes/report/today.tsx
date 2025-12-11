import "../../global.css";

import { createFileRoute } from "@tanstack/react-router";

import bibimbapImg from "@/assets/images/report/bibimbap.png";
import { BasicEnergyInterpretation } from "@/components/report/BasicEnergyInterpretation";
import { CardCarousel } from "@/components/report/CardCarousel";
import { DetailedEnergyAnalysis } from "@/components/report/DetailedEnergyAnalysis";
import { FaceReading } from "@/components/report/FaceReading";
import { ImageDetailSection } from "@/components/report/ImageDetailSection";
import { ReportFooter } from "@/components/report/ReportFooter";
import { ReportHeader } from "@/components/report/ReportHeader";
import { TagListSection } from "@/components/report/TagListSection";
import { dummyReportData } from "@/data/reportDummy";

export const Route = createFileRoute("/report/today")({
  component: TodayFortunePage,
});

function TodayFortunePage() {
  const data = dummyReportData;

  return (
    <div className="relative min-h-screen bg-[#141415] text-[#DBDCDF] overflow-hidden">
      <main className="relative z-10 max-w-screen-sm mx-auto pb-14">
        <ReportHeader sourceOfInsight={data.sourceOfInsight} />

        <div className="px-4 space-y-8">
          <BasicEnergyInterpretation
            nickname={data.nickname}
            pillars={data.pillars}
          />

          <FaceReading faceReadingAreas={data.faceReadingAreas} />

          <DetailedEnergyAnalysis
            score={85}
            keywords={["Growh", "Harmony", "Opportunity"]}
            description={`당신의 청년기는 초기에는 환경 적응력과 기본 역량을 안정적으로 다지는 기운이 중심이 되고, 이후에는 능력 발현과 성과 확장을 극대화하는 기운이 펼쳐지는 성장 구조로 전개되는 시기입니다. 내부를 정비한 뒤 외부로 도약하는, 단계적으로 균형 잡힌 상승 흐름이 특징입니다.`}
          />

          <CardCarousel
            title="Time Based Flow"
            cardWidth="w-[240px]"
            items={data.timeFlows.map((flow) => ({
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
            }))}
          />

          

          <TagListSection
            title="Timing Prediction"
            items={[
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
            ]}
          />

          <TagListSection
            title="Action Guide"
            items={[
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
            ]}
          />

          <ImageDetailSection
            title="Lucky Korean Food"
            imageUrl={bibimbapImg}
            subTitle="Bibimbap"
            description="Bibimbap is Korea's iconic, healthy dish"
            items={[
              "Prepare your bowl by arranging the cooked rice, various colorful vegetables, and marinated meat on top.",
              "Fry an egg sunny-side up, ensuring the yolk remains runny and bright.",
              "Place the fried egg, a generous dollop of gochujang (chili paste), and sesame oil onto the rice.",
              "Mix all ingredients thoroughly, adjusting the sauce quantity to match your preferred taste.",
              "Enjoy your beautifully mixed Bibimbap immediately while it's warm!",
            ]}
          />

          <ReportFooter />
        </div>
      </main>
    </div>
  );
}
