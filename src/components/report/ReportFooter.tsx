import contactUsIcon from "@/assets/icons/report/contact-us.svg?url";
import writeReviewIcon from "@/assets/icons/report/write-review.svg?url";

import { ChevronIcon } from "./ChevronIcon";

export function ReportFooter() {
  return (
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
  );
}
