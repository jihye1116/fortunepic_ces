import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useSetAtom } from "jotai";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { NavigationBar } from "@/components/NavigationBar";
import { SecondaryButton } from "@/components/SecondaryButton";
import { Title } from "@/components/Title";
import { TopicSelector } from "@/components/TopicSelector";
import { backgroundOpacityAtom, topicAtom } from "@/store/atoms";

export const Route = createFileRoute("/topic")({
  component: TopicPage,
});

function TopicPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const setTopicAtom = useSetAtom(topicAtom);
  const setBackgroundOpacity = useSetAtom(backgroundOpacityAtom);

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

      <TopicSelector
        selectedTopic={selectedTopic}
        onTopicSelect={setSelectedTopic}
      />

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
