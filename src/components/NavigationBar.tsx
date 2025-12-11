import { useRouter } from "@tanstack/react-router";
import { useSetAtom } from "jotai";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import BackIcon from "@/assets/icons/back.svg?react";
import HomeIcon from "@/assets/icons/home.svg?react";
import { resetAllAtoms } from "@/store/atoms";

import { ConfirmBottomSheet } from "./ConfirmBottomSheet";

interface NavigationBarProps {
  cameraMode?: boolean;
  remainingShots?: number;
}

export const NavigationBar = ({
  cameraMode,
  remainingShots,
}: NavigationBarProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const resetAtoms = useSetAtom(resetAllAtoms);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleGoBack = () => {
    router.history.back();
  };

  const handleRestartClick = () => {
    setIsBottomSheetOpen(true);
  };

  const handleConfirmRestart = () => {
    resetAtoms();
    router.navigate({ to: "/" });
  };

  return (
    <>
      <div className="flex w-full items-center justify-between px-10 py-15">
        {cameraMode ? (
          <div className="flex flex-col gap-4 px-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#1b1c1e] p-3">
              <p className="text-[3rem] leading-[1.3] font-medium tracking-[-0.081rem] text-white">
                {remainingShots}
              </p>
            </div>
            <p className="text-[2.5rem] leading-[1.3] tracking-[-0.025rem] text-[#c2c4c8]">
              {t("camera.capture.remainingShots")}
            </p>
          </div>
        ) : (
          <button onClick={handleGoBack} className="h-fit">
            <BackIcon className="h-25 w-25 p-4.5" />
          </button>
        )}
        <button onClick={handleRestartClick} className="h-fit">
          <HomeIcon className="h-25 w-25" />
        </button>
      </div>
      <ConfirmBottomSheet
        open={isBottomSheetOpen}
        onOpenChange={setIsBottomSheetOpen}
        onConfirm={handleConfirmRestart}
      />
    </>
  );
};
