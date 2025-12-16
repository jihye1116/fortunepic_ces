import { createFileRoute } from "@tanstack/react-router";

import TalismanFortunePage from "../../components/report/TalismanFortunePage";

export const Route = createFileRoute("/report/physiognomy")({
  component: PhysiognomyReport,
  validateSearch: (search) => ({
    id: search.id as string,
  }),
});

function PhysiognomyReport() {
  const { id } = Route.useSearch();
  return <TalismanFortunePage id={id} />;
}
