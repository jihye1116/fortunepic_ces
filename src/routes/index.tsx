import { createFileRoute, useRouter } from "@tanstack/react-router";
import Lottie from "lottie-react";
import { useTranslation } from "react-i18next";

import homeLottie from "@/assets/lottie/home.json";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { t } = useTranslation();
  const router = useRouter();

  const handleStartClick = () => {
    router.navigate({ to: "/language" });
  };

  return (
    <main className="flex h-dvh flex-col">
      <div className="relative z-10 w-full px-20 py-35">
        <h1 className="font-crimson gradient-text text-[6.25rem] leading-[115%] tracking-[-0.1rem] whitespace-pre-wrap">
          {t("home.title")}
        </h1>
      </div>
      <div className="flex flex-col gap-12 py-30">
        <Lottie
          className="mx-auto blur-md"
          animationData={homeLottie}
          width={514}
          height={514}
        />
        <button className="px-10 py-8" onClick={handleStartClick}>
          <p className="text-5xl leading-[1.3] tracking-[-1.5%] whitespace-pre-wrap text-white/60">
            {t("home.start")}
          </p>
        </button>
      </div>
      <footer className="flex flex-1 items-center justify-center">
        <p className="text-[2.5rem] leading-[1.3] tracking-[-1%] text-white/60">
          FortunePic ©
        </p>
      </footer>
    </main>
  );
}
