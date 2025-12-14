/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TFunction } from "i18next";

import { Pillar } from "@/types/report";

/**
 * API에서 받은 사주 기둥(pillars) 데이터를 공통 Pillar 타입으로 변환합니다.
 * @param apiPillars API에서 받은 { year, month, day, hour } 객체
 * @param t i18next translation function
 * @returns Pillar[]
 */
export function mapApiToPillars(apiPillars: any, t: TFunction): Pillar[] {
  const order = [
    { key: "year", name: t("report.pillars.year"), color: "#5B72B7" },
    { key: "month", name: t("report.pillars.month"), color: "#F6E24A" },
    { key: "day", name: t("report.pillars.day"), color: "#2C925E" },
    { key: "hour", name: t("report.pillars.hour"), color: "#E16B8C" },
  ];
  return order.map(({ key, name, color }) => {
    const p = apiPillars[key];
    return {
      name,
      color,
      keywords: [
        { text: p.stem },
        { text: p.tenGodsStem },
        { text: p.branch },
        { text: p.tenGodsBranch },
        { text: p.twelveStage },
      ],
    };
  });
}
