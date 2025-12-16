


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

// Helper: capitalize first letter, lowercase the rest
function formatAnimalName(animal?: string) {
  if (!animal) return undefined;
  return animal.charAt(0).toUpperCase() + animal.slice(1).toLowerCase();
}


interface DailyPilarCardProps {
  animal?: string;
  selected?: boolean;
}

export function DailyPilarCard({
  animal = "Rat",
}: DailyPilarCardProps) {
  const formattedAnimal = formatAnimalName(animal);
  const animals = [
    "Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake",
    "Horse", "Sheep", "Monkey", "Rooster", "Dog", "Pig"
  ];

  return (
    
    <div>
      <h2 className="text-[18px] font-semibold text-[#878A93] mb-6">
        {formattedAnimal} Analysis
      </h2>
    
    <div className="grid grid-cols-5 gap-y-4 gap-x-2 w-full px-20">
      {animals.map((ani) => {
        const selected = ani === formattedAnimal;
        return (
          <div
            key={ani}
            className={
              `flex flex-col items-center w-12` +
              (selected ? " font-medium" : " font-normal")
            }
          >
            <div
              className={
                `rounded-full flex items-center justify-center` +
                (selected
                  ? " border-[#AEB0B6] border-2"
                  : "")
              }
              style={{ width: 48, height: 48, padding: selected ? 2 : 0 }}
            >
              <img
                className="flex items-center justify-center rounded-full"
                src={animalImageMap[ani]}
                alt={ani}
                style={{ width: 44, height: 44, objectFit: "cover" }}
              />
            </div>
            <div
              className={
                `mt-2 text-[14px]` +
                (selected
                  ? " text-[#C2C4C8] font-medium text-center"
                  : " text-[#70737C] font-normal text-center")
              }
            >
              {ani}
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );
}
