import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/report/daily-pilar')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/report/daily-pilar"!</div>
}
