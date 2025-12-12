interface SimpleListSectionItem {
  description: string;
}

interface SimpleListSectionProps {
  title: string;
  items: [SimpleListSectionItem, SimpleListSectionItem];
}

export function SimpleListSection({ title, items }: SimpleListSectionProps) {
  return (
    <section className="rounded-2xl bg-[#171719] p-[28px_20px] space-y-8">
      <h2 className="text-[18px] font-semibold text-[#878A93]">{title}</h2>

      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index}>
            <p className="text-[14px] leading-[1.57] text-[#AEB0B6] whitespace-pre-line">
              {item.description}
            </p>
            {index === 0 && <div className="h-0.5 bg-[#212225] mt-6" />}
          </div>
        ))}
      </div>
    </section>
  );
}
