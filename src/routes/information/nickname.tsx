import { cn } from "@sglara/cn";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import DeleteIcon from "@/assets/icons/delete.svg?react";
import { EnglishKeyboard } from "@/components/EnglishKeyboard";
import { KoreanKeyboard } from "@/components/KoreanKeyboard";
import { NavigationBar } from "@/components/NavigationBar";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { Title } from "@/components/Title";
import { nicknameAtom } from "@/store/atoms";

export const Route = createFileRoute("/information/nickname")({
  component: NicknamePage,
});

function NicknamePage() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [nickname, setNickname] = useAtom(nicknameAtom);
  const [isFocused, setIsFocused] = useState(true);

  const currentLanguage = i18n.language;
  const isKorean = currentLanguage === "ko";
  const maxLength = isKorean ? 9 : 20;

  useEffect(() => {
    // Auto-focus on mount
    setIsFocused(true);
  }, []);

  const handleNext = () => {
    router.navigate({ to: "/information/birth" });
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  return (
    <main className="h-dvh">
      <NavigationBar />

      <ProgressIndicator current={1} />

      <Title text={t("information.nickname.title")} />

      {/* Content */}
      <div className="flex flex-col items-center px-20">
        <div className="flex w-full flex-col gap-12">
          {/* Input Field */}
          <div className="flex w-full flex-col gap-4">
            <div
              className="flex w-full items-center justify-between rounded-3xl bg-[#1b1c1e] px-8 py-7"
              onClick={handleInputFocus}
            >
              <div className="flex min-w-0 grow flex-col items-center justify-center">
                <div
                  className={cn(
                    "flex w-full items-center gap-1",
                    nickname && "justify-between",
                  )}
                >
                  {isFocused && !nickname && (
                    <div className="h-12 w-0.75 bg-[#8495c9]" />
                  )}
                  <p
                    className={cn(
                      "font-pretendard text-[2.5rem] leading-[1.3] tracking-[-0.025rem]",
                      nickname.length > 0 ? "text-white" : "text-white/50",
                    )}
                  >
                    {nickname || t("information.nickname.placeholder")}
                  </p>
                  {nickname.length !== 0 && (
                    <DeleteIcon onClick={() => setNickname("")} />
                  )}
                </div>
              </div>
            </div>

            {/* Help Text */}
            <div className="px-6">
              <p className="font-pretendard text-[2.25rem] leading-[1.2] tracking-[-0.045rem] text-[#cfcfcf]">
                {t("information.nickname.helpText")}
              </p>
            </div>
          </div>

          {/* Keyboard Container */}
          <div className="flex w-full flex-col items-center overflow-hidden rounded-none bg-[#111111] px-0 py-4">
            {isKorean ? (
              <KoreanKeyboard
                value={nickname}
                onChange={setNickname}
                maxLength={maxLength}
              />
            ) : (
              <EnglishKeyboard
                value={nickname}
                onChange={setNickname}
                maxLength={maxLength}
              />
            )}
          </div>
        </div>
      </div>

      {/* Next Button */}
      <div className="flex w-full flex-col items-center justify-center px-20 py-10">
        <PrimaryButton onClick={handleNext} disabled={!nickname}>
          {t("information.nickname.next")}
        </PrimaryButton>
      </div>
    </main>
  );
}
