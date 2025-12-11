import { useTranslation } from "react-i18next";
import { Drawer } from "vaul";

import { CancelButton } from "@/components/CancelButton";
import { SecondaryButton } from "@/components/SecondaryButton";

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
          <div className="font-pretendard mx-auto flex h-[80dvh] w-full flex-col gap-12 px-20 pb-10">
            {/* Handle Bar */}
            <div className="flex items-center justify-center px-2.5 py-8">
              <div className="h-2.5 w-[103px] rounded-full bg-[#AEB0B6]" />
            </div>

            {/* Title */}
            <div className="flex flex-col gap-3 py-10">
              <Drawer.Title asChild>
                <h2 className="gradient-text text-[3.5rem] leading-[1.3] font-medium tracking-[-0.07rem]">
                  {t("confirm.restart.title")}
                </h2>
              </Drawer.Title>
              <Drawer.Description asChild>
                <p className="text-[2.5rem] leading-[1.3] tracking-[-0.025rem] text-[#989BA2]">
                  {t("confirm.restart.description")}
                </p>
              </Drawer.Description>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-5 py-10">
              <SecondaryButton onClick={handleConfirm}>
                {t("confirm.restart.confirm")}
              </SecondaryButton>
              <CancelButton onCancel={() => onOpenChange(false)}>
                {t("confirm.restart.cancel")}
              </CancelButton>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
