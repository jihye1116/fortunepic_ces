import { createFileRoute } from "@tanstack/react-router";

import DailyPilarFortunePage from "../../components/report/DailyPilarFortunePage";
import DateFortunePage from "../../components/report/DateFortunePage";
import FiveElementsFortunePage from "../../components/report/FiveElementsFortunePage";
import LifetimeReportPage from "../../components/report/LifetimeReportPage";
import NewYearReportPage from "../../components/report/NewYearReportPage";
import TalismanFortunePage from "../../components/report/TalismanFortunePage";
import TodayFortunePage from "../../components/report/TodayFortunePage";

export const Route = createFileRoute("/report/$topic")({
  component: ReportPage,
});

function ReportPage() {
  const { topic } = Route.useParams();

  // topic 파라미터에 따라 적절한 페이지 컴포넌트를 렌더링
  switch (topic) {
    case "today":
      return <TodayFortunePage />;
    case "lifetime":
      return <LifetimeReportPage />;
    case "dayPillarAnimal":
      return <DailyPilarFortunePage />;
    case "physiognomy":
      return <TalismanFortunePage />;
    case "fiveElementsV3":
      return <FiveElementsFortunePage />;
    case "specifiedDate":
      return <DateFortunePage />;
    case "yearly":
      return <NewYearReportPage />;
    default:
      return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#141415] text-[#DBDCDF]">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold">Invalid Topic</h1>
            <p className="text-[#AEB0B6]">
              The requested topic "{topic}" does not exist.
            </p>
          </div>
        </div>
      );
  }
}
