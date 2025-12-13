import { cn } from "@sglara/cn";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useSetAtom } from "jotai";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import BackIcon from "@/assets/icons/back.svg?react";
import { NavigationBar } from "@/components/NavigationBar";
import { SecondaryButton } from "@/components/SecondaryButton";
import { MONTHS, WEEKDAYS } from "@/core/constants";
import { targetDateAtom } from "@/store/atoms";

export const Route = createFileRoute("/date")({
  component: DatePage,
});

function DatePage() {
  const { t } = useTranslation();
  const router = useRouter();
  const setTargetDate = useSetAtom(targetDateAtom);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days: (number | null)[] = [];

    // 이전 달 자리는 null로 채움
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // 현재 달의 날짜들
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    // 다음 달 자리는 null로 채움
    const remainingDays = 35 - days.length;
    for (let i = 0; i < remainingDays; i++) {
      days.push(null);
    }

    return days;
  };

  const changeMonth = (delta: number) => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + delta, 1),
    );
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    setSelectedDate(newDate);
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear()
    );
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="flex h-dvh flex-col items-center">
      <NavigationBar />

      {/* Title */}
      <div className="flex w-full flex-col gap-3 px-20 py-10">
        <h1 className="bg-linear-to-r from-white to-[#1e2f63] bg-clip-text text-[3.5rem] leading-[1.3] font-medium tracking-[-0.07rem] text-transparent">
          {t("date.title")}
        </h1>
        <p className="text-[2.5rem] leading-[1.3] font-normal tracking-[-0.025rem] text-[#989ba2]">
          {t("date.subtitle")}
        </p>
      </div>

      {/* Calendar Container */}
      <div className="flex flex-col gap-6 px-21 pt-12 pb-17">
        {/* Month Selector */}
        <div className="flex w-full items-center justify-between">
          <div className="flex h-25 items-center justify-center rounded-3xl border-[3px] border-[#2e2f33] px-8 py-2.5">
            <div className="flex items-center gap-4.5 text-[2.5rem] font-medium tracking-[-0.0375rem] text-[#e1e2e4]">
              <span>{MONTHS[currentMonth.getMonth()]}</span>
              <span>{currentMonth.getFullYear()}</span>
            </div>
          </div>

          <div className="flex items-center gap-13">
            <button
              onClick={() => changeMonth(-1)}
              className="flex h-25 w-25 items-center justify-center rounded-3xl bg-[#1b1c1e]"
            >
              <BackIcon />
            </button>
            <button
              onClick={() => changeMonth(1)}
              className="flex h-25 w-25 rotate-180 items-center justify-center rounded-3xl bg-[#1b1c1e]"
            >
              <BackIcon />
            </button>
          </div>
        </div>

        {/* Calendar */}
        <div className="flex flex-col gap-10 rounded-3xl p-6">
          {/* Weekday Headers */}
          <div className="flex w-full items-center justify-between">
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className="flex h-13.75 w-30 items-center justify-center"
              >
                <span className="text-[2rem] leading-[1.3] font-normal tracking-[-0.054rem] text-[#878a93]">
                  {day}
                </span>
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="flex flex-col gap-3">
            {Array.from({ length: 5 }).map((_, weekIndex) => (
              <div key={weekIndex} className="flex h-30 items-center gap-1">
                {days
                  .slice(weekIndex * 7, (weekIndex + 1) * 7)
                  .map((day, dayIndex) =>
                    day === null ? (
                      <div key={dayIndex} className="h-30 w-30" />
                    ) : (
                      <button
                        key={dayIndex}
                        onClick={() => handleDateClick(day)}
                        className={cn(
                          "flex h-30 w-30 items-center justify-center text-[2.5rem] leading-[1.3] font-normal tracking-[-0.025rem]",
                          isSelected(day)
                            ? "rounded-[2.25rem] bg-[#f6e24a] font-medium text-[#171719]"
                            : "text-[#aeb0b6]",
                        )}
                      >
                        {day}
                      </button>
                    ),
                  )}
              </div>
            ))}
          </div>
        </div>

        {/* Next Button */}
        {selectedDate && (
          <SecondaryButton
            onClick={() => {
              setTargetDate(selectedDate);
              router.navigate({ to: "/information" });
            }}
          >
            Next
          </SecondaryButton>
        )}
      </div>
    </div>
  );
}
