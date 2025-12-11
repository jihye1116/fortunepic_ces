import { cn } from "@sglara/cn";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useSetAtom } from "jotai";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { NavigationBar } from "@/components/NavigationBar";
import { SecondaryButton } from "@/components/SecondaryButton";
import { Title } from "@/components/Title";
import { fortuneSubjectAtom } from "@/store/atoms";

export const Route = createFileRoute("/topic")({
  component: TopicPage,
});

interface TopicItem {
  id: string;
  label: string;
  icon: string;
  color: "blue" | "red" | "yellow";
}

function TopicPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const setTopicAtom = useSetAtom(fortuneSubjectAtom);

  const topics: TopicItem[] = [
    {
      id: "todayFortune",
      label: t("topic.topics.todayFortune"),
      icon: "🌙",
      color: "blue",
    },
    {
      id: "lifetimeFortune",
      label: t("topic.topics.lifetimeFortune"),
      icon: "♾️",
      color: "blue",
    },
    {
      id: "myZodiacAnimal",
      label: t("topic.topics.myZodiacAnimal"),
      icon: "🐉",
      color: "red",
    },
    {
      id: "koreanTalisman",
      label: t("topic.topics.koreanTalisman"),
      icon: "🏮",
      color: "red",
    },
    {
      id: "fiveElementsAnalysis",
      label: t("topic.topics.fiveElementsAnalysis"),
      icon: "☯️",
      color: "red",
    },
    {
      id: "dateSpecificReading",
      label: t("topic.topics.dateSpecificReading"),
      icon: "📅",
      color: "yellow",
    },
    {
      id: "newYearFortune",
      label: t("topic.topics.newYearFortune"),
      icon: "🎊",
      color: "yellow",
    },
  ];

  const getColorClasses = (
    color: "blue" | "red" | "yellow",
    isSelected: boolean,
  ) => {
    if (isSelected) {
      switch (color) {
        case "blue":
          return "bg-[#5b72b7]";
        case "red":
          return "bg-[#ed474a]";
        case "yellow":
          return "bg-[#f6e24a]";
      }
    }

    switch (color) {
      case "blue":
        return "bg-[#5b72b7]/60";
      case "red":
        return "bg-[#ed474a]/60";
      case "yellow":
        return "bg-[#f6e24a]/60";
    }
  };

  const handleNext = () => {
    setTopicAtom(selectedTopic!);

    if (selectedTopic === "dateSpecificReading") {
      router.navigate({ to: "/date" });
    }

    if (selectedTopic === "koreanTalisman") {
      router.navigate({ to: "/talisman-theme" });
    }
  };

  return (
    <main className="min-h-dvh">
      <NavigationBar />

      <Title text={t("topic.title")} />

      {/* Topic Buttons - 3 rows */}
      <div className="flex flex-1 flex-col items-center justify-center gap-0 px-0 py-15">
        {/* Row 1 - 2 items (blue) */}
        <div className="-mb-8 flex items-center justify-center gap-0">
          {topics.slice(0, 2).map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic.id)}
              className={cn(
                "relative flex items-center justify-center gap-2.5 p-2 transition-all duration-300",
                selectedTopic && selectedTopic !== topic.id && "opacity-50",
              )}
            >
              <div
                className={cn(
                  "flex h-75 w-75 flex-col items-center justify-center rounded-[9.375rem] px-10 py-25 transition-all duration-300",
                  getColorClasses(topic.color, selectedTopic === topic.id),
                )}
              >
                <div className="text-center text-[2rem] leading-[1.3] font-medium tracking-[-0.054rem] whitespace-pre text-[#171719]">
                  {topic.label}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Row 2 - 3 items (red) */}
        <div className="-mb-8 flex items-center justify-center gap-0">
          {topics.slice(2, 5).map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic.id)}
              className={cn(
                "relative flex items-center justify-center gap-2.5 p-2 transition-all duration-300",
                selectedTopic && selectedTopic !== topic.id && "opacity-50",
              )}
            >
              <div
                className={cn(
                  "flex h-75 w-75 flex-col items-center justify-center rounded-[9.375rem] px-10 py-25 transition-all duration-300",
                  getColorClasses(topic.color, selectedTopic === topic.id),
                )}
              >
                <div className="text-center text-[2rem] leading-[1.3] font-medium tracking-[-0.054rem] whitespace-pre text-[#171719]">
                  {topic.label}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Row 3 - 2 items (yellow) */}
        <div className="-mb-8 flex items-center justify-center gap-0">
          {topics.slice(5, 7).map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic.id)}
              className={cn(
                "relative flex items-center justify-center gap-2.5 p-2 transition-all duration-300",
                selectedTopic && selectedTopic !== topic.id && "opacity-50",
              )}
            >
              <div
                className={cn(
                  "flex h-75 w-75 flex-col items-center justify-center rounded-[9.375rem] px-10 py-25 transition-all duration-300",
                  getColorClasses(topic.color, selectedTopic === topic.id),
                )}
              >
                <div className="text-center text-[2rem] leading-[1.3] font-medium tracking-[-0.054rem] whitespace-pre text-[#171719]">
                  {topic.label}
                </div>
              </div>
            </button>
          ))}
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
