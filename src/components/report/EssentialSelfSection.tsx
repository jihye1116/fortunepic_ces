import { useTranslation } from "react-i18next";

interface EssentialSelfItem {
  label: string;
  element: string;
  description: string;
}

interface EssentialSelfSectionProps {
  items: EssentialSelfItem[];
}

const labelMap: Record<string, string> = {
  Daystem: "daystem",
  "Useful God": "usefulGod",
};

export function EssentialSelfSection({ items }: EssentialSelfSectionProps) {
  const { t } = useTranslation();

  return (
    <section className="rounded-2xl bg-[#171719] p-[28px_20px] space-y-6">
      <h2 className="text-[18px] font-semibold text-[#878A93] leading-[1.44] tracking-[-0.2%]">
        {t("report.sections.essentialSelf")}
      </h2>

      {items.map((item, index) => (
        <div key={index} className="flex flex-col gap-3">
          {/* Chip Container */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-1 w-fit rounded-[28px] bg-[#2E2F33] p-1">
              {/* Label */}
              <div className="px-3 py-0 flex items-center justify-center">
                <span className="text-[13px] leading-[1.38] text-[#C2C4C8]">
                  {t(`report.essentialSelf.${labelMap[item.label]}`, {
                    defaultValue: item.label,
                  })}
                </span>
              </div>
              {/* Element Badge */}
              <div className="px-3 py-[5px] flex items-center justify-center rounded-2xl bg-[#8495C9]">
                <span className="text-[14px] font-medium leading-[1.4] tracking-[1%] text-[#171719]">
                  {t(`report.elements.${item.element.toLowerCase()}`, {
                    defaultValue: item.element,
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="w-[303px]">
            <p className="text-[14px] leading-[1.57] tracking-[1%] text-[#AEB0B6]">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
