import { cn } from "@sglara/cn";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { GenderBottomSheet } from "@/components/GenderBottomSheet";
import { NavigationBar } from "@/components/NavigationBar";
import { OutlineButton } from "@/components/OutlineButton";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { Title } from "@/components/Title";

export const Route = createFileRoute("/information/gender")({
  component: GenderPage,
});

type Gender = "male" | "female" | "prefer-not";

function GenderPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const handleGenderSelect = (gender: Gender) => {
    setSelectedGender(gender);
    setTimeout(() => {
      router.navigate({ to: "/" }); // TODO: Update with correct route
    }, 300);
  };

  const handleBottomButton = () => {
    setShowBottomSheet(true);
  };

  const handleContinueWithoutGender = () => {
    setSelectedGender("prefer-not");
    router.navigate({ to: "/" }); // TODO: Update with correct route
  };

  return (
    <div className="h-dvh">
      {/* Navigation */}
      <NavigationBar />

      {/* Progress Indicator */}
      <ProgressIndicator current={4} />

      {/* Title */}
      <Title
        text={t("information.gender.title")}
        subtext={t("information.gender.subtitle")}
      />

      {/* Gender Selection */}
      <div className="flex grow items-center justify-center gap-5 px-20 py-12">
        {/* Male Button */}
        <button
          onClick={() => handleGenderSelect("male")}
          className={cn(
            "flex h-187.75 flex-1 items-center justify-center rounded-3xl px-12 py-3 transition-all",
            selectedGender === "male"
              ? "bg-[radial-gradient(262.33%_91.32%_at_53%_98.78%,#F16C6E_0%,#8495C9_40%,#000000_100%)] opacity-80"
              : "bg-[#1b1c1e] opacity-50",
          )}
        >
          <p
            className={cn(
              "font-pretendard text-[3rem] leading-[1.3] tracking-[-0.081rem]",
              selectedGender === "male"
                ? "font-semibold text-white"
                : "font-medium text-[#aeb0b6]",
            )}
          >
            {t("information.gender.male")}
          </p>
        </button>

        {/* Female Button */}
        <button
          onClick={() => handleGenderSelect("female")}
          className={cn(
            "flex h-187.75 flex-1 items-center justify-center rounded-3xl px-12 py-3 transition-all",
            selectedGender === "female"
              ? "bg-[radial-gradient(262.33%_91.32%_at_53%_98.78%,#F16C6E_0%,#8495C9_40%,#000000_100%)] opacity-80"
              : "bg-[#1b1c1e] opacity-50",
          )}
        >
          <p
            className={cn(
              "font-pretendard text-[3rem] leading-[1.3] tracking-[-0.081rem]",
              selectedGender === "female"
                ? "font-semibold text-white"
                : "font-medium text-[#aeb0b6]",
            )}
          >
            {t("information.gender.female")}
          </p>
        </button>
      </div>

      {/* Bottom Button */}
      <div className="flex flex-col items-center justify-center px-20 py-10">
        <OutlineButton onClick={handleBottomButton}>
          {t("information.gender.preferNot")}
        </OutlineButton>
      </div>

      {/* Bottom Sheet */}
      <GenderBottomSheet
        open={showBottomSheet}
        onOpenChange={setShowBottomSheet}
        onContinue={handleContinueWithoutGender}
      />
    </div>
  );
}
