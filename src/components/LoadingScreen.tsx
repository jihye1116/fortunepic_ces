import Lottie from "lottie-react";
import { useTranslation } from "react-i18next";

import loadingLottie from "@/assets/lottie/home.json";
import { Title } from "@/components/Title";

import { NavigationBar } from "./NavigationBar";

export function LoadingScreen() {
  const { t } = useTranslation();

  return (
    <main className="fixed inset-0 z-50 flex h-dvh flex-col bg-black">
      <NavigationBar />
      <Title text={t("loading.analyzing")} />
      <div className="px-10">
        <Lottie animationData={loadingLottie} width={1000} height={1000} />
      </div>
    </main>
  );
}
