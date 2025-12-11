import { createFileRoute } from "@tanstack/react-router";

import { LifetimeReportPage } from "@/components/LifetimeReportPage";

export const Route = createFileRoute("/report")({
  component: () => <LifetimeReportPage />,
});
