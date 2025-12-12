import { type Gender } from "@/core/types";

import { instance } from "./instance";

/**
 * Converts an image Blob to a PNG Blob using a canvas.
 * @param imageBlob The original image blob to convert.
 * @returns A promise that resolves with the new PNG blob.
 */
const convertToPng = (imageBlob: Blob): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    // If it's already a PNG, no conversion is needed.
    if (imageBlob.type === "image/png") {
      resolve(imageBlob);
      return;
    }

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return reject(new Error("Could not get canvas context"));
      }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        blob => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Canvas to Blob conversion failed"));
          }
        },
        "image/png",
        1,
      ); // 1 is for full quality
      URL.revokeObjectURL(img.src);
    };
    img.onerror = err => {
      URL.revokeObjectURL(img.src);
      reject(new Error(`Image load error: ${err}`));
    };
    img.src = URL.createObjectURL(imageBlob);
  });
};

export interface BirthdayData {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  calendar: "lunar" | "solar";
  time: string;
}

export type ThemeType =
  | "lifetime"
  | "yearly"
  | "today"
  | "specifiedDate"
  | "fiveElementsV3"
  | "dayPillarAnimal"
  | "physiognomy";

export interface FortuneAnalysisRequest {
  birthday: BirthdayData[];
  heads: number;
  relationship: string;
  theme: ThemeType;
  language: string;
  images: Blob[];
  gender?: Gender;
}

export type FortuneAnalysisResponse = unknown;

/**
 * 운세 분석 API 호출
 */
export const analyzeFortuneWithImages = async (
  data: FortuneAnalysisRequest,
): Promise<FortuneAnalysisResponse> => {
  const formData = new FormData();

  const birthdayPayload = data.birthday.map(b => ({
    ...b,
    hour: b.hour || "5",
    minute: b.minute || "00",
    time: b.time || "am",
    gender: data.gender && data.gender !== "prefer-not" ? data.gender : "male",
  }));

  // 이미지를 PNG로 변환하여 추가 (첫 번째 이미지만 전송)
  if (data.images && data.images.length > 0) {
    const image = data.images[0]; // 첫 번째 이미지만 사용
    try {
      const pngBlob = await convertToPng(image);
      const file = new File([pngBlob], "original_image.png", {
        type: "image/png",
        lastModified: Date.now(),
      });
      formData.append("images", file);
    } catch (error) {
      console.error("Failed to convert image to PNG:", error);
    }
  }

    // 문서 형식에 맞춰 모든 필드를 JSON.stringify()로 변환하여 추가
  formData.append("birthday", JSON.stringify(birthdayPayload));
  formData.append("theme", data.theme);
  formData.append("language", JSON.stringify(data.language));

  console.log("요청 페이로드:", {
    birthday: birthdayPayload,
    theme: data.theme,
    // heads: data.heads,
  });



  // multipart/form-data로 전송
  // ⚠️ 중요: Content-Type을 수동으로 설정하면 boundary가 누락되어 400 에러 발생!
  // axios가 FormData를 감지하여 자동으로 올바른 Content-Type을 설정하도록 headers를 설정하지 않음

  const response = await instance.post<FortuneAnalysisResponse>(
    "/anthropic/comprehensiveFortune",
    formData,
    {
      timeout: 60000,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    },
  );

  console.log("API 응답:", response.data);

  return response.data;
};
