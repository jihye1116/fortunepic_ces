import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Drawer } from "vaul";

import BackIcon from "@/assets/icons/back.svg?react";
import { CancelButton } from "@/components/CancelButton";
import { SecondaryButton } from "@/components/SecondaryButton";

interface DatePickerBottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentDate: Date;
  onConfirm: (date: Date) => void;
}

export const DatePickerBottomSheet = ({
  open,
  onOpenChange,
  currentDate,
  onConfirm,
}: DatePickerBottomSheetProps) => {
  const { t } = useTranslation();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  const months = t("date.months", { returnObjects: true }) as string[];

  // Generate years from 2000 to current year + 10
  const currentYear = new Date().getFullYear();

  const handleConfirm = () => {
    const newDate = new Date(selectedYear, selectedMonth, 1);
    onConfirm(newDate);
    onOpenChange(false);
  };

  const changeMonth = (delta: number) => {
    const newMonth = selectedMonth + delta;
    if (newMonth < 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else if (newMonth > 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(newMonth);
    }
  };

  const changeYear = (delta: number) => {
    setSelectedYear(
      Math.max(2000, Math.min(currentYear + 10, selectedYear + delta)),
    );
  };

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/20" />
        <Drawer.Content className="fixed right-0 bottom-0 left-0 z-20 flex flex-col rounded-t-[36px] bg-[#171719]">
          <div className="font-pretendard mx-auto flex h-[80dvh] w-full flex-col gap-12 px-20 pb-10">
            {/* Handle Bar */}
            <div className="flex items-center justify-center px-2.5 py-8">
              <div className="h-2.5 w-[103px] rounded-full bg-[#AEB0B6]" />
            </div>

            {/* Date Selection */}
            <div className="flex w-full items-center justify-center gap-3">
              {/* Month Picker */}
              <div className="flex flex-1 flex-col items-center gap-7.5 rounded-4xl bg-[#1b1c1e] px-7.5 py-0">
                {/* Up Button */}
                <button
                  onClick={() => changeMonth(1)}
                  className="flex items-center justify-center"
                >
                  <div className="flex size-25 items-center justify-center rounded-3xl bg-[#1b1c1e]">
                    <BackIcon className="scale-y-[-1] rotate-90" />
                  </div>
                </button>

                {/* Month Display */}
                <div className="flex h-25 items-center justify-center overflow-hidden rounded-3xl bg-[#2e2f33] px-8 py-2.5">
                  <div className="relative flex h-40 w-full items-center justify-center">
                    <p className="text-[3rem] leading-[1.3] font-medium tracking-[-0.081rem] text-[#e1e2e4]">
                      {months[selectedMonth]}
                    </p>
                  </div>
                </div>

                {/* Down Button */}
                <button
                  onClick={() => changeMonth(-1)}
                  className="flex rotate-180 items-center justify-center"
                >
                  <div className="flex size-25 items-center justify-center rounded-3xl bg-[#1b1c1e]">
                    <BackIcon className="scale-y-[-1] rotate-90" />
                  </div>
                </button>
              </div>

              {/* Year Picker */}
              <div className="flex flex-1 flex-col items-center gap-7.5 rounded-4xl bg-[#1b1c1e] px-7.5 py-0">
                {/* Up Button */}
                <button
                  onClick={() => changeYear(1)}
                  className="flex items-center justify-center"
                >
                  <div className="flex size-25 items-center justify-center rounded-3xl bg-[#1b1c1e]">
                    <BackIcon className="scale-y-[-1] rotate-90" />
                  </div>
                </button>

                {/* Year Display */}
                <div className="flex h-25 items-center justify-center overflow-hidden rounded-3xl bg-[#2e2f33] px-8 py-2.5">
                  <div className="relative flex h-40 w-full items-center justify-center">
                    <p className="text-[3rem] leading-[1.3] font-medium tracking-[-0.081rem] text-[#e1e2e4]">
                      {selectedYear}
                    </p>
                  </div>
                </div>

                {/* Down Button */}
                <button
                  onClick={() => changeYear(-1)}
                  className="flex rotate-180 items-center justify-center"
                >
                  <div className="flex size-25 items-center justify-center rounded-3xl bg-[#1b1c1e]">
                    <BackIcon className="scale-y-[-1] rotate-90" />
                  </div>
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-5 py-10">
              <SecondaryButton onClick={handleConfirm}>
                {t("date.next")}
              </SecondaryButton>
              <CancelButton onCancel={() => onOpenChange(false)}>
                {t("date.cancel")}
              </CancelButton>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
