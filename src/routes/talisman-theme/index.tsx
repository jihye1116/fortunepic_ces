import { cn } from "@sglara/cn";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useAtom } from "jotai";

import businessImg from "@/assets/images/themes/business.png";
import careerImg from "@/assets/images/themes/career.png";
import familyImg from "@/assets/images/themes/family.png";
import happinessImg from "@/assets/images/themes/happiness.png";
import healthImg from "@/assets/images/themes/health.png";
import loveImg from "@/assets/images/themes/love.png";
import wealthImg from "@/assets/images/themes/wealth.png";
import { NavigationBar } from "@/components/NavigationBar";
import type { Theme } from "@/core/types";
import { themeAtom } from "@/store/atoms";

export const Route = createFileRoute("/talisman-theme/")({
  component: TalismanThemePage,
});

interface ThemeButton {
  id: Theme;
  label: string;
  image: string;
  size: number;
  position: { left: string; top: string };
}

const themes: ThemeButton[] = [
  {
    id: "happiness",
    label: "Happiness",
    image: happinessImg,
    size: 23.375,
    position: { left: "0", top: "8.125rem" },
  },
  {
    id: "business",
    label: "Business",
    image: businessImg,
    size: 18.8125,
    position: { left: "33.1875rem", top: "14.8125rem" },
  },
  {
    id: "wealth",
    label: "Wealth",
    image: wealthImg,
    size: 18.8125,
    position: { left: "32.375rem", top: "35rem" },
  },
  {
    id: "career",
    label: "Career",
    image: careerImg,
    size: 18.8125,
    position: { left: "8.0625rem", top: "36.8125rem" },
  },
  {
    id: "family",
    label: "Family",
    image: familyImg,
    size: 13.6875,
    position: { left: "20.25rem", top: "25.125rem" },
  },
  {
    id: "love",
    label: "Love",
    image: loveImg,
    size: 13.6875,
    position: { left: "23.375rem", top: "51.5625rem" },
  },
  {
    id: "health",
    label: "Health",
    image: healthImg,
    size: 16.6875,
    position: { left: "21.875rem", top: "0.8125rem" },
  },
];

function TalismanThemePage() {
  const [selectedTheme, setSelectedTheme] = useAtom(themeAtom);
  const router = useRouter();

  const handleThemeSelect = (themeId: Theme) => {
    setSelectedTheme(themeId);

    setTimeout(() => {
      router.navigate({
        to: "/talisman-theme/$theme",
        params: { theme: themeId },
      });
    }, 300);
  };

  return (
    <main className="h-dvh">
      <NavigationBar />

      {/* Title */}
      <div className="flex w-full flex-col gap-3 px-20 py-10">
        <h1 className="gradient-text text-[3.5rem] leading-[1.3] font-medium tracking-[-0.07rem]">
          Select Talisman Theme
        </h1>
        <p className="text-[2.5rem] leading-[1.3] font-normal tracking-[-0.025rem] text-[#989ba2]">
          Choose the area you want to
        </p>
      </div>

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
                  "absolute flex items-center justify-center overflow-hidden rounded-full transition-all duration-300",
                  isSelected && "scale-110",
                )}
                style={{
                  left: theme.position.left,
                  top: theme.position.top,
                  width: `${theme.size}rem`,
                  height: `${theme.size}rem`,
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
                <span className="relative text-[2.5rem] leading-[1.3] font-normal tracking-[-0.025rem] text-[#e1e2e4]">
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
