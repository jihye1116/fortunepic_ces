import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Provider } from "jotai";

import BlackGradation from "@/assets/images/black-gradation.png";

const RootLayout = () => (
  <Provider>
    <div className="font-pretendard relative bg-[#1B1C1E]">
      <div className="absolute inset-0 z-0 shadow-[inset_0px_-14px_42.7px_0px_rgba(253,249,219,1),inset_0px_-27px_120px_16px_rgba(91,114,183,1),inset_0px_-43px_140px_15px_rgba(132,149,201,1)]" />
      <img
        src={BlackGradation}
        alt="background gradation"
        className="absolute top-[-147px] left-1/2 z-0 h-[1981px] max-h-[1981px] min-h-[1981px] w-[1343px] max-w-[1343px] min-w-[1343px] -translate-x-1/2 blur-[80px]"
      />
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
    <TanStackRouterDevtools />
  </Provider>
);

export const Route = createRootRoute({ component: RootLayout });
