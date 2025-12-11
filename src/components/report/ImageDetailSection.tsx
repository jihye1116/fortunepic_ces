interface ImageDetailSectionProps {
  title: string;
  imageUrl: string;
  subTitle: string;
  description: string;
  items: string[];
}

export function ImageDetailSection({
  title,
  imageUrl,
  subTitle,
  description,
  items,
}: ImageDetailSectionProps) {
  return (
    <section className="flex flex-col gap-6 p-[28px_20px] bg-[#171719] rounded-2xl">
      <h3 className="text-lg font-semibold text-[#878A93]">{title}</h3>

      <div className="flex flex-col gap-4">
        <div className="rounded-xl overflow-hidden border border-black/20">
          <img
            src={imageUrl}
            alt={subTitle}
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="flex flex-col gap-1">
          <h4 className="text-base font-medium text-[#E1E2E4]">{subTitle}</h4>
          <p className="text-sm text-[#AEB0B6]">{description}</p>
        </div>

        <div className="h-0.5 bg-[#212225] w-full" />

        <div className="flex flex-col gap-3">
          {items.map((text, index) => (
            <ListItem key={index} text={text} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ListItem({ text }: { text: string }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="w-1 h-1 mt-[9px] rounded-full bg-[#AEB0B6] shrink-0" />
      <p className="text-sm text-[#AEB0B6] leading-[1.57]">{text}</p>
    </div>
  );
}
