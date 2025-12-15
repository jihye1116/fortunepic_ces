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
  validateSearch: (search) => ({
    id: search.id as string,
  }),
});

function ReportPage() {
  const { topic } = Route.useParams();
  const { id } = Route.useSearch();

  // topic 파라미터에 따라 적절한 페이지 컴포넌트를 렌더링
  switch (topic) {
    case "today":
      return <TodayFortunePage id={id} />;
    case "lifetime":
      return <LifetimeReportPage id={id} />;
    case "dayPillarAnimal":
      return <DailyPilarFortunePage id={id} />;
    case "physiognomy":
      return <TalismanFortunePage id={id} />;
    case "fiveElementsV3":
      return <FiveElementsFortunePage id={id} />;
    case "specifiedDate":
      return <DateFortunePage id={id} />;
    case "yearly":
      return <NewYearReportPage id={id} />;
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
