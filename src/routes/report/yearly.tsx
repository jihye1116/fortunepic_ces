import { createFileRoute } from "@tanstack/react-router";
import NewYearReportPage from "../../components/report/NewYearReportPage";

export const Route = createFileRoute("/report/yearly")({
  component: YearlyReport,
  validateSearch: (search) => ({
    id: search.id as string,
  }),
});

function YearlyReport() {
  const { id } = Route.useSearch();
  return <NewYearReportPage id={id} />;
}
