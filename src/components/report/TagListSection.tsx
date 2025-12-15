interface TagListSectionItem {
  tag: string;
  tagColor: string;
  description: string;
}

interface TagListSectionProps {
  title: string;
  items: TagListSectionItem[] | TagListSectionItem;
}

export function TagListSection({ title, items }: TagListSectionProps) {
  const normalizedItems = Array.isArray(items) ? items : [items];
  return (
    <section className="space-y-8 rounded-2xl bg-[#171719] p-[28px_20px]">
      <h2 className="text-[18px] font-semibold text-[#878A93]">{title}</h2>

      <div className="space-y-6">
        {normalizedItems.map((item, index) => (
          <div key={index}>
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <span
                  className="rounded-xl px-3 py-1.5 text-[15px] font-medium text-[#171719]"
                  style={{ backgroundColor: item.tagColor }}
                >
                  {item.tag}
                </span>
              </div>
              <p className="text-[14px] leading-[1.57] whitespace-pre-line text-[#AEB0B6]">
                {item.description}
              </p>
            </div>
            {index === 0 && <div className="mt-6 h-0.5 bg-[#212225]" />}
          </div>
        ))}
      </div>
    </section>
  );
}
