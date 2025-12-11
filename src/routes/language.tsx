import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { NavigationBar } from "@/components/NavigationBar";
import { SelectionButtons } from "@/components/SelectionButtons";
import { Title } from "@/components/Title";

export const Route = createFileRoute("/language")({
  component: LanguagePage,
});

const languages = [
  { id: "en", label: "English" },
  { id: "es", label: "Español" },
  { id: "ko", label: "한국어" },
  { id: "cn", label: "中文" },
];

function LanguagePage() {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const handleLanguageSelect = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    router.navigate({ to: "/topic" });
  };

  return (
    <main className="flex h-dvh flex-col">
      <NavigationBar />

      <Title text={t("language.title")} />

      <div className="flex flex-col gap-6 px-20 py-12">
        <SelectionButtons options={languages} onSelect={handleLanguageSelect} />
      </div>
    </main>
  );
}
