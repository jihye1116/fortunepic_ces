import { cn } from "@sglara/cn";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import AlertIcon from "@/assets/icons/alert.svg?react";
import { NavigationBar } from "@/components/NavigationBar";
import { NumberKeyboard } from "@/components/NumberKeyboard";
import { OutlineButton } from "@/components/OutlineButton";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { Title } from "@/components/Title";

export const Route = createFileRoute("/information/time")({
  component: TimePage,
});

function TimePage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [period, setPeriod] = useState<"AM" | "PM">("AM");
  const [activeField, setActiveField] = useState<"hour" | "minute">("hour");
  const [hasError, setHasError] = useState(false);

  // 각 필드가 채워질 때마다 검증
  useEffect(() => {
    let error = false;

    // 시와 분이 모두 입력되면 12:00 초과 검증
    if (hour.length === 2 && minute.length === 2) {
      const h = parseInt(hour, 10);
      const m = parseInt(minute, 10);

      // 12시 00분을 초과하면 에러
      if (h === 12 && m > 0) {
        error = true;
      } else if (h > 12) {
        error = true;
      } else if (h < 1 || m < 0 || m > 59) {
        error = true;
      }
    } else {
      // 각 필드 개별 검증
      if (hour.length === 2) {
        const h = parseInt(hour, 10);
        if (h < 1 || h > 12) {
          error = true;
        }
      }
      if (minute.length === 2) {
        const m = parseInt(minute, 10);
        if (m < 0 || m > 59) {
          error = true;
        }
      }
    }

    setHasError(error);
  }, [hour, minute]);

  const handleBackspaceEmpty = () => {
    if (activeField === "minute") {
      setActiveField("hour");
      setHour(hour.slice(0, -1));
    }
  };

  const handleFieldChange = (value: string) => {
    if (activeField === "hour") {
      setHour(value);
      if (value.length === 2) setActiveField("minute");
    } else {
      setMinute(value);
    }
  };

  const getCurrentValue = () => {
    return activeField === "hour" ? hour : minute;
  };

  const displayValue = (field: "hour" | "minute") => {
    const value = field === "hour" ? hour : minute;
    if (value.length === 0) {
      return field === "hour" ? "HH" : "MM";
    }
    return value;
  };

  const hasValue = (field: "hour" | "minute") => {
    return field === "hour" ? hour.length > 0 : minute.length > 0;
  };

  const handleNext = () => {
    router.navigate({ to: "/" });
  };

  return (
    <div className="flex flex-col">
      <NavigationBar />

      <ProgressIndicator current={3} />

      <Title text={t("information.time.title")} />

      {/* Content */}
      <div className="flex grow flex-col items-center px-20">
        <div className="flex flex-col gap-8">
          {/* Input Fields */}
          <div className="flex w-fit flex-col gap-4">
            <div className="flex items-start gap-12">
              <div className="flex gap-3">
                {/* Hour Input */}
                <div className="flex flex-col gap-4">
                  <div
                    className={cn(
                      "flex h-27 w-33 items-center justify-between rounded-3xl bg-[#1b1c1e] px-8 py-7",
                      hasError && "border-b border-[#f16c6e]",
                    )}
                    onClick={() => setActiveField("hour")}
                  >
                    <div className="flex min-w-0 grow flex-col items-start justify-center">
                      <div className="flex w-full items-center gap-1">
                        <p
                          className={cn(
                            "font-pretendard text-[2.5rem] leading-[1.3] tracking-[-0.025rem]",
                            hasValue("hour")
                              ? "text-[#e1e2e4]"
                              : "text-white/50",
                          )}
                        >
                          {displayValue("hour")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Colon */}
                <div className="flex h-27 items-center justify-center">
                  <p className="font-pretendard text-[3rem] leading-[1.3] font-semibold tracking-[-0.081rem] text-[#c2c4c8]">
                    :
                  </p>
                </div>

                {/* Minute Input */}
                <div className="flex flex-col gap-4">
                  <div
                    className={cn(
                      "flex h-27 w-33 items-center justify-between rounded-3xl bg-[#1b1c1e] px-8 py-7",
                      hasError && "border-b border-[#f16c6e]",
                    )}
                    onClick={() => setActiveField("minute")}
                  >
                    <div className="flex min-w-0 grow flex-col items-start justify-center">
                      <div className="flex w-full items-center gap-1">
                        <p
                          className={cn(
                            "font-pretendard text-[2.5rem] leading-[1.3] tracking-[-0.025rem]",
                            hasValue("minute")
                              ? "text-[#e1e2e4]"
                              : "text-white/50",
                          )}
                        >
                          {displayValue("minute")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AM/PM Toggle */}
              <div className="flex h-27 items-center rounded-3xl bg-[#0f0f10]">
                <button
                  onClick={() => setPeriod("AM")}
                  className={cn(
                    "relative flex h-21 w-40.75 items-center justify-center rounded-[1.8125rem] px-0 py-3",
                    period === "AM" && "bg-[#1b1c1e]",
                  )}
                >
                  <p
                    className={cn(
                      "font-pretendard text-[2.5rem] leading-[1.3] tracking-[-0.0375rem]",
                      period === "AM"
                        ? "font-medium text-white"
                        : "font-normal text-[#878a93]",
                    )}
                  >
                    AM
                  </p>
                </button>
                <button
                  onClick={() => setPeriod("PM")}
                  className={cn(
                    "relative flex h-21 w-40.75 items-center justify-center rounded-[1.8125rem] px-0 py-3",
                    period === "PM" && "bg-[#1b1c1e]",
                  )}
                >
                  <p
                    className={cn(
                      "font-pretendard text-[2.5rem] leading-[1.3] tracking-[-0.025rem]",
                      period === "PM"
                        ? "font-medium text-white"
                        : "font-normal text-[#878a93]",
                    )}
                  >
                    PM
                  </p>
                </button>
              </div>
            </div>
            <div
              className={cn(
                "flex items-center gap-5 pl-6",
                hasError ? "visible" : "invisible",
              )}
            >
              <AlertIcon />
              <p className="font-pretendard text-[2rem] leading-[1.3] tracking-[-0.054rem] text-[#878a93]">
                {t("information.time.error")}
              </p>
            </div>
          </div>

          {/* Keyboard Container */}
          <div className="flex w-full flex-col items-center overflow-hidden rounded-none px-0 py-4">
            <NumberKeyboard
              value={getCurrentValue()}
              onChange={handleFieldChange}
              onBackspaceEmpty={handleBackspaceEmpty}
              maxLength={2}
            />
          </div>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="relative z-10 flex flex-col gap-5 px-20 py-10">
        <OutlineButton onClick={handleNext}>
          {t("information.time.dontKnow")}
        </OutlineButton>
        <PrimaryButton
          onClick={handleNext}
          disabled={hasError || hour.length !== 2 || minute.length !== 2}
        >
          {t("information.time.next")}
        </PrimaryButton>
      </div>
    </div>
  );
}
