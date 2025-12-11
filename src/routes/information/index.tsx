import { cn } from "@sglara/cn";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useSetAtom } from "jotai";
import Lottie from "lottie-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import infoLottie from "@/assets/lottie/information.json";
import { NavigationBar } from "@/components/NavigationBar";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Title } from "@/components/Title";
import { backgroundOpacityAtom } from "@/store/atoms";

export const Route = createFileRoute("/information/")({
  component: Information,
});

function Information() {
  const { t } = useTranslation();
  const router = useRouter();
  const [showButton, setShowButton] = useState(false);
  const setBackgroundOpacity = useSetAtom(backgroundOpacityAtom);

  const handleNext = () => {
    setBackgroundOpacity(false);

    setTimeout(() => {
      setBackgroundOpacity(true);
      router.navigate({ to: "/information/nickname" });
    }, 800);
  };

  return (
    <main className="h-dvh">
      <NavigationBar />

      <Title
        text={t("information.intro.title")}
        subtext={t("information.intro.description")}
      />

      <Lottie
        animationData={infoLottie}
        loop={false}
        onComplete={() => setShowButton(true)}
      />

      <div
        className={cn(
          "px-20 transition-opacity duration-1000",
          showButton ? "opacity-100" : "opacity-0",
        )}
      >
        <PrimaryButton onClick={handleNext}>
          {t("information.intro.okay")}
        </PrimaryButton>
      </div>
    </main>
  );
}
