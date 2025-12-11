import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/report/date")({
  component: () => <div>Date-Specific Reading Page</div>,
});
