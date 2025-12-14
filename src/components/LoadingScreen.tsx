import Lottie from "lottie-react";

import homeLottie from "@/assets/lottie/home.json";

import { NavigationBar } from "./NavigationBar";

export function LoadingScreen() {
  return (
    <main className="fixed inset-0 z-50 flex h-dvh flex-col bg-black">
      <NavigationBar />
      <div className="relative z-10 w-full px-20 py-35">
        <p className="text-transparent bg-clip-text bg-linear-to-r from-white to-[#1E2F63] text-5xl font-semibold leading-[1.3] tracking-[-1.5%]">
          Analyzing...
        </p>
      </div>
      <div className="flex flex-col gap-12 py-30">
        <Lottie
          className="mx-auto blur-md"
          animationData={homeLottie}
          width={514}
          height={514}
        />
      </div>
    </main>
  );
}
