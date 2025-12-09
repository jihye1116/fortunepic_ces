import { createFileRoute } from "@tanstack/react-router";
import Lottie from "lottie-react";
import { useTranslation } from "react-i18next";

import homeLottie from "@/assets/lottie/home.json";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { t } = useTranslation();

  return (
    <main className="flex h-dvh flex-col">
      <div className="relative z-10 w-full px-20 py-35">
        <h1 className="font-crimson bg-linear-to-r from-white to-[#1E2F63] bg-clip-text text-8xl leading-[115%] tracking-[-1%] whitespace-pre-wrap text-transparent">
          {t("home.title")}
        </h1>
      </div>
      <div className="flex flex-col gap-12 py-30">
        <Lottie
          className="mx-auto"
          animationData={homeLottie}
          width={514}
          height={514}
          style={{ filter: "blur(15px)" }}
        />
        <button className="px-10 py-8">
          <p className="text-5xl leading-[130%] tracking-[-1.5%] whitespace-pre-wrap text-white/60">
            {t("home.start")}
          </p>
        </button>
      </div>
      <footer className="flex flex-1 items-center justify-center">
        <p className="text-[2.5rem] leading-[130%] tracking-[-1%] text-white/60">
          FortunePic ©
        </p>
      </footer>
    </main>
  );
}
