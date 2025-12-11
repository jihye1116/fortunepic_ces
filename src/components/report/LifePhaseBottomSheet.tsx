import { Drawer } from "vaul";

import { LifetimeReportData } from "@/types/report";

interface LifePhaseBottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lifePhases: LifetimeReportData["lifePhases"];
}

export function LifePhaseBottomSheet({
  open,
  onOpenChange,
  lifePhases,
}: LifePhaseBottomSheetProps) {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/60" />
        <Drawer.Content className="font-pretendard fixed right-0 bottom-0 left-0 z-50 mx-auto flex max-h-[92vh] w-full max-w-[480px] flex-col rounded-t-3xl bg-[#171719] outline-none">
          {/* Handle */}
          <div className="flex shrink-0 items-center justify-center py-3.5">
            <div className="h-1 w-[51px] rounded-full bg-[#5A5C63]" />
          </div>

          {/* Header */}
          <div className="shrink-0 px-5 py-5">
            <Drawer.Title asChild>
              <h2 className="text-[18px] font-semibold text-[#878A93]">
                Life Phase Flow
              </h2>
            </Drawer.Title>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-5 pb-10">
            <div className="space-y-8">
              {lifePhases.map((phase, idx) => (
                <div key={phase.phase} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-[34px] shrink-0 items-center justify-center">
                      <div className="relative flex h-3.5 w-3.5 items-center justify-center">
                        <div className="absolute h-3.5 w-3.5 rounded-full bg-[#8495C9]" />
                        <div className="absolute h-2 w-2 rounded-full bg-[#324EA5]" />
                      </div>
                    </div>
                    {idx < lifePhases.length - 1 && (
                      <div className="mt-4 w-0.5 flex-1 bg-[#292A2D]" />
                    )}
                  </div>
                  <div className="flex-1 space-y-3 pb-8">
                    <div className="inline-flex h-[34px] items-center gap-2 rounded-xl bg-[#292A2D] px-3 py-1.5 text-[15px] font-medium text-[#DBDCDF]">
                      {phase.phase} ({phase.ageRange})
                    </div>
                    <p className="text-[14px] leading-[1.57] whitespace-pre-line text-[#AEB0B6]">
                      {phase.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
