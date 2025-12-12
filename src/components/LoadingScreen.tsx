import Lottie from "lottie-react";

import homeLottie from "@/assets/lottie/home.json";

export function LoadingScreen() {
  return (
    <main className="fixed inset-0 z-50 flex h-dvh flex-col items-center justify-center bg-black">
      <Lottie
        className="absolute inset-0 size-full blur-md"
        animationData={homeLottie}
      />
      <div className="relative z-10 text-center">
        <p className="text-5xl font-semibold leading-[1.3] tracking-[-1.5%] text-white">
          Analyzing...
        </p>
      </div>
    </main>
  );
}
