import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useSetAtom } from "jotai";
import Lottie from "lottie-react";
import { useEffect } from "react";

import homeLottie from "@/assets/lottie/home.json";
import { backgroundOpacityAtom } from "@/store/atoms";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const router = useRouter();
  const setBackgroundOpacity = useSetAtom(backgroundOpacityAtom);

  const handleStartClick = () => {
    setBackgroundOpacity(true);
    router.navigate({ to: "/language" });
  };

  useEffect(() => {
    setBackgroundOpacity(false);
  }, [setBackgroundOpacity]);

  return (
    <main className="flex h-dvh flex-col bg-[#141415]">
      <div className="relative z-10 w-full px-20 py-35">
        <h1 className="font-crimson text-center text-[6.25rem] leading-[115%] tracking-[-0.1rem] text-[#DBDCDF]">
          Check your
          <br />
          <i>Fortune</i>
        </h1>
      </div>
      <div className="flex flex-col gap-12">
        <Lottie
          className="mx-auto blur-md"
          animationData={homeLottie}
          width={786}
          height={786}
        />
        <button className="px-10 py-8" onClick={handleStartClick}>
          <p className="text-5xl leading-[1.3] tracking-[-1.5%] whitespace-pre-wrap text-white/60">
            Touch the screen
            <br />
            to start
          </p>
        </button>
      </div>
      <footer className="flex flex-1 items-center justify-center">
        <p className="text-[2.5rem] leading-[1.3] tracking-[-1%] text-white/50">
          FortunePic ©
        </p>
      </footer>
    </main>
  );
}
