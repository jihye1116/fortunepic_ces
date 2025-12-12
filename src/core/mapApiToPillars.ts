/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pillar } from "@/types/report";

/**
 * API에서 받은 사주 기둥(pillars) 데이터를 공통 Pillar 타입으로 변환합니다.
 * @param apiPillars API에서 받은 { year, month, day, hour } 객체
 * @returns Pillar[]
 */
export function mapApiToPillars(apiPillars: any): Pillar[] {
  const order = [
    { key: "year", name: "Year Pillar", color: "#5B72B7" },
    { key: "month", name: "Month Pillar", color: "#F6E24A" },
    { key: "day", name: "Day Pillar", color: "#2C925E" },
    { key: "hour", name: "Hour Pillar", color: "#E16B8C" },
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
