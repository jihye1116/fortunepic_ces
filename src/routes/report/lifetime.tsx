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

export const Route = createFileRoute("/report/lifetime")({
  component: LifetimeReportPage,
});

function LifetimeReportPage() {
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

          <LifePhaseFlow lifePhases={data.lifePhases} />

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
