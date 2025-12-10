import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { NavigationBar } from "@/components/NavigationBar";
import { SelectionButtons } from "@/components/SelectionButtons";

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
      <div className="flex flex-col gap-3 px-20 py-10">
        <h1 className="gradient-text h-[calc(3.5rem*1.3*2)] text-[3.5rem] leading-[1.3] font-medium tracking-[-0.07rem]">
          {t("language.title")}
        </h1>
      </div>
      <div className="flex flex-col gap-6 px-20 py-12">
        <SelectionButtons options={languages} onSelect={handleLanguageSelect} />
      </div>
    </main>
  );
}
