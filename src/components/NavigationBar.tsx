import { useRouter } from "@tanstack/react-router";
import { useSetAtom } from "jotai";

import BackIcon from "@/assets/icons/back.svg?react";
import HomeIcon from "@/assets/icons/home.svg?react";
import { resetAllAtoms } from "@/store/atoms";

export const NavigationBar = () => {
  const router = useRouter();
  const resetAtoms = useSetAtom(resetAllAtoms);

  const handleGoBack = () => {
    router.history.back();
  };

  const handleRestartClick = () => {
    resetAtoms();
    router.navigate({ to: "/" });
  };

  return (
    <div className="flex items-center justify-between px-10 py-15">
      <button onClick={handleGoBack} className="h-fit">
        <BackIcon className="h-25 w-25 p-4.5" />
      </button>
      <button onClick={handleRestartClick} className="h-fit">
        <HomeIcon className="h-25 w-25" />
      </button>
    </div>
  );
};
