import { type Gender } from "@/core/types";

import { instance } from "./instance";

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

  // 문서 형식에 맞춰 모든 필드를 JSON.stringify()로 변환하여 추가
  formData.append("birthday", JSON.stringify(birthdayPayload));
  formData.append("heads", JSON.stringify(data.heads));
  formData.append("relationship", JSON.stringify(data.relationship || ""));
  formData.append("theme", data.theme);
  formData.append("language", JSON.stringify(data.language));

  // 이미지를 File 객체로 변환하여 추가 (첫 번째 이미지만 전송)
  if (data.images && data.images.length > 0) {
    const image = data.images[0]; // 첫 번째 이미지만 사용
    // Blob을 File 객체로 변환
    // 문서 형식에 맞춰 파일명과 타입을 image/jpeg로 고정
    const file = new File([image], "original_image.jpg", {
      type: "image/jpeg",
      lastModified: Date.now(),
    });
    formData.append("images", file);
  }

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
