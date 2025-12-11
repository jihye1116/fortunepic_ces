import "../../global.css";

import { createFileRoute } from "@tanstack/react-router";

import { ReportFooter } from "@/components/report/ReportFooter";
import { ReportHeader } from "@/components/report/ReportHeader";
import { dummyReportData } from "@/data/reportDummy";

export const Route = createFileRoute("/report/new-year")({
  component: NewYearFortunePage,
});

function NewYearFortunePage() {
  // TODO: Use New Year specific data
  const data = dummyReportData;

  return (
    <div className="relative min-h-screen bg-[#141415] text-[#DBDCDF] overflow-hidden">
      <main className="relative z-10 max-w-screen-sm mx-auto pb-14">
        <ReportHeader sourceOfInsight={data.sourceOfInsight} />

        <div className="px-4 space-y-8">
          <div className="py-10 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">New Year Fortune</h2>
            <p className="text-[#AEB0B6]">Coming Soon...</p>
          </div>

          <ReportFooter />
        </div>
      </main>
    </div>
  );
}
