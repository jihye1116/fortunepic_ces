import "../../global.css";

import { createFileRoute } from "@tanstack/react-router";

import { AreaSpecificStrategies } from "@/components/report/AreaSpecificStrategies";
import { BasicEnergyInterpretation } from "@/components/report/BasicEnergyInterpretation";
import { FaceReading } from "@/components/report/FaceReading";
import { LifePhaseFlow } from "@/components/report/LifePhaseFlow";
import { PersonalizedAdvice } from "@/components/report/PersonalizedAdvice";
import { ReportFooter } from "@/components/report/ReportFooter";
import { ReportHeader } from "@/components/report/ReportHeader";
import { dummyReportData } from "@/data/reportDummy";

export const Route = createFileRoute("/report/new-year")({
  component: NewYearReportPage,
});

function NewYearReportPage() {
  const newYearLifePhases = [
    {
      ageRange: "2025",
      phase: "First Half",
      description:
        "This period unfolds as a structured journey of growth: initially focusing on stable environmental adaptation and skill groundwork, followed by a dramatic phase of skill manifestation and maximizing output expansion.\n\nIt is characterized by a balanced, step-by-step ascent, where you organize your internal resources before leaping into the external world.\n\nStrong energy for rapidly absorbing new environments, learning, and firmly establishing inner structure and stable life patterns. This stage is about defining your direction and establishing self",
    },
    {
      ageRange: "2025",
      phase: "Second Half",
      description:
        "Middle age is a dynamic process of change, re-establishing foundations, and then restructuring your structure through competition and adjustment. The flow is: Change Establishment Reorganization.\n\nDriven by the Energy that Triggers Change combined with the Energy Demanding Readjustment. Existing methods become unsustainable, requiring a shift in direction across life's structure. Focus on seeking new methods, reducing unnecessary expansion, and restructuring your activities.",
    },
    {
      ageRange: "2026",
      phase: "Full Year",
      description:
        "Later life emphasizes inner stability, refining life's balance, organizing responsibilities, and moving toward a dignified conclusion. The flow is: Reorganization → Moderation → Recovery → Stability.\n\nFocused on the Energy of Internal Consolidation and Accumulation (비견, Core Self). The emphasis is on re-evaluating accumulated experience and relationships rather than new external expansion. Interests naturally shift from external activities to the inner world, simplifying life's structure.",
    },
    {
      ageRange: "2027",
      phase: "Full Year",
      description:
        "Later life emphasizes inner stability, refining life's balance, organizing responsibilities, and moving toward a dignified conclusion. The flow is: Reorganization → Moderation → Recovery → Stability.\n\nFocused on the Energy of Internal Consolidation and Accumulation (비견, Core Self). The emphasis is on re-evaluating accumulated experience and relationships rather than new external expansion. Interests naturally shift from external activities to the inner world, simplifying life's structure.",
    },
  ];

  const data = dummyReportData;

  return (
    <div className="relative min-h-screen bg-[#141415] text-[#DBDCDF] overflow-hidden">
      <main className="relative z-10 max-w-screen-sm mx-auto pb-14">
        <ReportHeader sourceOfInsight="Four Pillars of Destiny" />

        <div className="px-4 space-y-8">
          <BasicEnergyInterpretation
            nickname={data.nickname}
            pillars={data.pillars}
          />

          <FaceReading faceReadingAreas={data.faceReadingAreas} />

          <LifePhaseFlow lifePhases={newYearLifePhases} />

          <AreaSpecificStrategies areaStrategies={data.areaStrategies} />

          <PersonalizedAdvice
            beneficialEnergies={data.beneficialEnergies}
            regulatingEnergies={data.regulatingEnergies}
          />

          <ReportFooter />
        </div>
      </main>
    </div>
  );
}
