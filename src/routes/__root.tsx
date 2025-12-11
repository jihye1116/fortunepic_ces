import { cn } from "@sglara/cn";
import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useAtomValue } from "jotai";
import { Provider } from "jotai";

import BlackGradation from "@/assets/images/black-gradation.png";
import { backgroundOpacityAtom } from "@/store/atoms";

const RootLayout = () => {
  const location = useLocation();
  const isReportPage = location.pathname.startsWith("/report");
  const backgroundOpacity = useAtomValue(backgroundOpacityAtom);

  return (
    <div className="font-pretendard relative min-h-screen overflow-hidden bg-[#1B1C1E]">
      {!isReportPage && (
        <>
          <div
            className={cn(
              "absolute inset-0 z-0 shadow-[inset_0px_-14px_42.7px_0px_rgba(253,249,219,1),inset_0px_-27px_120px_16px_rgba(91,114,183,1),inset_0px_-43px_140px_15px_rgba(132,149,201,1)] transition-opacity duration-500",
              backgroundOpacity ? "opacity-40" : "opacity-100",
            )}
          />
          <img
            src={BlackGradation}
            alt="background gradation"
            className="absolute top-[-147px] left-1/2 z-0 h-[1981px] max-h-[1981px] min-h-[1981px] w-[1343px] max-w-[1343px] min-w-[1343px] -translate-x-1/2 blur-[80px]"
          />
        </>
      )}
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
};

export const Route = createRootRoute({
  component: () => (
    <Provider>
      <RootLayout />
      <TanStackRouterDevtools />
    </Provider>
  ),
});
