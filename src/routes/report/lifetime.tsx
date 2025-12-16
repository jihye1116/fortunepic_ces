import { createFileRoute } from "@tanstack/react-router";
import LifetimeReportPage from "../../components/report/LifetimeReportPage";

export const Route = createFileRoute("/report/lifetime")({
  component: LifetimeReport,
  validateSearch: (search) => ({
    id: search.id as string,
  }),
});

function LifetimeReport() {
  const { id } = Route.useSearch();
  return <LifetimeReportPage id={id} />;
}
