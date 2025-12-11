import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/report/talisman")({
  component: () => <div>Korean Talisman Page</div>,
});
