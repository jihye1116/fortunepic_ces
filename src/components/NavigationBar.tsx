import { useRouter } from "@tanstack/react-router";
import { useSetAtom } from "jotai";
import { useState } from "react";

import BackIcon from "@/assets/icons/back.svg?react";
import HomeIcon from "@/assets/icons/home.svg?react";
import { resetAllAtoms } from "@/store/atoms";

import { ConfirmBottomSheet } from "./ConfirmBottomSheet";

export const NavigationBar = () => {
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
        <button onClick={handleGoBack} className="h-fit">
          <BackIcon className="h-25 w-25 p-4.5" />
        </button>
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
