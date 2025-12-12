import { cn } from "@sglara/cn";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import AlertIcon from "@/assets/icons/alert.svg?react";
import EyeIcon from "@/assets/icons/eye.svg?react";
import EyeOffIcon from "@/assets/icons/eye-off.svg?react";
import { NavigationBar } from "@/components/NavigationBar";
import { NumberKeyboard } from "@/components/NumberKeyboard";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { Title } from "@/components/Title";
import { backgroundOpacityAtom, birthdateAtom } from "@/store/atoms";

export const Route = createFileRoute("/information/birth")({
  component: BirthPage,
});

function BirthPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [activeField, setActiveField] = useState<"month" | "day" | "year">(
    "month",
  );
  const [hasError, setHasError] = useState(false);
  const setBackgroundOpacity = useSetAtom(backgroundOpacityAtom);
  const setBirthdate = useSetAtom(birthdateAtom);

  // 각 필드가 채워질 때마다 검증
  useEffect(() => {
    let error = false;

    // 월 검증 (2자리 입력되면)
    if (month.length === 2) {
      const m = parseInt(month, 10);
      if (m < 1 || m > 12) {
        error = true;
      }
    }

    // 일 검증 (2자리 입력되면)
    if (day.length === 2) {
      const d = parseInt(day, 10);
      if (d < 1 || d > 31) {
        error = true;
      }

      // 월도 입력되어 있으면 해당 월의 일수 검증
      if (month.length === 2 && !error) {
        const m = parseInt(month, 10);
        const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (d > daysInMonth[m - 1]) {
          error = true;
        }
      }
    }

    // 년 검증 (4자리 입력되면)
    if (year.length === 4) {
      const y = parseInt(year, 10);
      if (y < 1900 || y > new Date().getFullYear()) {
        error = true;
      }

      // 윤년 검증 (월, 일, 년이 모두 입력되어 있고 2월 29일인 경우)
      if (month.length === 2 && day.length === 2 && !error) {
        const m = parseInt(month, 10);
        const d = parseInt(day, 10);
        if (m === 2 && d === 29) {
          const isLeap = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
          if (!isLeap) {
            error = true;
          }
        }
      }
    }

    setHasError(error);
  }, [month, day, year]);

  const handleBackspaceEmpty = () => {
    if (activeField === "year") {
      setActiveField("day");
      setDay(day.slice(0, -1));
    } else if (activeField === "day") {
      setActiveField("month");
      setMonth(month.slice(0, -1));
    }
  };

  const handleFieldChange = (value: string) => {
    if (activeField === "month") {
      setMonth(value);
      if (value.length === 2) setActiveField("day");
    } else if (activeField === "day") {
      setDay(value);
      if (value.length === 2) setActiveField("year");
    } else {
      setYear(value);
    }
  };

  const getCurrentValue = () => {
    return activeField === "month" ? month : activeField === "day" ? day : year;
  };

  const handleNext = () => {
    setBirthdate(`${year}-${month}-${day}`);
    setBackgroundOpacity(false);

    setTimeout(() => {
      setBackgroundOpacity(true);
      router.navigate({ to: "/information/time" });
    }, 800);
  };

  const displayValue = (field: "month" | "day" | "year") => {
    const value = field === "month" ? month : field === "day" ? day : year;
    const placeholder =
      field === "month" ? "MM" : field === "day" ? "DD" : "YYYY";

    if (!isVisible && value) {
      return "*".repeat(value.length);
    }
    return value || placeholder;
  };

  const hasValue = (field: "month" | "day" | "year") => {
    return field === "month"
      ? month.length > 0
      : field === "day"
        ? day.length > 0
        : year.length > 0;
  };

  const isComplete =
    month.length === 2 && day.length === 2 && year.length === 4;

  return (
    <main className="h-dvh">
      <NavigationBar />

      <ProgressIndicator current={2} />

      <Title text={t("information.birth.title")} />

      {/* Content */}
      <div className="flex flex-col items-center px-20">
        <div className="flex w-fit flex-col gap-8">
          {/* Input Fields */}
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-center gap-4">
              {/* Month */}
              <div>
                <div
                  className={cn(
                    "flex h-27 w-33 items-center justify-between rounded-3xl bg-[#1b1c1e] px-8 py-7",
                    hasError && "border-b border-[#f16c6e]",
                  )}
                  onClick={() => setActiveField("month")}
                >
                  <div className="flex min-w-0 grow flex-col items-start justify-center">
                    <div className="flex w-full items-center gap-1">
                      <p
                        className={cn(
                          "font-pretendard text-[2.5rem] leading-[1.3] tracking-[-0.025rem]",
                          hasValue("month")
                            ? "text-[#e1e2e4]"
                            : "text-white/50",
                        )}
                      >
                        {displayValue("month")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Day */}
              <div>
                <div
                  className={cn(
                    "flex h-27 w-33 items-center justify-between rounded-3xl bg-[#1b1c1e] px-8 py-7",
                    hasError && "border-b border-[#f16c6e]",
                  )}
                  onClick={() => setActiveField("day")}
                >
                  <div className="flex min-w-0 grow flex-col items-start justify-center">
                    <div className="flex w-full items-center gap-1">
                      <p
                        className={cn(
                          "font-pretendard text-[2.5rem] leading-[1.3] tracking-[-0.025rem]",
                          hasValue("day") ? "text-[#e1e2e4]" : "text-white/50",
                        )}
                      >
                        {displayValue("day")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Year */}
              <div>
                <div
                  className={cn(
                    "flex h-27 w-41.25 items-center justify-between rounded-3xl bg-[#1b1c1e] px-8 py-7",
                    hasError && "border-b border-[#f16c6e]",
                  )}
                  onClick={() => setActiveField("year")}
                >
                  <div className="flex min-w-0 grow flex-col items-start justify-center">
                    <div className="flex w-full items-center gap-1">
                      <p
                        className={cn(
                          "font-pretendard text-[2.5rem] leading-[1.3] tracking-[-0.025rem]",
                          hasValue("year") ? "text-[#e1e2e4]" : "text-white/50",
                        )}
                      >
                        {displayValue("year")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Eye Icon */}
              <button
                onClick={() => setIsVisible(!isVisible)}
                className="flex h-27 w-27 items-center justify-center"
              >
                {isVisible ? (
                  <EyeIcon className="h-16 w-16" />
                ) : (
                  <EyeOffIcon className="h-16 w-16" />
                )}
              </button>
            </div>

            <div
              className={cn(
                "flex items-center gap-5 pl-6",
                hasError ? "visible" : "invisible",
              )}
            >
              <AlertIcon />
              <p className="font-pretendard text-[2rem] leading-[1.3] tracking-[-0.054rem] text-[#878a93]">
                {t("information.birth.incorrectDate")}
              </p>
            </div>
          </div>

          {/* Keyboard Container */}
          <div className="flex w-full flex-col items-center overflow-hidden rounded-none px-0 py-4">
            <NumberKeyboard
              value={getCurrentValue()}
              onChange={handleFieldChange}
              onBackspaceEmpty={handleBackspaceEmpty}
              maxLength={activeField === "year" ? 4 : 2}
            />
          </div>
        </div>
      </div>

      {/* Next Button */}
      <div className="flex w-full flex-col items-center justify-center px-20 py-10">
        <PrimaryButton onClick={handleNext} disabled={!isComplete || hasError}>
          {t("information.birth.next")}
        </PrimaryButton>
      </div>
    </main>
  );
}
