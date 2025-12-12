import { cn } from "@sglara/cn";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import DateSpecificSvg from "@/assets/icons/date-specific.svg?react";
import FiveElementsSvg from "@/assets/icons/five-elements.svg?react";
import KoreanTalismanSvg from "@/assets/icons/korean-talisman.svg?react";
import LifetimeFortuneSvg from "@/assets/icons/lifetime-fortune.svg?react";
import NewYearSvg from "@/assets/icons/new-year.svg?react";
import TodayFortuneSvg from "@/assets/icons/today-fortune.svg?react";
import ZodiacAnimalSvg from "@/assets/icons/zodiac-animal.svg?react";
import { NavigationBar } from "@/components/NavigationBar";
import { SecondaryButton } from "@/components/SecondaryButton";
import { Title } from "@/components/Title";
import { backgroundOpacityAtom, topicAtom } from "@/store/atoms";

export const Route = createFileRoute("/topic")({
  component: TopicPage,
});

interface TopicItem {
  id: string;
  label: string;
  color: "blue" | "red" | "yellow";
  svg: React.FC<React.SVGAttributes<SVGElement>>; // SVG component for unique blob shape
}

function TopicPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const setTopicAtom = useSetAtom(topicAtom);
  const setBackgroundOpacity = useSetAtom(backgroundOpacityAtom);

  // Expand animation after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // 내부 코드값 매핑
  const topics: TopicItem[] = [
    {
      id: "today",
      label: t("topic.topics.today"),
      color: "blue",
      svg: TodayFortuneSvg,
    },
    {
      id: "lifetime",
      label: t("topic.topics.lifetimeFortune"),
      color: "blue",
      svg: LifetimeFortuneSvg,
    },
    {
      id: "dayPillarAnimal",
      label: t("topic.topics.dayPillarAnimal"),
      color: "red",
      svg: ZodiacAnimalSvg,
    },
    {
      id: "physiognomy",
      label: t("topic.topics.physiognomy"),
      color: "red",
      svg: KoreanTalismanSvg,
    },
    {
      id: "fiveElementsV3",
      label: t("topic.topics.fiveElementsV3"),
      color: "red",
      svg: FiveElementsSvg,
    },
    {
      id: "specifiedDate",
      label: t("topic.topics.specifiedDate"),
      color: "yellow",
      svg: DateSpecificSvg,
    },
    {
      id: "yearly",
      label: t("topic.topics.yearly"),
      color: "yellow",
      svg: NewYearSvg,
    },
  ];

  const getColorClasses = (
    color: "blue" | "red" | "yellow",
    isSelected: boolean,
  ) => {
    if (isSelected) {
      switch (color) {
        case "blue":
          return "text-[#5b72b7]";
        case "red":
          return "text-[#ed474a]";
        case "yellow":
          return "text-[#f6e24a]";
      }
    }

    switch (color) {
      case "blue":
        return "text-[#5b72b7]/60";
      case "red":
        return "text-[#ed474a]/60";
      case "yellow":
        return "text-[#f6e24a]/60";
    }
  };

  const handleNext = () => {
    setTopicAtom(selectedTopic!);
    setBackgroundOpacity(false);
    setTimeout(() => {
      if (selectedTopic === "specifiedDate") {
        router.navigate({ to: "/date" });
      } else if (selectedTopic === "physiognomy") {
        router.navigate({ to: "/talisman-theme" });
      } else {
        router.navigate({ to: "/information" });
      }
      setBackgroundOpacity(true);
    }, 800);
  };

  return (
    <main className="min-h-dvh">
      <NavigationBar />

      <Title text={t("topic.title")} />

      {/* Topic Buttons - 3 rows */}
      <div className="relative flex min-h-[1000px] flex-1 flex-col items-center justify-center gap-0 px-0 py-15">
        {/* Row 1 - 2 items (blue) */}
        <div
          className={cn(
            "flex items-center justify-center transition-all duration-700",
            isExpanded ? "rotate-0 gap-0" : "-rotate-15 gap-[60px]",
          )}
        >
          {topics.slice(0, 2).map((topic, idx) => {
            const SvgComponent = topic.svg;
            return (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id)}
                className={cn(
                  "relative flex items-center justify-center gap-2.5 p-2 transition-all duration-700",
                  selectedTopic && selectedTopic !== topic.id && "opacity-50",
                  isExpanded
                    ? "h-[300px] w-[300px] rotate-0"
                    : idx === 0
                      ? "h-[132px] w-[132px] rotate-15"
                      : "h-[132px] w-[132px] rotate-30",
                )}
              >
                <div className="relative size-full overflow-hidden">
                  <SvgComponent
                    className={cn(
                      "absolute inset-0 h-full w-full transition-all duration-700",
                      getColorClasses(topic.color, selectedTopic === topic.id),
                    )}
                  />
                  <div
                    className={cn(
                      "absolute inset-0 flex items-center justify-center px-10 text-center text-[2rem] leading-[1.3] font-medium tracking-[-0.054rem] whitespace-pre text-[#171719] transition-opacity delay-200 duration-500",
                      isExpanded ? "opacity-100" : "opacity-0",
                    )}
                  >
                    {topic.label}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Row 2 - 3 items (red) */}
        <div
          className={cn(
            "flex items-center justify-center transition-all duration-700",
            isExpanded
              ? "mt-0 mb-0 rotate-0 gap-0"
              : "mt-[60px] mb-20 -rotate-15 gap-[60px]",
          )}
        >
          {topics.slice(2, 5).map((topic, idx) => {
            const SvgComponent = topic.svg;
            return (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id)}
                className={cn(
                  "relative flex items-center justify-center gap-2.5 p-2 transition-all duration-700",
                  selectedTopic && selectedTopic !== topic.id && "opacity-50",
                  isExpanded
                    ? "h-[300px] w-[300px] rotate-0"
                    : idx === 0
                      ? "h-[132px] w-[132px] -rotate-15"
                      : "h-[132px] w-[132px] rotate-30",
                )}
              >
                <div className="relative size-full overflow-hidden">
                  <SvgComponent
                    className={cn(
                      "absolute inset-0 h-full w-full transition-all duration-700",
                      getColorClasses(topic.color, selectedTopic === topic.id),
                    )}
                  />
                  <div
                    className={cn(
                      "absolute inset-0 flex items-center justify-center px-10 text-center text-[2rem] leading-[1.3] font-medium tracking-[-0.054rem] whitespace-pre text-[#171719] transition-opacity delay-200 duration-500",
                      isExpanded ? "opacity-100" : "opacity-0",
                    )}
                  >
                    {topic.label}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Row 3 - 2 items (yellow) */}
        <div
          className={cn(
            "flex items-center justify-center transition-all duration-700",
            isExpanded ? "rotate-0 gap-0" : "rotate-15 gap-[60px]",
          )}
        >
          {topics.slice(5, 7).map((topic, idx) => {
            const SvgComponent = topic.svg;
            return (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id)}
                className={cn(
                  "relative flex items-center justify-center gap-2.5 p-2 transition-all duration-700",
                  selectedTopic && selectedTopic !== topic.id && "opacity-50",
                  isExpanded
                    ? "h-[300px] w-[300px] rotate-0"
                    : idx === 0
                      ? "h-[132px] w-[132px] -rotate-15"
                      : "h-[132px] w-[132px] rotate-30",
                )}
              >
                <div className="relative size-full overflow-hidden">
                  <SvgComponent
                    className={cn(
                      "absolute inset-0 h-full w-full transition-all duration-700",
                      getColorClasses(topic.color, selectedTopic === topic.id),
                    )}
                  />
                  <div
                    className={cn(
                      "absolute inset-0 flex items-center justify-center px-10 text-center text-[2rem] leading-[1.3] font-medium tracking-[-0.054rem] whitespace-pre text-[#171719] transition-opacity delay-200 duration-500",
                      isExpanded ? "opacity-100" : "opacity-0",
                    )}
                  >
                    {topic.label}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {selectedTopic && (
        <div className="px-20 py-10">
          <SecondaryButton onClick={handleNext}>
            {t("topic.next")}
          </SecondaryButton>
        </div>
      )}
    </main>
  );
}
