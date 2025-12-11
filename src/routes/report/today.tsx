import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/report/today")({
  component: () => <div>Today's Fortune Page</div>,
});
