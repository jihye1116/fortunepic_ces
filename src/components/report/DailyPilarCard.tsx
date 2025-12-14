import { cn } from "@sglara/cn";
import { useTranslation } from "react-i18next";

import businessImg from "@/assets/images/themes/business.png";
import careerImg from "@/assets/images/themes/career.png";
import familyImg from "@/assets/images/themes/family.png";
import happinessImg from "@/assets/images/themes/happiness.png";
import healthImg from "@/assets/images/themes/health.png";

interface DailyPilarCardProps {
  nickname?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function DailyPilarCard({ nickname: _ }: DailyPilarCardProps) {
  const { t } = useTranslation();

  const animals = [
    {
      key: "sheep",
      size: "w-32 h-32",
      position: "left-[25%] top-[25%]",
      img: familyImg,
    },
    {
      key: "dog",
      size: "w-24 h-24",
      position: "left-[55%] top-[15%]",
      img: businessImg,
    },
    {
      key: "monkey",
      size: "w-24 h-24",
      position: "left-[65%] top-[40%]",
      img: careerImg,
    },
    {
      key: "pig",
      size: "w-20 h-20",
      position: "left-[55%] top-[65%]",
      img: happinessImg,
    },
    {
      key: "ox",
      size: "w-20 h-20",
      position: "left-[35%] top-[65%]",
      img: healthImg,
    },
  ];

  return (
    <section className="rounded-2xl bg-[#171719] p-[28px_20px] space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <h2 className="text-[18px] font-semibold text-[#878A93]">
          {t("report.sections.nearDailyPilarAnimal")}
        </h2>
      </div>

      {/* Content: Clustered Animals */}
      <div className="relative h-[300px] w-full">
        {animals.map((animal) => {
          const label = t(`animals.${animal.key}`);
          return (
            <div
              key={label}
              className={cn(
                "absolute overflow-hidden rounded-full border border-white/10",
                animal.size,
                animal.position,
              )}
            >
              <img
                src={animal.img}
                alt={label}
                className="h-full w-full object-cover grayscale opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[15px] font-medium text-white drop-shadow-md">
                  {label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
