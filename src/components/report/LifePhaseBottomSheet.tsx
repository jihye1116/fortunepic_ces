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
        <Drawer.Overlay className="fixed inset-0 bg-black/60 z-50" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 mx-auto flex max-h-[92vh] w-full max-w-[480px] flex-col rounded-t-3xl bg-[#171719] outline-none">
          {/* Handle */}
          <div className="flex items-center justify-center py-3.5 shrink-0">
            <div className="h-1 w-[51px] rounded-full bg-[#5A5C63]" />
          </div>

          {/* Header */}
          <div className="px-5 py-5 shrink-0">
            <h2 className="text-[18px] font-semibold text-[#878A93]">
              Life Phase Flow
            </h2>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-5 pb-10">
            <div className="space-y-8">
              {lifePhases.map((phase, idx) => (
                <div key={phase.phase} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center h-[34px] shrink-0">
                      <div className="relative flex items-center justify-center w-3.5 h-3.5">
                        <div className="absolute w-3.5 h-3.5 rounded-full bg-[#8495C9]" />
                        <div className="absolute w-2 h-2 rounded-full bg-[#324EA5]" />
                      </div>
                    </div>
                    {idx < lifePhases.length - 1 && (
                      <div className="w-0.5 flex-1 bg-[#292A2D] mt-4" />
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
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
