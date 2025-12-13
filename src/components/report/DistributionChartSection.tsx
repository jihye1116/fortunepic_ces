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
  Wood: '#2C925E', // Green
  Fire: '#ED474A', // Red
  Earth: '#F6E24A', // Yellow
  Metal: '#CACACA', // Gray
  Water: '#5B72B7', // Blue
};

export function DistributionChartSection({
  title,
  items,
}: DistributionChartSectionProps) {
  const chartData = items.map((item) => ({
    name: item.label,
    value: item.value,
    icon: item.icon, // We won't use this directly in Recharts default tooltip/legend, but it's here if needed
  }));

  return (
    <section className="rounded-2xl bg-[#171719] p-[28px_20px] flex flex-col gap-6">
      {/* Title */}
      <h2 className="text-[18px] font-semibold text-[#878A93] leading-[1.44] tracking-[-0.2%]">
        {title}
      </h2>

      {/* Contents */}
      <div className="flex flex-col items-center gap-8">
        {/* Doughnut Chart */}
        <div className="w-[180px] h-[180px] relative">
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
                  <Cell key={`cell-${entry.name}`} fill={COLORS[entry.name]} stroke="none" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          
        </div>

        {/* List / Legend */}
        <div className="w-full flex flex-col items-center gap-3">
          {items.map((item, index) => (
            <div key={item.label} className="w-full">
              {/* List Item */}
              <div className="w-full flex items-center justify-between gap-3">
                {/* Left: Icon + Label */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center">
                    {typeof item.icon === "string" ? (
                      <img 
                        src={item.icon} 
                        alt={item.label} 
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <item.icon className="w-full h-full" />
                    )}
                  </div>
                  <div className="h-8 flex items-center">
                    <span className="text-[15px] font-medium leading-[1.46] tracking-[0.5%] text-[#E1E2E4]">
                      {item.label}
                    </span>
                  </div>
                </div>

                {/* Right: Value */}
                <div className="flex items-center">
                  <span className="text-[18px] font-medium leading-[1.44] tracking-[-0.2%] text-[#E1E2E4]">
                    {item.value}
                  </span>
                  <span className="text-[16px] font-semibold leading-normal tracking-[0.5%] text-[#C2C4C8]">
                    %
                  </span>
                </div>
              </div>

              {/* Divider */}
              {index < items.length - 1 && (
                <div className="w-full h-0.5 bg-[#212225] mt-3" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}