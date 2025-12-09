import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Provider } from "jotai";

const RootLayout = () => (
  <Provider>
    <div className="font-pretendard bg-[#1B1C1E]">
      <Outlet />
    </div>
    <TanStackRouterDevtools />
  </Provider>
);

export const Route = createRootRoute({ component: RootLayout });
