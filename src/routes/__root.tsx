import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Provider } from "jotai";

const RootLayout = () => (
  <Provider>
    <Outlet />
    <TanStackRouterDevtools />
  </Provider>
);

export const Route = createRootRoute({ component: RootLayout });
