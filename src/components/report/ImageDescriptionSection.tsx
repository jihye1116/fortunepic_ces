interface ImageDescriptionSectionProps {
  title: string;
  imageUrl: string;
  subTitle: string;
  description: string;
  detailedDescription: string;
}

export function ImageDescriptionSection({
  title,
  imageUrl,
  subTitle,
  description,
  detailedDescription,
}: ImageDescriptionSectionProps) {
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

        <p className="text-sm text-[#AEB0B6] leading-[1.57] whitespace-pre-line">
          {detailedDescription}
        </p>
      </div>
    </section>
  );
}
