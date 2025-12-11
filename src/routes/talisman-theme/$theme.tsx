import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { NavigationBar } from "@/components/NavigationBar";
import { SelectionButtons } from "@/components/SelectionButtons";
import { Title } from "@/components/Title";

export const Route = createFileRoute("/talisman-theme/$theme")({
  component: RouteComponent,
});

interface ThemeOption {
  id: string;
  label: string;
}

interface ThemeConfig {
  title: string;
  subtitle: string;
  options: ThemeOption[];
}

function RouteComponent() {
  const { theme } = Route.useParams();
  const { t } = useTranslation();
  const router = useRouter();

  const THEME_DATA: Record<string, ThemeConfig> = {
    happiness: {
      title: t("talisman.happiness.title"),
      subtitle: t("talisman.happiness.subtitle"),
      options: [
        {
          id: "overall-success",
          label: t("talisman.happiness.overallSuccess"),
        },
        {
          id: "goal-achievement",
          label: t("talisman.happiness.goalAchievement"),
        },
        {
          id: "mental-peace",
          label: t("talisman.happiness.mentalPeace"),
        },
        {
          id: "divine-protection",
          label: t("talisman.happiness.divineProtection"),
        },
      ],
    },
    wealth: {
      title: t("talisman.wealth.title"),
      subtitle: t("talisman.wealth.subtitle"),
      options: [
        {
          id: "fortune-boost",
          label: t("talisman.wealth.fortuneBoost"),
        },
        {
          id: "money-attraction",
          label: t("talisman.wealth.moneyAttraction"),
        },
        {
          id: "windfall-wish",
          label: t("talisman.wealth.windfallWish"),
        },
        {
          id: "great-luck-flow",
          label: t("talisman.wealth.greatLuckFlow"),
        },
      ],
    },
    career: {
      title: t("talisman.career.title"),
      subtitle: t("talisman.career.subtitle"),
      options: [
        {
          id: "legal-trouble-solve",
          label: t("talisman.career.legalTroubleSolve"),
        },
        {
          id: "gossip-prevention",
          label: t("talisman.career.gossipPrevention"),
        },
        {
          id: "promotion-wish",
          label: t("talisman.career.promotionWish"),
        },
        {
          id: "job-success",
          label: t("talisman.career.jobSuccess"),
        },
      ],
    },
    love: {
      title: t("talisman.love.title"),
      subtitle: t("talisman.love.subtitle"),
      options: [
        {
          id: "couple-harmony",
          label: t("talisman.love.coupleHarmony"),
        },
        {
          id: "relationship-repair",
          label: t("talisman.love.relationshipRepair"),
        },
        {
          id: "relationship-call",
          label: t("talisman.love.relationshipCall"),
        },
        {
          id: "marital-peace",
          label: t("talisman.love.maritalPeace"),
        },
      ],
    },
    family: {
      title: t("talisman.family.title"),
      subtitle: t("talisman.family.subtitle"),
      options: [
        {
          id: "family-harmony",
          label: t("talisman.family.familyHarmony"),
        },
        {
          id: "moving-safety",
          label: t("talisman.family.movingSafety"),
        },
        {
          id: "home-peace",
          label: t("talisman.family.homePeace"),
        },
        {
          id: "fetal-protection",
          label: t("talisman.family.fetalProtection"),
        },
      ],
    },
    health: {
      title: t("talisman.health.title"),
      subtitle: t("talisman.health.subtitle"),
      options: [
        {
          id: "disease-healing",
          label: t("talisman.health.diseaseHealing"),
        },
        {
          id: "illness-repel",
          label: t("talisman.health.illnessRepel"),
        },
        {
          id: "accident-prevention",
          label: t("talisman.health.accidentPrevention"),
        },
        {
          id: "long-life-health",
          label: t("talisman.health.longLifeHealth"),
        },
      ],
    },
    business: {
      title: t("talisman.business.title"),
      subtitle: t("talisman.business.subtitle"),
      options: [
        {
          id: "business-prosperity",
          label: t("talisman.business.businessProsperity"),
        },
        {
          id: "sales-success",
          label: t("talisman.business.salesSuccess"),
        },
        {
          id: "sales-activation",
          label: t("talisman.business.salesActivation"),
        },
        {
          id: "investment-success",
          label: t("talisman.business.investmentSuccess"),
        },
      ],
    },
  };

  const themeConfig = THEME_DATA[theme];

  if (!themeConfig) {
    return (
      <div className="flex h-dvh items-center justify-center text-4xl text-white">
        Theme not found
      </div>
    );
  }

  return (
    <div className="h-dvh">
      <NavigationBar />

      <Title text={themeConfig.title} subtext={themeConfig.subtitle} />

      <div className="flex w-full flex-col px-20 py-12">
        <SelectionButtons
          options={themeConfig.options}
          onSelect={() => router.navigate({ to: "/information" })}
          showIcon
        />
      </div>
    </div>
  );
}
