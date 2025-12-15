import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  analyzeFortuneWithImages,
  type FortuneAnalysisRequest,
  type ThemeType,
} from "@/apis/fortune";
import GuideIcon from "@/assets/icons/guide.svg?react";
import { CancelButton } from "@/components/CancelButton";
import { LoadingScreen } from "@/components/LoadingScreen";
import { NavigationBar } from "@/components/NavigationBar";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Title } from "@/components/Title";
import {
  backgroundOpacityAtom,
  birthdateAtom,
  birthtimeAtom,
  capturedPhotosAtom,
  fortuneResultAtom,
  genderAtom,
  nicknameAtom,
  targetDateAtom,
  topicAtom,
} from "@/store/atoms";

export const Route = createFileRoute("/camera")({
  component: CameraPage,
});

const dataURLtoBlob = (dataurl: string) => {
  const arr = dataurl.split(",");
  if (arr.length < 2) {
    return null;
  }
  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch || mimeMatch.length < 2) {
    return null;
  }
  const mime = mimeMatch[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

function CameraPage() {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Local State
  const [step, setStep] = useState<"info" | "capture" | "select">("info");
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [countdown, setCountdown] = useState<number>(5);
  const [remainingShots, setRemainingShots] = useState<number>(2);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  // Global State (Jotai)
  const [capturedPhotos, setCapturedPhotos] = useAtom(capturedPhotosAtom);
  const setBackgroundOpacity = useSetAtom(backgroundOpacityAtom);
  const birthdate = useAtomValue(birthdateAtom);
  const birthtime = useAtomValue(birthtimeAtom);
  const gender = useAtomValue(genderAtom);
  const nickname = useAtomValue(nicknameAtom);
  const topic = useAtomValue(topicAtom);
  const targetDate = useAtomValue(targetDateAtom);
  const setFortuneResult = useSetAtom(fortuneResultAtom);

  // Info 화면에서 카메라 화면으로 전환
  const handleStartCamera = () => {
    setBackgroundOpacity(false);
    setTimeout(() => {
      setStep("capture");
      setBackgroundOpacity(true);
    }, 800);
  };

  // 카메라 권한 확인 및 스트림 시작
  useEffect(() => {
    if (step !== "capture") return;

    let isMounted = true;
    let localStream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });

        if (!isMounted) {
          mediaStream.getTracks().forEach((track) => track.stop());
          return;
        }

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }

        localStream = mediaStream;
        streamRef.current = mediaStream;
        setIsCameraReady(true);
      } catch (err) {
        console.error("카메라 접근 오류:", err);
      }
    };

    startCamera();

    return () => {
      isMounted = false;
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [step]);

  // 카메라 준비되면 자동으로 카운트다운 시작
  useEffect(() => {
    if (
      step === "capture" &&
      isCameraReady &&
      !isCountingDown &&
      remainingShots > 0
    ) {
      setIsCountingDown(true);
      setCountdown(5);
    }
  }, [isCameraReady, isCountingDown, remainingShots, step]);

  // 카운트다운 타이머 및 촬영 로직
  useEffect(() => {
    if (!isCountingDown || countdown < 0) return;

    const timer = setTimeout(() => {
      if (countdown === 0) {
        // 사진 촬영
        if (videoRef.current && canvasRef.current) {
          const context = canvasRef.current.getContext("2d");
          if (context) {
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
            context.drawImage(
              videoRef.current,
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height,
            );
            const photoDataUrl = canvasRef.current.toDataURL("image/jpeg", 0.9);
            setCapturedPhotos([...capturedPhotos, photoDataUrl]);
          }
        }

        setIsCountingDown(false);
        const newRemainingShots = remainingShots - 1;
        setRemainingShots(newRemainingShots);

        // 남은 촬영이 있으면 다시 카운트다운 시작
        if (newRemainingShots > 0) {
          setTimeout(() => {
            setIsCountingDown(true);
            setCountdown(5);
          }, 100);
        } else {
          // 모든 촬영 완료 - select 화면으로 전환
          setTimeout(() => {
            setStep("select");
            setBackgroundOpacity(false);
          }, 100);
        }
      } else {
        setCountdown(countdown - 1);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [
    countdown,
    isCountingDown,
    remainingShots,
    capturedPhotos,
    setCapturedPhotos,
    setBackgroundOpacity,
  ]);

  // --- RENDER: Info Step ---
  if (step === "info") {
    return (
      <main className="h-dvh">
        <NavigationBar />
        <Title text={t("camera.info.title")} />

        {/* Contents */}
        <div className="flex flex-col gap-6 px-20 py-10">
          <div className="rounded-3xl bg-linear-to-r from-[rgba(132,149,201,0.2)] to-[rgba(0,0,0,0.06)] px-9 py-6">
            <p className="bg-linear-to-r from-[#d6dced] to-[#8495c9] bg-clip-text text-[2.5rem] leading-[1.3] tracking-[-0.025rem] text-transparent">
              {t("camera.info.instruction1")}
            </p>
          </div>

          <div className="w-fit rounded-3xl bg-linear-to-r from-[rgba(132,149,201,0.2)] to-[rgba(0,0,0,0.06)] px-9 py-6">
            <p className="bg-linear-to-r from-[#d6dced] to-[#8495c9] bg-clip-text text-[2.5rem] leading-[1.3] tracking-[-0.025rem] text-transparent">
              {t("camera.info.instruction2")}
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="px-20 py-10">
          <PrimaryButton onClick={handleStartCamera}>
            {t("camera.info.button")}
          </PrimaryButton>
        </div>
      </main>
    );
  }

  // --- RENDER: Capture Step ---
  if (step === "capture") {
    return (
      <main className="flex h-dvh flex-col bg-black">
        <NavigationBar cameraMode remainingShots={remainingShots} />

        {/* Camera Guide - 중앙 */}
        <div className="relative flex flex-1 justify-center">
          {/* 비디오 배경 */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="h-full w-full"
          />
          {/* 가이드 아이콘 - 비디오 위에 오버레이 */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <GuideIcon />
          </div>
        </div>

        {/* Countdown - 하단 */}
        <div className="flex flex-1 flex-col items-center bg-[#141415] px-20">
          <div className="h-fit py-20">
            <p className="text-[6.25rem] leading-[1.3] font-semibold tracking-[-0.169rem] text-white">
              {countdown}
            </p>
          </div>
          <div className="rounded-3xl bg-linear-to-r from-[rgba(132,149,201,0.2)] to-[rgba(0,0,0,0.06)] px-9 py-6">
            <p className="bg-linear-to-r from-[#d6dced] to-[#8495c9] bg-clip-text text-[2.5rem] leading-[1.3] tracking-[-0.025rem] text-transparent">
              {t("camera.capture.earVisibility")}
            </p>
          </div>
        </div>

        {/* 숨겨진 캔버스 */}
        <canvas ref={canvasRef} className="hidden" />
      </main>
    );
  }

  // --- RENDER: Select Step ---
  return (
    <>
      <main className="flex h-dvh flex-col bg-black">
        <NavigationBar />

        <Title
          text={t("camera.select.title")}
          subtext={t("camera.select.subtitle")}
        />

        {/* 사진 선택 */}
        <div className="flex gap-5 px-20 py-12">
          {capturedPhotos.map((photo, idx) => (
            <button
              key={idx}
              className="relative h-84.5 flex-1 overflow-hidden rounded-xl"
              onClick={() => setSelectedPhotoIndex(idx)}
            >
              {/* 사진 이미지 */}
              <img
                src={photo}
                alt={`Captured ${idx + 1}`}
                className="h-full w-full object-cover"
              />

              {/* 선택된 사진: 그라데이션 테두리 */}
              {idx === selectedPhotoIndex && (
                <>
                  {/* 그라데이션 배경 레이어 */}
                  <div className="absolute inset-0 rounded-xl bg-linear-to-br from-[#5b72b7] via-[#8495c9] to-[#ed474a] p-[5px]">
                    <div className="h-full w-full rounded-[7px] bg-black" />
                  </div>
                  {/* 이미지를 다시 위에 표시 */}
                  <img
                    src={photo}
                    alt={`Captured ${idx + 1}`}
                    className="absolute inset-[5px] h-[calc(100%-10px)] w-[calc(100%-10px)] rounded-[7px] object-cover"
                  />
                </>
              )}

              {/* 선택되지 않은 사진: 흰색 반투명 테두리 */}
              {idx !== selectedPhotoIndex && (
                <div className="absolute inset-0 rounded-xl border border-white/20 opacity-80" />
              )}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-5 px-20 py-10">
          <PrimaryButton
            disabled={isLoading}
            onClick={async () => {
              setIsLoading(true);
              setBackgroundOpacity(true);

              try {
                // 1. Get selected photo and convert to Blob
                const selectedPhotoDataUrl = capturedPhotos[selectedPhotoIndex];
                const imageBlob = dataURLtoBlob(selectedPhotoDataUrl);

                if (!imageBlob) {
                  console.error("Failed to convert data URL to Blob");
                  setBackgroundOpacity(true);
                  setIsLoading(false);
                  return;
                }

                // Update atom with just the selected photo
                setCapturedPhotos([selectedPhotoDataUrl]);

                // 2. Prepare request data
                const [year, month, day] = birthdate.split("-");
                const [hour, minute] = birthtime.split(":");

                const requestData: FortuneAnalysisRequest = {
                  birthday: [
                    {
                      year,
                      month,
                      day,
                      hour,
                      minute,
                      calendar: "solar",
                      time: birthtime,
                    },
                  ],
                  heads: 1,
                  relationship: "",
                  theme: (topic || "basic") as ThemeType,
                  language: i18n.language,
                  images: [imageBlob],
                  gender: gender || undefined,
                  targetDate: targetDate
                    ? `${targetDate.getFullYear()}-${String(targetDate.getMonth() + 1).padStart(2, "0")}-${String(targetDate.getDate()).padStart(2, "0")}`
                    : undefined,
                };

                // 3. Call API
                const result = await analyzeFortuneWithImages(requestData);

                // 4. Store result
                const resultWithNickname = { ...(result as object), nickname };
                setFortuneResult({ 0: resultWithNickname });
                // 개발용: localStorage에도 저장
                localStorage.setItem(
                  "fortuneResultAtom",
                  JSON.stringify({ 0: resultWithNickname }),
                );

                setTimeout(() => {
                  router.navigate({
                    to: "/result",
                    search: { id: result._id },
                  });
                  setBackgroundOpacity(true);
                }, 800);
              } catch (error) {
                console.error("Fortune analysis API failed:", error);
                setBackgroundOpacity(true);
                setIsLoading(false);
              }
            }}
          >
            {t("camera.select.next")}
          </PrimaryButton>

          <CancelButton
            onCancel={() => {
              setBackgroundOpacity(false);
              setTimeout(() => {
                setStep("capture");
                setCapturedPhotos([]);
                setRemainingShots(2);
                setIsCameraReady(false);
                setBackgroundOpacity(true);
              }, 800);
            }}
          >
            {t("camera.select.retake")}
          </CancelButton>
        </div>
      </main>

      {/* Loading Overlay */}
      {isLoading && <LoadingScreen />}
    </>
  );
}
