import "../../global.css";

import { createFileRoute } from "@tanstack/react-router";

import { DailyAnimalCard } from "@/components/report/DailyAnimalCard";
import { DailyPilarCard } from "@/components/report/DailyPilarCard";
import { FaceReading } from "@/components/report/FaceReading";
import { ReportFooter } from "@/components/report/ReportFooter";
import { ReportHeader } from "@/components/report/ReportHeader";
import { TagListSection } from "@/components/report/TagListSection";
import { dummyReportData } from "@/data/reportDummy";

export const Route = createFileRoute("/report/daily-pilar")({
  component: DailyPilarFortunePage,
});

function DailyPilarFortunePage() {
  const data = dummyReportData;

  return (
    <div className="relative min-h-screen bg-[#141415] text-[#DBDCDF] overflow-hidden">
      <main className="relative z-10 max-w-screen-sm mx-auto pb-14">
        <ReportHeader sourceOfInsight={data.sourceOfInsight} />

        <div className="px-4 space-y-8">
          
          <DailyAnimalCard nickname={data.nickname} />

          <DailyPilarCard nickname={data.nickname} />

          <TagListSection
            title="Strength & Weakness"
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
          
      <section className="rounded-2xl bg-[#171719] p-[28px_20px] space-y-8">
      <h2 className="text-[18px] font-semibold text-[#878A93]">Current State</h2>

      <div className="space-y-6">
        <div className="text-[14px] leading-[1.57] text-[#AEB0B6] whitespace-pre-line">
          당신의 청년기는 초기에는 환경 적응력과 기본 역량을 안정적으로 다지는 기운이 중심이 되고, 이후에는 능력 발현과 성과 확장을 극대화하는 기운이 펼쳐지는 성장 구조로 전개되는 시기입니다. 내부를 정비한 뒤 외부로 도약하는, 단계적으로 균형 잡힌 상승 흐름이 특징입니다.
        </div>
        <div className="text-[14px] leading-[1.57] text-[#AEB0B6] whitespace-pre-line">
          당신의 청년기는 초기에는 환경 적응력과 기본 역량을 안정적으로 다지는 기운이 중심이 되고, 이후에는 능력 발현과 성과 확장을 극대화하는 기운이 펼쳐지는 성장 구조로 전개되는 시기입니다. 내부를 정비한 뒤 외부로 도약하는, 단계적으로 균형 잡힌 상승 흐름이 특징입니다.
        </div>
        </div>
        </section>

          <TagListSection
            title="Compatible & Incompatible people"
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


          <FaceReading faceReadingAreas={data.faceReadingAreas} />



          <ReportFooter />
        </div>
      </main>
    </div>
  );
}
