import { useTranslation } from "react-i18next";

import dogImg from "@/assets/images/report/animals/dog.png";
import dragonImg from "@/assets/images/report/animals/dragon.png";
import horseImg from "@/assets/images/report/animals/horse.png";
import monkeyImg from "@/assets/images/report/animals/monkey.png";
import oxImg from "@/assets/images/report/animals/ox.png";
import pigImg from "@/assets/images/report/animals/pig.png";
import rabbitImg from "@/assets/images/report/animals/rabbit.png";
import ratImg from "@/assets/images/report/animals/rat.png";
import roosterImg from "@/assets/images/report/animals/rooster.png";
import sheepImg from "@/assets/images/report/animals/sheep.png";
import snakeImg from "@/assets/images/report/animals/snake.png";
import tigerImg from "@/assets/images/report/animals/tiger.png";
const animalImageMap: Record<string, string> = {
  Rat: ratImg,
  Ox: oxImg,
  Tiger: tigerImg,
  Rabbit: rabbitImg,
  Dragon: dragonImg,
  Snake: snakeImg,
  Horse: horseImg,
  Sheep: sheepImg,
  Monkey: monkeyImg,
  Rooster: roosterImg,
  Dog: dogImg,
  Pig: pigImg,
};


interface DailyAnimalCardProps {
  nickname: string;
  animal?: string;
  description?: string;
}

// Helper: capitalize first letter, lowercase the rest
function formatAnimalName(animal?: string) {
  if (!animal) return undefined;
  const lower = animal.toLowerCase();
  switch (lower) {
    case "rat": return "Rat";
    case "ox": return "Ox";
    case "tiger": return "Tiger";
    case "rabbit": return "Rabbit";
    case "dragon": return "Dragon";
    case "snake": return "Snake";
    case "horse": return "Horse";
    case "sheep": return "Sheep";
    case "monkey": return "Monkey";
    case "rooster": return "Rooster";
    case "dog": return "Dog";
    case "pig": return "Pig";
    default:
      return animal.charAt(0).toUpperCase() + animal.slice(1).toLowerCase();
  }
}

export function DailyAnimalCard({
  nickname,
  animal,
  description,
}: DailyAnimalCardProps) {
  const { t } = useTranslation();

  console.log("DailyAnimalCard Rendered with animal:", animal);

  return (
    <section className="rounded-2xl bg-linear-to-b from-black/20 to-[#171719] p-[28px_20px] space-y-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] relative">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-0">
          <h2 className="text-[18px] font-medium text-[#878A93]">
            {t("report.dailyAnimalCard.title", { nickname })}
          </h2>
        </div>
      </div>

      <div className="relative w-40 h-40 bg-black/40 rounded-xl border border-white/5 flex items-center justify-center mx-auto">
        {/* Animal image if available */}
        {(() => {
          const formatted = formatAnimalName(animal);
          const imgSrc = formatted && animalImageMap[formatted];
          if (!imgSrc) return null;
          return (
            <>
              <img
                id="animal-image"
                src={imgSrc}
                alt={formatted}
                className="w-32 h-32 object-contain rounded-full"
              />
              <a
                href={imgSrc}
                download={`${formatted}.png`}
                className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                title={t("report.dailyAnimalCard.downloadImage", { animal: formatted })}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 16L12 4"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M8 12L12 16L16 12"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 20H20"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </a>
            </>
          );
        })()}
      </div>
      <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#1E2F63] text-[22px] font-bold text-center">
        {formatAnimalName(animal) || t("report.dailyAnimalCard.defaultAnimal")}
      </h2>
      <div className="text-[14px] leading-[1.57] text-[#AEB0B6] whitespace-pre-line text-center">
        {description || t("report.dailyAnimalCard.defaultDescription")}
      </div>
    </section>
  );
}
