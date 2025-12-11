import { createFileRoute, useRouter } from "@tanstack/react-router";
import { atom, useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/camera")({
  component: CameraPage,
});

const capturedPhotosAtom = atom<string[]>([]);

function CameraPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedPhotos, setCapturedPhotos] = useAtom(capturedPhotosAtom);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [cameraFacingMode, setCameraFacingMode] = useState<"user" | "environment">(
    "user",
  );

  // 카메라 권한 확인 및 스트림 시작
  useEffect(() => {
    let isMounted = true;

    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: cameraFacingMode,
          },
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
        setHasPermission(true);
        setIsCameraReady(true);
      } catch (err) {
        console.error("카메라 접근 오류:", err);
        if (isMounted) {
          setHasPermission(false);
        }
      }
    };

    startCamera();

    return () => {
      isMounted = false;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraFacingMode, stream]);

  // 사진 촬영
  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const context = canvasRef.current.getContext("2d");
    if (!context) return;

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
  };

  // 카메라 전환 (전면/후면)
  const handleToggleCameraFacing = () => {
    setCameraFacingMode(cameraFacingMode === "user" ? "environment" : "user");
    setIsCameraReady(false);

    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  // 마지막 사진 삭제
  const handleDeleteLastPhoto = () => {
    if (capturedPhotos.length > 0) {
      setCapturedPhotos(capturedPhotos.slice(0, -1));
    }
  };

  // 촬영 완료 후 다음 페이지로
  const handleNext = () => {
    if (capturedPhotos.length > 0) {
      router.navigate({ to: "/topic" });
    }
  };

  if (hasPermission === false) {
    return (
      <main className="h-dvh bg-black">
        <div className="flex flex-col items-center justify-center gap-4 px-20 py-10">
          <p className="text-center text-xl text-gray-300">
            카메라 접근 권한이 필요합니다.
          </p>
          <p className="text-center text-sm text-gray-500">
            브라우저 설정에서 카메라 권한을 허용해주세요.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="h-dvh flex flex-col bg-black">
      <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden">
        {/* 비디오 스트림 */}
        <div className="relative h-full w-full">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="h-full w-full object-cover"
          />

          {/* 카메라 준비 중 인디케이터 */}
          {!isCameraReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <div className="text-center text-gray-400">
                <p>카메라 준비 중...</p>
              </div>
            </div>
          )}

          {/* 캡처 가이드 라인 */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="h-96 w-80 rounded-3xl border-2 border-white/30"></div>
          </div>

          {/* 촬영 횟수 표시 */}
          <div className="absolute top-6 right-6 px-4 py-2 bg-black/50 rounded-full text-white text-sm">
            {capturedPhotos.length}/3
          </div>
        </div>

        {/* 하단 컨트롤 */}
        <div className="w-full bg-linear-to-t from-black to-transparent px-6 py-10">
          <div className="flex flex-col gap-4">
            {/* 촬영 버튼 그룹 */}
            <div className="flex items-center justify-center gap-6">
              {/* 카메라 전환 버튼 */}
              <button
                onClick={handleToggleCameraFacing}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition"
              >
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16l-4-4m0 0l4-4m-4 4h16"
                  />
                </svg>
              </button>

              {/* 메인 촬영 버튼 */}
              <button
                onClick={handleCapture}
                disabled={!isCameraReady}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 transition shadow-lg"
              >
                <div className="h-16 w-16 rounded-full border-4 border-white"></div>
              </button>

              {/* 사진 삭제 버튼 */}
              <button
                onClick={handleDeleteLastPhoto}
                disabled={capturedPhotos.length === 0}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/20 hover:bg-red-500/30 disabled:bg-gray-600/20 transition"
              >
                <svg
                  className="h-6 w-6 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>

            {/* 미리보기 및 다음 버튼 */}
            {capturedPhotos.length > 0 && (
              <div className="flex flex-col gap-4">
                {/* 촬영된 사진 미리보기 */}
                <div className="flex gap-2 justify-center overflow-x-auto pb-2">
                  {capturedPhotos.map((photo: string, idx: number) => (
                    <div
                      key={idx}
                      className="h-16 w-16 shrink-0 rounded-lg overflow-hidden border border-white/20"
                    >
                      <img
                        src={photo}
                        alt={`Captured ${idx + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* 다음 버튼 */}
                <button
                  onClick={handleNext}
                  className="w-full flex items-center justify-center rounded-3xl py-10 bg-blue-500 hover:bg-blue-600 transition text-white font-semibold"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 숨겨진 캔버스 (사진 캡처용) */}
      <canvas ref={canvasRef} className="hidden" />
    </main>
  );
}
