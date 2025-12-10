import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { NavigationBar } from "@/components/NavigationBar";
import { SelectionButtons } from "@/components/SelectionButtons";

export const Route = createFileRoute("/language")({
  component: Language,
});

const languages = [
  { id: "en", label: "English" },
  { id: "es", label: "Español" },
  { id: "ko", label: "한국어" },
  { id: "cn", label: "中文" },
];

function Language() {
  const { t, i18n } = useTranslation();

  const handleLanguageSelect = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <main className="flex h-dvh flex-col">
      <NavigationBar />
      <div className="flex flex-col gap-3 px-20 py-10">
        <h1 className="gradient-text text-[3.5rem] leading-[130%] font-medium tracking-[-0.07rem]">
          {t("language.title")}
        </h1>
      </div>
      <div className="flex flex-col gap-6 px-20 py-12">
        <SelectionButtons options={languages} onSelect={handleLanguageSelect} />
      </div>
    </main>
  );
}
