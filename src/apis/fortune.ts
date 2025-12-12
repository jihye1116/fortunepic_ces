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

export type ThemeType = "basic" | "daily" | "weekly" | "monthly" | "yearly";

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

  // 문서 형식에 맞춰 모든 필드를 JSON.stringify()로 변환하여 추가
  formData.append("birthday", JSON.stringify(data.birthday));
  formData.append("heads", JSON.stringify(data.heads));
  formData.append("relationship", JSON.stringify(data.relationship || ""));
  formData.append("theme", JSON.stringify(data.theme));
  formData.append("language", JSON.stringify(data.language));
  if (data.gender && data.gender !== "prefer-not") {
    formData.append("gender", JSON.stringify(data.gender));
  }

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

  // // FormData 내용을 로그로 출력
  // console.log("=== API 요청 FormData 내용 ===");
  // console.log("birthday:", JSON.stringify(data.birthday));
  // console.log("heads:", JSON.stringify(data.heads));
  // console.log("relationship:", JSON.stringify(data.relationship || ""));
  // console.log("theme:", JSON.stringify(data.theme));
  // console.log("language:", JSON.stringify(data.language));
  // console.log("images count:", data.images.length);

  // console.log("============================");

  // multipart/form-data로 전송
  // ⚠️ 중요: Content-Type을 수동으로 설정하면 boundary가 누락되어 400 에러 발생!
  // axios가 FormData를 감지하여 자동으로 올바른 Content-Type을 설정하도록 headers를 설정하지 않음

  const response = await instance.post<FortuneAnalysisResponse>(
    "/anthropic/fortunePic",
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
