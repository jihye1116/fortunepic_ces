import { useTranslation } from "react-i18next";
import { Drawer } from "vaul";

interface ConfirmBottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const ConfirmBottomSheet = ({
  open,
  onOpenChange,
  onConfirm,
}: ConfirmBottomSheetProps) => {
  const { t } = useTranslation();

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0" />
        <Drawer.Content className="fixed right-0 bottom-0 left-0 z-20 flex flex-col rounded-t-[36px] bg-[#171719]">
          <div className="mx-auto flex h-[80dvh] w-full flex-col gap-12 px-20 pb-10">
            {/* Handle Bar */}
            <div className="flex items-center justify-center px-2.5 py-8">
              <div className="h-2.5 w-[103px] rounded-full bg-[#AEB0B6]" />
            </div>

            {/* Title */}
            <div className="flex flex-col gap-3 py-10">
              <h2 className="gradient-text text-[3.5rem] leading-[130%] font-medium tracking-[-0.07rem]">
                {t("confirm.restart.title")}
              </h2>
              <p className="text-[2.5rem] leading-[130%] tracking-[-0.025rem] text-[#989BA2]">
                {t("confirm.restart.description")}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-5 py-10">
              <button
                onClick={handleConfirm}
                className="flex h-33 items-center justify-center rounded-3xl bg-[#E1E2E4] py-10"
              >
                <p className="text-[2.5rem] leading-[130%] font-medium tracking-[-0.015rem] text-[#171719]">
                  {t("confirm.restart.confirm")}
                </p>
              </button>
              <button
                onClick={() => onOpenChange(false)}
                className="flex h-33 items-center justify-center rounded-3xl py-10"
              >
                <p className="text-[2.5rem] leading-[130%] font-medium tracking-[-0.015rem] text-[#989BA2]">
                  {t("confirm.restart.cancel")}
                </p>
              </button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
