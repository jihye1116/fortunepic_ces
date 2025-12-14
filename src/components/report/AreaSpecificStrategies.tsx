import { useTranslation } from "react-i18next";

import { LifetimeReportData } from "@/types/report";

import { CardCarousel } from "./CardCarousel";

interface AreaSpecificStrategiesProps {
  areaStrategies: LifetimeReportData["areaStrategies"];
}

export function AreaSpecificStrategies({
  areaStrategies,
}: AreaSpecificStrategiesProps) {
  const { t } = useTranslation();

  const areaImages: Record<string, string> = {
    career:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=60",
    health:
      "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&auto=format&fit=crop&q=60",
    wealth:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop&q=60",
    relationship:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=60",
  };

  const items = areaStrategies.map((strategy) => {
    const styles = {
      career: { bg: "#324EA5", text: "#DBDCDF" },
      health: { bg: "#2C925E", text: "#212225" },
      wealth: { bg: "#F6E24A", text: "#212225" },
      relationship: { bg: "#F16C6E", text: "#212225" },
    }[strategy.area] || { bg: strategy.bgColor, text: "#171719" };

    return {
      id: strategy.area,
      imageUrl: areaImages[strategy.area],
      chipText: t(`report.strategies.${strategy.area}`, {
        defaultValue: strategy.title,
      }),
      chipStyle: {
        backgroundColor: styles.bg,
        color: styles.text,
      },
      description: strategy.description,
    };
  });

  return (
    <CardCarousel
      title={t("report.sections.areaSpecificStrategies")}
      items={items}
      cardWidth="w-[305px]"
    />
  );
}
