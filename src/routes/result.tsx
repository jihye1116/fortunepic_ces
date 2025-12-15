import {
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { useAtom } from "jotai";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { instance } from "@/apis/instance";
import CheckIcon from "@/assets/icons/check.svg?react";
import { NavigationBar } from "@/components/NavigationBar";
import { nicknameAtom, resetAllAtoms, topicAtom } from "@/store/atoms";

export const Route = createFileRoute("/result")({
  component: RouteComponent,
  validateSearch: (data) => {
    return {
      id: String(data.id),
    };
  },
});

function RouteComponent() {
  const { t } = useTranslation();
  const { id } = Route.useSearch();
  const navigate = useNavigate();
  const [nickname] = useAtom(nicknameAtom);
  const [topic] = useAtom(topicAtom);
  const [, resetAtoms] = useAtom(resetAllAtoms);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await instance.get(`/anthropic/fortunePic/${id}`);
    setData(data.data);
    console.log(data.data);
  };

  const router = useRouter();

  const getTopicConfig = () => {
    switch (topic) {
      case "lifetime":
        return {
          title: t("result.lifetimeFortune.title"),
          subtitle: null,
          mainTitle: null,
          description: t("result.lifetimeFortune.description"),
          chips: null,
          hasImages: false,
        };
      case "today":
        return {
          title: t("result.todaysFortune.title"),
          subtitle: t("result.todaysFortune.subtitle"),
          mainTitle: t("result.todaysFortune.mainTitle"),
          description: null,
          chips: [
            t("result.todaysFortune.chip1"),
            t("result.todaysFortune.chip2"),
            t("result.todaysFortune.chip3"),
          ],
          hasImages: false,
        };
      case "yearly":
        return {
          title: t("result.yearly.title"),
          subtitle: null,
          mainTitle: t("result.yearly.mainTitle"),
          description: null,
          chips: [],
          hasImages: false,
        };
      case "specifiedDate":
        return {
          title: t("result.specifiedDate.title"),
          subtitle: null,
          mainTitle: t("result.specifiedDate.mainTitle"),
          description: null,
          chips: [
            t("result.specifiedDate.chip1"),
            t("result.specifiedDate.chip2"),
            t("result.specifiedDate.chip3"),
          ],
          hasImages: false,
        };
      case "fiveElementsV3":
        return {
          title: t("result.fiveElementsV3.title"),
          subtitle: null,
          mainTitle: null,
          description: t("result.fiveElementsV3.description"),
          chips: null,
          hasImages: true,
          mainImageLabel: t("result.fiveElementsV3.mainImage"),
          supportingImageLabel: t("result.fiveElementsV3.supportingImage"),
        };
      case "dayPillarAnimal":
        return {
          title: t("result.dayPillarAnimal.title"),
          subtitle: null,
          mainTitle: t("result.dayPillarAnimal.mainTitle"),
          description: t("result.dayPillarAnimal.description"),
          chips: [
            t("result.dayPillarAnimal.chip1"),
            t("result.dayPillarAnimal.chip2"),
            t("result.dayPillarAnimal.chip3"),
          ],
          hasImages: true,
          zodiacImage: true,
        };
      case "physiognomy":
        return {
          title: t("result.physiognomy.title"),
          subtitle: null,
          mainTitle: t("result.physiognomy.mainTitle"),
          description: t("result.physiognomy.description"),
          chips: null,
          hasImages: true,
          talismanImage: true,
        };
      default:
        return {
          title: topic,
          subtitle: null,
          mainTitle: null,
          description: "",
          chips: null,
          hasImages: false,
        };
    }
  };

  const config = getTopicConfig();
  const reportUrl = `/report/${topic}?id=${id}`;

  return (
    <div className="h-dvh">
      {/* Content */}
      <NavigationBar />

      {/* Title Section */}
      <div className="flex h-[220px] w-full flex-col gap-3 px-20 py-10">
        <h1
          className="bg-linear-to-r from-white to-[#1e2f63] bg-clip-text text-center text-[56px] leading-[1.3] font-medium tracking-[-1.12px] text-transparent"
          style={{ fontFamily: "Pretendard JP Variable" }}
        >
          {config.title}
        </h1>
        {config.subtitle && (
          <p
            className="text-center text-[40px] leading-[1.3] font-normal tracking-[-0.4px] text-[#989ba2]"
            style={{ fontFamily: "Pretendard JP Variable" }}
          >
            {config.subtitle}
          </p>
        )}
      </div>

      {/* Content Section */}
      <div className="flex w-full flex-col items-center gap-9 px-20 py-12">
        {/* QR Code and Image Container */}
        <div className="flex items-start gap-9">
          {/* QR Code */}
          <div className="flex flex-col items-center rounded-3xl bg-black/20 p-10">
            <QRCodeSVG
              onClick={() => router.navigate({ to: reportUrl })}
              value={reportUrl}
              size={260}
              bgColor="transparent"
              fgColor="#d6dced"
              level="M"
            />
            <p
              className="mt-[34px] text-[32px] leading-[1.3] font-medium tracking-[-0.864px] text-[#aeb0b6]"
              style={{ fontFamily: "Pretendard JP Variable" }}
            >
              {t("result.qrCode")}
            </p>
          </div>

          {/* Image (for zodiac and talisman) */}
          {config.hasImages && (config.zodiacImage || config.talismanImage) && (
            <div className="relative h-[416px] w-[344px] overflow-hidden rounded-3xl bg-black/20">
              {/* Placeholder for zodiac/talisman image */}
              <img
                src={data?.imageUrl}
                alt="zodiac or talisman"
                className="h-full w-full"
              />
            </div>
          )}
        </div>

        {/* Five Elements Images */}
        {config.hasImages && !config.zodiacImage && !config.talismanImage && (
          <div className="flex gap-6">
            <div className="relative size-[178px] overflow-hidden rounded-3xl bg-linear-to-br from-blue-900/50 to-purple-900/50 p-3">
              <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-4.5 py-2.5">
                <p
                  className="text-2xl leading-[1.33] font-medium tracking-[-0.552px] text-[#c2c4c8]"
                  style={{ fontFamily: "Pretendard JP Variable" }}
                >
                  {config.mainImageLabel}
                </p>
              </div>
            </div>
            <div className="relative size-[178px] overflow-hidden rounded-3xl bg-linear-to-br from-amber-900/30 to-green-900/30 p-3">
              <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-4.5 py-2.5">
                <p
                  className="text-2xl leading-[1.33] font-medium tracking-[-0.552px] text-[#c2c4c8]"
                  style={{ fontFamily: "Pretendard JP Variable" }}
                >
                  {config.supportingImageLabel}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Description Box */}
        <div
          className="w-full rounded-3xl px-10 py-8"
          style={{
            background:
              "radial-gradient(ellipse 920px 262px at 50% 50%, rgba(132,149,201,0.2) 0%, rgba(0,0,0,0.3) 100%)",
          }}
        >
          <div className="flex flex-col gap-3">
            {/* Name's report */}
            <div className="flex items-center gap-1 text-[32px] leading-[1.3] font-medium tracking-[-0.864px] text-[#989ba2]">
              <p style={{ fontFamily: "Pretendard JP Variable" }}>{nickname}</p>
              <p style={{ fontFamily: "Pretendard JP Variable" }}>
                {t("result.reportSuffix")}
              </p>
            </div>

            {/* Main title with gradient */}
            {config.mainTitle && (
              <h2
                className="bg-linear-to-r from-[#d6dced] to-[#8495c9] bg-clip-text text-[40px] leading-[1.3] font-semibold tracking-[-1.08px] text-transparent"
                style={{ fontFamily: "Pretendard JP Variable" }}
              >
                {config.mainTitle}
              </h2>
            )}

            {/* Description */}
            {config.description && (
              <p
                className="text-[32px] leading-normal font-normal tracking-[-0.864px] text-[#c2c4c8]"
                style={{ fontFamily: "Pretendard JP Variable" }}
              >
                {config.description}
              </p>
            )}

            {/* Chips */}
            {config.chips && (
              <div className="flex gap-2">
                {config.chips.map((chip, idx) => (
                  <div
                    key={idx}
                    className="rounded-[20px] bg-[rgba(50,78,165,0.2)] px-6 py-3"
                  >
                    <p
                      className="text-[32px] leading-[1.3] font-normal tracking-[-0.864px] text-[#adb8db]"
                      style={{ fontFamily: "Pretendard JP Variable" }}
                    >
                      {chip}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="flex w-full flex-col items-center gap-5 px-20 py-10">
        <button
          onClick={() => navigate({ to: "/" })}
          className="flex h-[132px] w-[920px] items-center justify-center rounded-3xl px-[365px] py-10"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(50,78,165,1) 0%, rgba(132,149,201,1) 50%, rgba(33,34,37,1) 100%)",
          }}
        >
          <p
            className="text-[40px] leading-[1.3] font-medium tracking-[-0.6px] text-white"
            style={{ fontFamily: "Pretendard JP Variable" }}
          >
            {t("result.finish")}
          </p>
        </button>

        <button
          onClick={() => {
            resetAtoms();
            navigate({ to: "/" });
          }}
          className="flex items-center gap-5 px-20 py-3"
        >
          <CheckIcon className="size-20 text-[#70737c]" />
          <p
            className="text-center text-[32px] leading-[1.3] font-normal tracking-[-0.864px] text-[#70737c]"
            style={{ fontFamily: "Pretendard JP Variable" }}
          >
            {t("result.removeData")}
          </p>
        </button>
      </div>
    </div>
  );
}
