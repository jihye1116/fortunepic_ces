import { createFileRoute } from "@tanstack/react-router";
import TodayFortunePage from "../../components/report/TodayFortunePage";

export const Route = createFileRoute("/report/today")({
  component: TodayReportPage,
  validateSearch: (search) => ({
    id: search.id as string,
  }),
});

function TodayReportPage() {
  const { id } = Route.useSearch();
  return <TodayFortunePage id={id} />;
}
