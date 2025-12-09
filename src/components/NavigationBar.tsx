import { useRouter } from "@tanstack/react-router";
import { useSetAtom } from "jotai";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import ArrowLeftIcon from "@/assets/arrow-left.svg?react";
import { resetAllAtoms } from "@/store/atoms";

import { ConfirmModal } from "./ConfirmModal";

interface NavigationBarProps {
  title: string;
  onClick?: () => void;
  returnButton?: boolean;
  showBackButton?: boolean;
  rightContent?: React.ReactNode;
}

export const NavigationBar = ({
  title,
  onClick,
  returnButton = true,
  showBackButton = true,
  rightContent,
}: NavigationBarProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const resetAtoms = useSetAtom(resetAllAtoms);

  const handleGoBack = () => {
    router.history.back();
  };

  const handleRestartClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);

    resetAtoms();

    router.navigate({ to: "/" });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex h-55 w-full items-center gap-10 px-12 py-10.5 max-sm:h-30 max-sm:gap-4 max-sm:px-4 max-sm:py-3.5">
        {showBackButton && (
          <button onClick={onClick ?? handleGoBack} className="h-fit">
            <ArrowLeftIcon className="m-6 h-18 w-18 max-sm:h-10 max-sm:w-10" />
          </button>
        )}
        <p className="font-pretendard text-[3.25rem] leading-[130%] font-bold break-keep whitespace-pre-wrap text-white max-sm:flex-1 max-sm:text-2xl">
          {title}
        </p>
        <div className="flex-1 max-sm:hidden" />
        {rightContent ||
          (returnButton && (
            <button
              onClick={handleRestartClick}
              className="rounded-[1.25rem] bg-white/10 px-4 py-8 max-sm:px-2 max-sm:py-4"
            >
              <p className="font-pretendard text-4xl leading-[120%] font-medium break-keep whitespace-pre-wrap text-[#CFCFCF] max-sm:text-xl">
                {t("navigation.restart")}
              </p>
            </button>
          ))}
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        title={t("modal.restartTitle")}
        message={t("modal.restartMessage")}
      />
    </>
  );
};
