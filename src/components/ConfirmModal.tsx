import { useTranslation } from "react-i18next";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message?: string;
}

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: ConfirmModalProps) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 flex w-full max-w-[800px] flex-col gap-10 rounded-[40px] bg-white px-8 py-10 max-sm:max-w-[260px] max-sm:gap-4 max-sm:rounded-2xl max-sm:px-3 max-sm:py-4">
        <div className="flex flex-col items-center gap-2 py-5 max-sm:py-2">
          <h2 className="font-pretendard mb-6 text-center text-5xl leading-[150%] font-bold break-keep text-[#111111] max-sm:mb-2 max-sm:text-2xl">
            {title}
          </h2>
          {message && (
            <p className="font-pretendard text-center text-4xl leading-[150%] font-semibold break-keep text-[#777777] max-sm:text-xl">
              {message}
            </p>
          )}
        </div>
        <div className="flex gap-5 max-sm:gap-2">
          <button
            onClick={onClose}
            className="h-[140px] flex-1 rounded-2xl bg-white/10 max-sm:h-16 max-sm:rounded-lg"
          >
            <span className="font-pretendard text-4xl leading-[120%] font-medium text-[#777777] max-sm:text-2xl">
              {t("modal.cancel")}
            </span>
          </button>
          <button
            onClick={onConfirm}
            className="h-[140px] flex-1 rounded-2xl bg-[#E53888] max-sm:h-16 max-sm:rounded-lg"
          >
            <span className="font-pretendard text-4xl leading-[120%] font-bold text-[#111111] max-sm:text-2xl">
              {t("modal.home")}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
