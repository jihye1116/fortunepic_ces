import { cn } from "@sglara/cn";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useAtom, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import businessImg from "@/assets/images/themes/business.png";
import careerImg from "@/assets/images/themes/career.png";
import familyImg from "@/assets/images/themes/family.png";
import happinessImg from "@/assets/images/themes/happiness.png";
import healthImg from "@/assets/images/themes/health.png";
import loveImg from "@/assets/images/themes/love.png";
import wealthImg from "@/assets/images/themes/wealth.png";
import { NavigationBar } from "@/components/NavigationBar";
import { Title } from "@/components/Title";
import type { Theme } from "@/core/types";
import { backgroundOpacityAtom, themeAtom } from "@/store/atoms";

export const Route = createFileRoute("/talisman-theme/")({
  component: TalismanThemePage,
});

interface ThemeButton {
  id: Theme;
  label: string;
  image: string;
  // Collapsed state (small size and position)
  collapsedSize: number;
  collapsedPosition: { left: string; top: string };
  // Expanded state (large size and position)
  expandedSize: number;
  expandedPosition: { left: string; top: string };
}

function TalismanThemePage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [selectedTheme, setSelectedTheme] = useAtom(themeAtom);
  const setBackgroundOpacity = useSetAtom(backgroundOpacityAtom);
  const [isExpanded, setIsExpanded] = useState(false);

  const themes: ThemeButton[] = [
    {
      id: "happiness",
      label: t("talisman-theme.themes.happiness"),
      image: happinessImg,
      collapsedSize: 18.6875,
      collapsedPosition: {
        left: "calc(50% - 13.6875rem)",
        top: "calc(50% - 11.8125rem)",
      },
      expandedSize: 23.375,
      expandedPosition: { left: "0", top: "8.125rem" },
    },
    {
      id: "business",
      label: t("talisman-theme.themes.business"),
      image: businessImg,
      collapsedSize: 14.125,
      collapsedPosition: {
        left: "calc(50% + 10.8125rem)",
        top: "calc(50% - 7.0625rem)",
      },
      expandedSize: 18.8125,
      expandedPosition: { left: "33.1875rem", top: "14.8125rem" },
    },
    {
      id: "wealth",
      label: t("talisman-theme.themes.wealth"),
      image: wealthImg,
      collapsedSize: 14.125,
      collapsedPosition: {
        left: "calc(50% + 8.75rem)",
        top: "calc(50% + 7.75rem)",
      },
      expandedSize: 18.8125,
      expandedPosition: { left: "32.375rem", top: "35rem" },
    },
    {
      id: "career",
      label: t("talisman-theme.themes.career"),
      image: careerImg,
      collapsedSize: 14.125,
      collapsedPosition: {
        left: "calc(50% - 11.375rem)",
        top: "calc(50% + 6.1875rem)",
      },
      expandedSize: 18.8125,
      expandedPosition: { left: "8.0625rem", top: "36.8125rem" },
    },
    {
      id: "family",
      label: t("talisman-theme.themes.family"),
      image: familyImg,
      collapsedSize: 9,
      collapsedPosition: {
        left: "calc(50% - 0.75rem)",
        top: "calc(50% - 1.75rem)",
      },
      expandedSize: 13.6875,
      expandedPosition: { left: "20.25rem", top: "25.125rem" },
    },
    {
      id: "love",
      label: t("talisman-theme.themes.love"),
      image: loveImg,
      collapsedSize: 9,
      collapsedPosition: {
        left: "calc(50% - 1.6875rem)",
        top: "calc(50% + 13.9375rem)",
      },
      expandedSize: 13.6875,
      expandedPosition: { left: "23.375rem", top: "51.5625rem" },
    },
    {
      id: "health",
      label: t("talisman-theme.themes.health"),
      image: healthImg,
      collapsedSize: 12,
      collapsedPosition: {
        left: "calc(50% + 1.6875rem)",
        top: "calc(50% - 17.8125rem)",
      },
      expandedSize: 16.6875,
      expandedPosition: { left: "21.875rem", top: "0.8125rem" },
    },
  ];

  // Expand animation after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handleThemeSelect = (themeId: Theme) => {
    setSelectedTheme(themeId);
    setBackgroundOpacity(false);

    setTimeout(() => {
      router.navigate({
        to: "/talisman-theme/$theme",
        params: { theme: themeId },
      });
      setBackgroundOpacity(true);
    }, 800);
  };

  return (
    <main className="h-dvh">
      <NavigationBar />

      <Title
        text={t("talisman-theme.title")}
        subtext={t("talisman-theme.subtitle")}
      />

      {/* Theme Buttons Container */}
      <div className="flex w-full items-center justify-center px-0 py-12">
        <div className="relative h-261 w-208">
          {themes.map((theme) => {
            const isSelected = selectedTheme === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => handleThemeSelect(theme.id)}
                className={cn(
                  "absolute flex items-center justify-center overflow-hidden rounded-full transition-all duration-700",
                  isSelected && "scale-110",
                )}
                style={{
                  left: isExpanded
                    ? theme.expandedPosition.left
                    : theme.collapsedPosition.left,
                  top: isExpanded
                    ? theme.expandedPosition.top
                    : theme.collapsedPosition.top,
                  width: isExpanded
                    ? `${theme.expandedSize}rem`
                    : `${theme.collapsedSize}rem`,
                  height: isExpanded
                    ? `${theme.expandedSize}rem`
                    : `${theme.collapsedSize}rem`,
                }}
              >
                <img
                  src={theme.image}
                  alt={theme.label}
                  className={cn(
                    "absolute inset-0 h-full w-full rounded-full object-cover transition-all duration-300",
                    !isSelected && "grayscale",
                  )}
                />
                <div
                  className={cn(
                    "absolute inset-0 rounded-full transition-all duration-300",
                    isSelected ? "bg-black/20" : "bg-black/50",
                  )}
                />
                <span
                  className={cn(
                    "relative text-[2.5rem] leading-[1.3] font-normal tracking-[-0.025rem] text-[#e1e2e4] transition-opacity duration-500",
                    isExpanded ? "opacity-100 delay-200" : "opacity-0",
                  )}
                >
                  {theme.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}
