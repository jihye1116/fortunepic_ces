import { useState } from "react";
import { Drawer } from "vaul";

import SmallXIcon from "@/assets/icons/small-X.svg?react";
import reportBanner from "@/assets/images/report/report-banner.png";

import { ChevronIcon } from "./ChevronIcon";

const insightDetails: Record<string, { title: string; description: string }> = {
  "Four Pillars of Destiny": {
    title: "Four Pillars of Destiny",
    description:
      'Saju (Four Pillars of Destiny) is not a prophecy stating "Your life will turn out this way."\nInstead, it functions as a guide, stating: "You were born with this foundation, your abilities manifest best in these flows, and choosing this direction allows for the most natural expansion."',
  },
  // Add more mappings as needed
};

interface ReportHeaderProps {
  sourceOfInsight: string;
}

export function ReportHeader({ sourceOfInsight }: ReportHeaderProps) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    // resetAtoms();
    // router.navigate({ to: "/" });
  };

  const handleSheetOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleSheetClose = () => setOpen(false);

  const detail = insightDetails[sourceOfInsight] || {
    title: sourceOfInsight,
    description: "No additional information available.",
  };

  return (
    <div className="relative">
      <img
        src={reportBanner}
        alt="Report Banner"
        className="h-[370px] w-full object-cover"
      />
      {/* Header */}
      <header className="absolute right-0 bottom-0 left-0 space-y-3 px-4 pb-6">
        <button
          onClick={handleClick}
          className="flex w-full items-center justify-between rounded-2xl bg-black/30 p-4 text-left shadow-[0_16px_50px_rgba(0,0,0,0.25)] backdrop-blur-xl"
        >
          <div className="space-y-1">
            <p className="text-xs text-[#878A93]">Source of Insight</p>
            <p className="text-sm font-medium text-[#E1E2E4]">
              {sourceOfInsight}
            </p>
          </div>
          <span onClick={handleSheetOpen} className="ml-2 cursor-pointer">
            <ChevronIcon className="h-5 w-5 text-white/70" direction="right" />
          </span>
        </button>
      </header>

      {/* Bottom Sheet */}
      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-50 bg-black/60" />
          <Drawer.Content className="font-pretendard fixed right-0 bottom-0 left-0 z-50 mx-auto flex max-h-[92vh] w-full max-w-[480px] flex-col rounded-t-3xl bg-[#171719] outline-none">
            {/* Handle */}
            <div className="flex shrink-0 items-center justify-center py-3.5">
              <div className="h-1 w-[51px] rounded-full bg-[#5A5C63]" />
            </div>
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between px-5 py-5">
              <Drawer.Title asChild>
                <h2 className="text-[18px] font-semibold text-[#878A93]">
                  {detail.title}
                </h2>
              </Drawer.Title>
              <button onClick={handleSheetClose} className="ml-2 p-1">
                <SmallXIcon className="h-6 w-6 text-[#878A93]" />
              </button>
            </div>
            {/* Content */}
            <div className="flex-1 overflow-y-auto px-5 pb-10">
              <div className="space-y-8">
                <p className="text-[14px] leading-[1.57] whitespace-pre-line text-[#AEB0B6]">
                  {detail.description}
                </p>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
