import { createFileRoute } from "@tanstack/react-router";
import { useAtom, useSetAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import GuideIcon from "@/assets/icons/guide.svg?react";
import { NavigationBar } from "@/components/NavigationBar";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Title } from "@/components/Title";
import { backgroundOpacityAtom, capturedPhotosAtom } from "@/store/atoms";

export const Route = createFileRoute("/camera")({
  component: CameraPage,
});

function CameraPage() {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [step, setStep] = useState<"info" | "capture">("info");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedPhotos, setCapturedPhotos] = useAtom(capturedPhotosAtom);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [countdown, setCountdown] = useState<number>(5);
  const [remainingShots, setRemainingShots] = useState<number>(2);
  const [isCountingDown, setIsCountingDown] = useState(false);

  const setBackgroundOpacity = useSetAtom(backgroundOpacityAtom);

  // Info 화면에서 카메라 화면으로 전환
  const handleStartCamera = () => {
    setBackgroundOpacity(false);
    setTimeout(() => {
      setStep("capture");
      setBackgroundOpacity(true);
    }, 800);
    //
  };

  // 카메라 권한 확인 및 스트림 시작
  useEffect(() => {
    if (step !== "capture") return;

    let isMounted = true;

    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        if (!isMounted) {
          mediaStream.getTracks().forEach((track) => track.stop());
          return;
        }

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }

        setStream(mediaStream);
        setIsCameraReady(true);
      } catch (err) {
        console.error("카메라 접근 오류:", err);
      }
    };

    startCamera();

    return () => {
      isMounted = false;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream, step]);

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

  // 카운트다운 타이머
  useEffect(() => {
    if (!isCountingDown || countdown <= 0) return;

    const timer = setTimeout(() => {
      if (countdown === 1) {
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
        setRemainingShots((prev) => prev - 1);

        // 남은 촬영이 있으면 다시 카운트다운 시작
        if (remainingShots > 1) {
          setTimeout(() => {
            setIsCountingDown(true);
            setCountdown(5);
          }, 1000);
        }
      } else {
        setCountdown(countdown - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [
    countdown,
    isCountingDown,
    remainingShots,
    capturedPhotos,
    setCapturedPhotos,
  ]);

  // 사진 촬영 (사용 안함 - 카운트다운에서 직접 처리)
  // const handleCapture = () => {
  //   if (!videoRef.current || !canvasRef.current) return;

  //   const context = canvasRef.current.getContext("2d");
  //   if (!context) return;

  //   canvasRef.current.width = videoRef.current.videoWidth;
  //   canvasRef.current.height = videoRef.current.videoHeight;

  //   context.drawImage(
  //     videoRef.current,
  //     0,
  //     0,
  //     canvasRef.current.width,
  //     canvasRef.current.height,
  //   );

  //   const photoDataUrl = canvasRef.current.toDataURL("image/jpeg", 0.9);
  //   setCapturedPhotos([...capturedPhotos, photoDataUrl]);
  // };

  // Info 화면
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

  // if (hasPermission === false) {
  //   return (
  //     <main className="h-dvh bg-black">
  //       <div className="flex flex-col items-center justify-center gap-4 px-20 py-10">
  //         <p className="text-center text-xl text-gray-300">
  //           카메라 접근 권한이 필요합니다.
  //         </p>
  //         <p className="text-center text-sm text-gray-500">
  //           브라우저 설정에서 카메라 권한을 허용해주세요.
  //         </p>
  //       </div>
  //     </main>
  //   );
  // }

  // Capture 화면
  return (
    <main className="relative flex h-dvh flex-col bg-black">
      <NavigationBar cameraMode remainingShots={remainingShots} />

      {/* 비디오 배경 */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* 카메라 준비 중 */}
      {/* {!isCameraReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <p className="text-[2.5rem] text-gray-400">{t("camera.loading")}</p>
        </div>
      )} */}

      {/* Camera Guide - 중앙 */}
      <div className="flex flex-1 justify-center">
        <GuideIcon />
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
