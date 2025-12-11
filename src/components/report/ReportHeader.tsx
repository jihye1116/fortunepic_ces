import reportBanner from "@/assets/images/report/report-banner.png";

import { ChevronIcon } from "./ChevronIcon";

interface ReportHeaderProps {
  sourceOfInsight: string;
}

export function ReportHeader({ sourceOfInsight }: ReportHeaderProps) {
  return (
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
              {sourceOfInsight}
            </p>
          </div>
          <ChevronIcon className="w-5 h-5 text-white/70" direction="right" />
        </div>
      </header>
    </div>
  );
}
