import { createFileRoute } from "@tanstack/react-router";

import DailyPilarFortunePage from "../../components/report/DailyPilarFortunePage";

export const Route = createFileRoute("/report/dayPillarAnimal")({
  component: DayPillarAnimalReport,
  validateSearch: (search) => ({
    id: search.id as string,
  }),
});

function DayPillarAnimalReport() {
  const { id } = Route.useSearch();
  return <DailyPilarFortunePage id={id} />;
}
