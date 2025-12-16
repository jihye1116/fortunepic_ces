import { createFileRoute } from "@tanstack/react-router";

import FiveElementsFortunePage from "../../components/report/FiveElementsFortunePage";

export const Route = createFileRoute("/report/fiveElementsV3")({
  component: FiveElementsReport,
  validateSearch: (search) => ({
    id: search.id as string,
  }),
});

function FiveElementsReport() {
  const { id } = Route.useSearch();
  return <FiveElementsFortunePage id={id} />;
}
