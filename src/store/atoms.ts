import { atom } from "jotai";

import type { Gender } from "@/core/types";

export const capturedPhotosAtom = atom<string[]>([]);
export const selectedPhotosAtom = atom<number[]>([]);

// 사진별 디자인 상태 타입
export interface PhotoDesign {
  photoIndex: number;
  frame: string | null;
  stickers: Array<{
    id: string;
    type: string;
    position: { x: number; y: number };
    size: number;
  }>;
  drawingData: string | null;
  containerWidth?: number; // 디자인 시 사용된 실제 컨테이너 너비
  containerHeight?: number; // 디자인 시 사용된 실제 컨테이너 높이
}

export const pictureCountAtom = atom<number>(1);
export const photoDesignsAtom = atom<PhotoDesign[]>([]);
export const originalImagesAtom = atom<string[]>([]);
export const designedImagesAtom = atom<string[]>([]);
export const apiImageAtom = atom<string | null>(null);

// API 운세 응답 데이터 (실제 타입 확정 전까지 any 사용)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FortuneResult = any;

export const fortuneResultAtom = atom<Record<number, FortuneResult>>({});

export const topicAtom = atom<string>("");
export const themeAtom = atom<string>("");

export const nicknameAtom = atom<string>("");
export const birthdateAtom = atom<string>("");
export const birthtimeAtom = atom<string>("");
export const genderAtom = atom<Gender | null>(null);

// 모든 atom을 초기화하는 write-only atom
export const resetAllAtoms = atom(null, (_get, set) => {
  set(capturedPhotosAtom, []);
  set(selectedPhotosAtom, []);
  set(pictureCountAtom, 1);
  set(photoDesignsAtom, []);
  set(originalImagesAtom, []);
  set(designedImagesAtom, []);
  set(apiImageAtom, null);
  set(fortuneResultAtom, {});
  set(nicknameAtom, "");
});

export const resetAtomsForRetake = atom(null, (_get, set) => {
  set(photoDesignsAtom, []);
  set(originalImagesAtom, []);
  set(designedImagesAtom, []);
  set(apiImageAtom, null);
});

export const resetFortuneAtoms = atom(null, (_get, set) => {
  set(apiImageAtom, null);
});

export const specialNavigationAtom = atom(false);

// 배경 투명도 상태 (true: 40%, false: 100%)
export const backgroundOpacityAtom = atom<boolean>(false);
