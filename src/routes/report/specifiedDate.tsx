import { createFileRoute } from "@tanstack/react-router";
import DateFortunePage from "../../components/report/DateFortunePage";

export const Route = createFileRoute("/report/specifiedDate")({
  component: SpecifiedDateReport,
  validateSearch: (search) => ({
    id: search.id as string,
  }),
});

function SpecifiedDateReport() {
  const { id } = Route.useSearch();
  return <DateFortunePage id={id} />;
}
