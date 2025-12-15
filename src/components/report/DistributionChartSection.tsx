/* eslint-disable @typescript-eslint/no-explicit-any */
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface DistributionChartItem {
  label: string;
  value: number;
  icon: string | React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

interface DistributionChartSectionProps {
  title: string;
  items: DistributionChartItem[];
}

const COLORS: { [key: string]: string } = {
  Wood: "#2C925E", // Green
  Fire: "#ED474A", // Red
  Earth: "#F6E24A", // Yellow
  Metal: "#CACACA", // Gray
  Water: "#5B72B7", // Blue
};

export function DistributionChartSection({
  title,
  items,
}: DistributionChartSectionProps) {
  // Use label for color mapping, displayLabel for UI
  const chartData = items.map((item) => ({
    name: item.label,
    value: item.value,
    icon: item.icon,
    displayLabel: (item as any).displayLabel || item.label,
  }));

  return (
    <section className="flex flex-col gap-6 rounded-2xl bg-[#171719] p-[28px_20px]">
      {/* Title */}
      <h2 className="text-[18px] leading-[1.44] font-semibold tracking-[-0.2%] text-[#878A93]">
        {title}
      </h2>

      {/* Contents */}
      <div className="flex flex-col items-center gap-8">
        {/* Doughnut Chart */}
        <div className="relative h-[180px] w-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={80}
                dataKey="value"
                cornerRadius={8}
                paddingAngle={-5}
              >
                {chartData.map((entry) => (
                  <Cell
                    key={`cell-${entry.name}`}
                    fill={COLORS[entry.name]}
                    stroke="none"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* List / Legend */}
        <div className="flex w-full flex-col items-center gap-3">
          {items.map((item, index) => {
            const displayLabel = (item as any).displayLabel || item.label;
            return (
              <div key={item.label} className="w-full">
                {/* List Item */}
                <div className="flex w-full items-center justify-between gap-3">
                  {/* Left: Icon + Label */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center">
                      {typeof item.icon === "string" ? (
                        <img
                          src={item.icon}
                          alt={"icon"}
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <item.icon className="h-full w-full" />
                      )}
                    </div>
                    <div className="flex h-8 items-center">
                      <span className="text-[15px] leading-[1.46] font-medium tracking-[0.5%] text-[#E1E2E4]">
                        {displayLabel}
                      </span>
                    </div>
                  </div>

                  {/* Right: Value */}
                  <div className="flex items-center">
                    <span className="text-[18px] leading-[1.44] font-medium tracking-[-0.2%] text-[#E1E2E4]">
                      {item.value}
                    </span>
                    <span className="text-[16px] leading-normal font-semibold tracking-[0.5%] text-[#C2C4C8]">
                      %
                    </span>
                  </div>
                </div>

                {/* Divider */}
                {index < items.length - 1 && (
                  <div className="mt-3 h-0.5 w-full bg-[#212225]" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
