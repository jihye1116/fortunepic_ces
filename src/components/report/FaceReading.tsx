import { useRef, useState } from "react";

import cheekbonesIcon from "@/assets/icons/face-reading/cheekbones.svg?url";
import cheeksIcon from "@/assets/icons/face-reading/cheeks.svg?url";
import chinIcon from "@/assets/icons/face-reading/chin.svg?url";
import eyebrowsIcon from "@/assets/icons/face-reading/eyebrows.svg?url";
import eyesIcon from "@/assets/icons/face-reading/eyes.svg?url";
import faceMain from "@/assets/icons/face-reading/face-main.png";
import foreheadIcon from "@/assets/icons/face-reading/forehead.svg?url";
import mouthIcon from "@/assets/icons/face-reading/mouth.svg?url";
import noseIcon from "@/assets/icons/face-reading/nose.svg?url";
import { LifetimeReportData } from "@/types/report";

interface FaceReadingProps {
  faceReadingAreas: LifetimeReportData["faceReadingAreas"];
}

export function FaceReading({ faceReadingAreas }: FaceReadingProps) {
  const faceReadingScrollRef = useRef<HTMLDivElement>(null);
  const [faceReadingIndex, setFaceReadingIndex] = useState(0);
  const [isFaceReadingDragging, setIsFaceReadingDragging] = useState(false);
  const [faceReadingStartX, setFaceReadingStartX] = useState(0);
  const [faceReadingStartScrollLeft, setFaceReadingStartScrollLeft] = useState(0);

  const handleFaceReadingScroll = () => {
    if (faceReadingScrollRef.current) {
      const { scrollLeft } = faceReadingScrollRef.current;
      const index = Math.round(scrollLeft / 316); // 300px width + 16px gap
      setFaceReadingIndex(index);
    }
  };

  const onFaceReadingMouseDown = (e: React.MouseEvent) => {
    if (!faceReadingScrollRef.current) return;
    setIsFaceReadingDragging(true);
    setFaceReadingStartX(e.pageX - faceReadingScrollRef.current.offsetLeft);
    setFaceReadingStartScrollLeft(faceReadingScrollRef.current.scrollLeft);
  };

  const onFaceReadingMouseLeave = () => {
    setIsFaceReadingDragging(false);
  };

  const onFaceReadingMouseUp = () => {
    setIsFaceReadingDragging(false);
  };

  const onFaceReadingMouseMove = (e: React.MouseEvent) => {
    if (!isFaceReadingDragging || !faceReadingScrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - faceReadingScrollRef.current.offsetLeft;
    const walk = (x - faceReadingStartX) * 1.5;
    faceReadingScrollRef.current.scrollLeft = faceReadingStartScrollLeft - walk;
  };

  const scrollToFaceReadingPage = (index: number) => {
    if (faceReadingScrollRef.current) {
      faceReadingScrollRef.current.scrollTo({
        left: index * 316,
        behavior: "smooth",
      });
      setFaceReadingIndex(index);
    }
  };

  const faceIcons: Record<string, string> = {
    "Forehead": foreheadIcon,
    "Eyes": eyesIcon,
    "Area between the Eyebrows": eyebrowsIcon,
    "Cheekbones": cheekbonesIcon,
    "Nose": noseIcon,
    "Cheeks": cheeksIcon,
    "Mouth": mouthIcon,
    "Chin": chinIcon,
  };

  // Group face reading areas into pairs
  const faceReadingPairs = [];
  for (let i = 0; i < faceReadingAreas.length; i += 2) {
    faceReadingPairs.push(faceReadingAreas.slice(i, i + 2));
  }

  return (
    <section className="rounded-2xl bg-[#171719] p-[28px_20px] space-y-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
      <h2 className="text-[18px] font-medium text-[#878A93]">Face Reading</h2>

      <div className="flex flex-col items-center gap-8">
        <div className="w-full rounded-[12px] overflow-hidden">
          <img
            src={faceMain}
            alt="Face Reading"
            className="w-full h-[226px] object-cover"
          />
        </div>

        <div className="w-full relative">
          <div
            ref={faceReadingScrollRef}
            onScroll={handleFaceReadingScroll}
            onMouseDown={onFaceReadingMouseDown}
            onMouseLeave={onFaceReadingMouseLeave}
            onMouseUp={onFaceReadingMouseUp}
            onMouseMove={onFaceReadingMouseMove}
            className={`flex gap-4 overflow-x-auto no-scrollbar pb-4 cursor-grab ${
              isFaceReadingDragging
                ? "cursor-grabbing select-none"
                : "snap-x snap-mandatory"
            }`}
          >
            {faceReadingPairs.map((pair, index) => (
              <div
                key={index}
                className="shrink-0 snap-start w-[300px] flex flex-col gap-6"
              >
                {pair.map((area) => (
                  <div key={area.area} className="flex gap-2.5 items-start">
                    <div className="shrink-0 h-8 w-8 rounded-full bg-[#8495C9] flex items-center justify-center ">
                      <img
                        src={faceIcons[area.area]}
                        alt={area.area}
                        className="w-full h-full"
                      />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-[15px] font-medium text-[#E1E2E4]">
                        {area.area}
                      </h4>
                      <p className="text-[14px] leading-[1.57] text-[#AEB0B6]">
                        {area.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-1.5 mt-6">
            {faceReadingPairs.map((_, idx) => (
              <div
                key={idx}
                onClick={() => scrollToFaceReadingPage(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ease-in-out cursor-pointer ${
                  idx === faceReadingIndex
                    ? "w-[26px] bg-[#DBDCDF]"
                    : "w-1.5 bg-[#5A5C63]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
