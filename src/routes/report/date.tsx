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
import { dummyReportData } from "@/data/reportDummy";

export const Route = createFileRoute("/report/date")({
  component: DateFortunePage,
});

function DateFortunePage() {
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
            title="Brighest Prospects"
            items={[
              {
                tag: "Best Time",
                tagColor: "#5B72B7",
                description:
                  "당신의 청년기는 초기에는 환경 적응력과 기본 역량을 안정적으로 다지는 기운이 중심이 되고, 이후에는 능력 발현과 성과 확장을 극대화하는 기운이 펼쳐지는 성장 구조로 전개되는 시기입니다.",
              },
              {
                tag: "Caution Time",
                tagColor: "#F16C6E",
                description:
                  "당신의 청년기는 초기에는 환경 적응력과 기본 역량을 안정적으로 다지는 기운이 중심이 되고, 이후에는 능력 발현과 성과 확장을 극대화하는 기운이 펼쳐지는 성장 구조로 전개되는 시기입니다.",
              },
            ]}
          />

          <TagListSection
            title="Cloudiest Prospects"
            items={[
              {
                tag: "Recommend",
                tagColor: "#5B72B7",
                description:
                  "당신의 청년기는 초기에는 환경 적응력과 기본 역량을 안정적으로 다지는 기운이 중심이 되고, 이후에는 능력 발현과 성과 확장을 극대화하는 기운이 펼쳐지는 성장 구조로 전개되는 시기입니다. 내부를 정비한 뒤 외부로 도약하는, 단계적으로 균형 잡힌 상승 흐름이 특징입니다.",
              },
              {
                tag: "Avoid",
                tagColor: "#F16C6E",
                description:
                  "당신의 청년기는 초기에는 환경 적응력과 기본 역량을 안정적으로 다지는 기운이 중심이 되고, 이후에는 능력 발현과 성과 확장을 극대화하는 기운이 펼쳐지는 성장 구조로 전개되는 시기입니다. 내부를 정비한 뒤 외부로 도약하는, 단계적으로 균형 잡힌 상승 흐름이 특징입니다.",
              },
            ]}
          />

          <ImageDetailSection
            title="Lucky Space • Activity"
            imageUrl="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&auto=format&fit=crop&q=60"
            subTitle="Haeundae"
            description="Haeundae is Busan's most famous and expansive beach"
            items={[
              "Walk barefoot along the shore during the sunrise hour (Wood/Growth energy) to set intentions for the week ahead.",
              "Spend quiet time near the water (Water/Flow energy) to clarify thoughts and resolve emotional blockages.",
              "Engage in social activities or meet new people (Fire/Connection energy) at the surrounding vibrant restaurants and cafes.",
              "Sit on the warm, dry sand (Earth/Stability energy) to ground yourself and solidify practical plans for the future.",
              "Focus on the distant horizon and breathe deeply (Metal/Clarity energy) to gain perspective and reduce mental clutter.",
            ]}
          />

          <ReportFooter />
        </div>
      </main>
    </div>
  );
}
