import "../global.css";

import { dummyReportData } from "@/data/reportDummy";

import { AreaSpecificStrategies } from "./report/AreaSpecificStrategies";
import { BasicEnergyInterpretation } from "./report/BasicEnergyInterpretation";
import { FaceReading } from "./report/FaceReading";
import { LifePhaseFlow } from "./report/LifePhaseFlow";
import { PersonalizedAdvice } from "./report/PersonalizedAdvice";
import { ReportFooter } from "./report/ReportFooter";
import { ReportHeader } from "./report/ReportHeader";

export function LifetimeReportPage() {
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
