import "../global.css";

import cheekbonesIcon from "@/assets/icons/face-reading/cheekbones.svg?url";
import cheeksIcon from "@/assets/icons/face-reading/cheeks.svg?url";
import chinIcon from "@/assets/icons/face-reading/chin.svg?url";
import eyebrowsIcon from "@/assets/icons/face-reading/eyebrows.svg?url";
import eyesIcon from "@/assets/icons/face-reading/eyes.svg?url";
import faceMain from "@/assets/icons/face-reading/face-main.png";
import foreheadIcon from "@/assets/icons/face-reading/forehead.svg?url";
import mouthIcon from "@/assets/icons/face-reading/mouth.svg?url";
import noseIcon from "@/assets/icons/face-reading/nose.svg?url";
import contactUsIcon from "@/assets/icons/report/contact-us.svg?url";
import writeReviewIcon from "@/assets/icons/report/write-review.svg?url";
import reportBanner from "@/assets/images/report/report-banner.png";
import { dummyReportData } from "@/data/reportDummy";

type ChevronDirection = "right" | "down" | "left" | "up";

function ChevronIcon({
  className,
  direction = "right",
}: {
  className?: string;
  direction?: ChevronDirection;
}) {
  const rotation =
    direction === "down"
      ? "rotate-90"
      : direction === "left"
        ? "rotate-180"
        : direction === "up"
          ? "-rotate-90"
          : "";

  return (
    <svg
      className={`${className ?? ""} ${rotation} transition-transform`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 6l6 6-6 6"
      />
    </svg>
  );
}

export function LifetimeReportPage() {
  const data = dummyReportData;

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

  const areaImages: Record<string, string> = {
    career: "/src/assets/images/report/career-2f9ea5.png",
    health: "/src/assets/images/report/health.png",
    wealth: "/src/assets/images/report/wealth.png",
    relationship: "/src/assets/images/report/relationship.png",
  };

  return (
    <div className="relative min-h-screen bg-[#141415] text-[#DBDCDF] overflow-hidden">
      <main className="relative z-10 max-w-screen-sm mx-auto pb-14">
        <div className="relative">
          <img
            src={reportBanner}
            alt="Report Banner"
            className="w-full h-[370px] object-cover"
          />
          {/* Header */}
          <header className="absolute bottom-0 left-0 right-0 pb-6 px-4 space-y-3">
            <div className="rounded-2xl bg-black/30 backdrop-blur-xl p-4 flex items-center justify-between shadow-[0_16px_50px_rgba(0,0,0,0.25)]">
              <div className="space-y-1">
                <p className="text-xs text-[#878A93]">Source of Insight</p>
                <p className="text-sm font-medium text-[#E1E2E4]">
                  {data.sourceOfInsight}
                </p>
              </div>
              <ChevronIcon className="w-5 h-5 text-white/70" direction="right" />
            </div>
          </header>
        </div>

        <div className="px-4 space-y-8">

        {/* Basic Energy Interpretation */}
        <section className="rounded-2xl bg-linear-to-b from-black/20 to-[#171719] p-[28px_20px] space-y-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <div className="space-y-0">
            <div className="flex items-center gap-1">
              <span className="text-[18px] font-medium text-[#878A93]">
                {data.nickname}
              </span>
              <span className="text-[18px] font-medium text-[#878A93]">'s</span>
            </div>
            <h2 className="text-[18px] font-medium text-[#878A93]">
              Basic Energy Interpretation
            </h2>
          </div>

          <div className="relative">
            {/* Scroll Fade Right */}
            <div className="pointer-events-none absolute right-0 top-0 h-full w-[71px] bg-linear-to-l from-[#171719] to-transparent z-10" />

            <div className="flex gap-[56px] overflow-x-auto no-scrollbar pb-4 snap-x snap-mandatory px-1">
              {data.pillars.map((pillar) => (
                <div
                  key={pillar.name}
                  className="shrink-0 flex flex-col gap-3"
                >
                  <h3 className="text-[16px] font-medium text-[#E1E2E4]">
                    {pillar.name}
                  </h3>
                  <div className="flex flex-col gap-2 items-start">
                    {pillar.keywords.map((keyword) => (
                      <span
                        key={keyword.text}
                        className="px-3 py-[6px] rounded-[28px] text-[13px] text-black/70 flex justify-center items-center whitespace-nowrap"
                        style={{ backgroundColor: pillar.color }}
                      >
                        {keyword.text}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Face Reading */}
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
              <div className="grid grid-cols-[repeat(4,minmax(280px,1fr))] grid-rows-2 grid-flow-col gap-x-4 gap-y-6 overflow-x-auto pb-4 no-scrollbar">
                {data.faceReadingAreas.map((area) => (
                  <div
                    key={area.area}
                    className="flex gap-3 items-start"
                  >
                    <div className="shrink-0 h-8 w-8 rounded-full bg-[#8495C9] flex items-center justify-center ">
                      <img src={faceIcons[area.area]} alt={area.area} className="w-full h-full" />
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
              
              {/* Pagination Dots (Visual Only) */}
              <div className="flex justify-center gap-1.5 mt-6">
                {data.faceReadingAreas.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === 0 ? "w-[26px] bg-[#DBDCDF]" : "w-1.5 bg-[#5A5C63]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Life Phase Flow */}
        <section className="rounded-2xl bg-[#171719] p-6 space-y-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <h2 className="text-[18px] font-semibold text-[#878A93]">Life Phase Flow</h2>

          <div className="relative h-[560px] overflow-hidden">
            <div className="space-y-8">
              {data.lifePhases.map((phase, idx) => (
                <div key={phase.phase} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center h-[34px] shrink-0">
                      <div className="relative flex items-center justify-center w-3.5 h-3.5">
                        <div className="absolute w-3.5 h-3.5 rounded-full bg-[#8495C9]" />
                        <div className="absolute w-2 h-2 rounded-full bg-[#324EA5]" />
                      </div>
                    </div>
                    {idx < data.lifePhases.length - 1 && (
                      <div className="w-0.5 flex-1 bg-[#324EA5]/30 mt-4" />
                    )}
                  </div>
                  <div className="flex-1 space-y-3 pb-8">
                    <div className="inline-flex items-center gap-2 rounded-xl bg-[#292A2D] px-3 py-1.5 text-[15px] font-medium text-[#DBDCDF] h-[34px]">
                      {phase.phase} ({phase.ageRange})
                    </div>
                    <p className="text-[14px] leading-[1.57] text-[#AEB0B6] whitespace-pre-line">
                      {phase.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Gradient Overlay */}
            <div className="absolute bottom-0 left-0 w-full h-[154px] bg-linear-to-t from-[#171719] to-transparent pointer-events-none" />
          </div>

          <button className="w-full rounded-lg border border-white/30 px-4 py-3 text-[14px] font-medium text-[#DBDCDF] hover:bg-white/5 transition">
            See All
          </button>
        </section>

        {/* Area-Specific Strategies */}
        <section className="rounded-2xl bg-[#171719] p-[28px_20px] space-y-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <div className="flex items-center justify-between">
            <h2 className="text-[18px] font-medium text-[#878A93]">
              Area-Specific Strategies
            </h2>
          </div>

          <div className="relative">
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory">
              {data.areaStrategies.map((strategy) => {
                const styles = {
                  career: { bg: "#324EA5", text: "#DBDCDF" },
                  health: { bg: "#2C925E", text: "#212225" },
                  wealth: { bg: "#F6E24A", text: "#212225" },
                  relationship: { bg: "#F16C6E", text: "#212225" },
                }[strategy.area] || { bg: strategy.bgColor, text: "#171719" };

                return (
                  <div
                    key={strategy.title}
                    className="shrink-0 snap-start w-[305px] h-[447px] rounded-xl overflow-hidden bg-[#171719] flex flex-col"
                  >
                    <div className="relative h-[122px] p-[16px_12px]">
                      <img
                        src={areaImages[strategy.area]}
                        alt={strategy.title}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="relative z-10 flex items-start">
                        <span
                          className="px-3 py-1.5 rounded-[28px] text-[13px]"
                          style={{
                            backgroundColor: styles.bg,
                            color: styles.text,
                          }}
                        >
                          {strategy.title}
                        </span>
                      </div>
                    </div>
                    <div className="bg-[#212225] p-[24px_20px] flex-1">
                      <p className="text-[14px] leading-[1.57] text-[#AEB0B6]">
                        {strategy.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Pagination Dots */}
            <div className="flex justify-center gap-1.5 mt-6">
              {data.areaStrategies.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === 0 ? "w-[26px] bg-[#DBDCDF]" : "w-1.5 bg-[#5A5C63]"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Personalized Advice */}
        <section className="rounded-2xl bg-[#171719] p-[28px_20px] space-y-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <h2 className="text-[18px] font-medium text-[#878A93]">
            Personalized Advice for Success
          </h2>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-xl bg-[#292A2D] px-3 py-1.5 text-[15px] font-medium text-[#DBDCDF] h-[34px]">
                Beneficial Energies
              </div>
              <div className="space-y-4">
                {data.beneficialEnergies.map((energy) => (
                  <div key={energy.title} className="space-y-1">
                    <p className="text-[14px] leading-[1.57] text-[#AEB0B6] whitespace-pre-line">
                      {energy.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-0.5 w-full bg-[#212225]" />

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-xl bg-[#292A2D] px-3 py-1.5 text-[15px] font-medium text-[#DBDCDF] h-[34px]">
                Energies Requiring Regulation
              </div>
              <div className="space-y-4">
                {data.regulatingEnergies.map((energy) => (
                  <div key={energy.title} className="space-y-1">
                    <p className="text-[14px] leading-[1.57] text-[#AEB0B6] whitespace-pre-line">
                      {energy.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="p-[32px_20px] flex flex-col gap-[41px]">
          <div className="flex flex-col gap-2">
            {[
              {
                title: "Contact US",
                subtitle: "Content extraction errors & inquiries",
                icon: contactUsIcon,
              },
              {
                title: "Write a Review",
                subtitle: "Share your experience",
                icon: writeReviewIcon,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-between py-3"
              >
                <div className="flex items-center gap-[18px]">
                  <img src={item.icon} alt={item.title} className="w-12 h-12" />
                  <div className="flex flex-col gap-0.5">
                    <p className="text-[15px] font-semibold text-[#DBDCDF]">
                      {item.title}
                    </p>
                    <p className="text-[13px] text-[#878A93]">{item.subtitle}</p>
                  </div>
                </div>
                <ChevronIcon className="w-6 h-6 text-white" direction="right" />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-[18px] font-semibold text-[#878A93]">
              Other Services
            </h3>
            <div className="space-y-2">
              {["Gonnabe", "Songil", "Imokgubi"].map((name) => (
                <div
                  key={name}
                  className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-3 hover:bg-white/10 transition"
                >
                  <span className="text-sm font-semibold text-[#DBDCDF]">{name}</span>
                  <ChevronIcon className="w-4 h-4 text-white/70" direction="right" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center gap-1 text-[13px] text-white/30">
            <span>FortunePic</span>
            <span>©</span>
          </div>
        </footer>
        </div>
      </main>
    </div>
  );
}
