export const KOREAN_KEYBOARD = {
  consonants: ["ㅂ", "ㅈ", "ㄷ", "ㄱ", "ㅅ", "ㅛ", "ㅕ", "ㅑ", "ㅐ", "ㅔ"],
  vowels: ["ㅁ", "ㄴ", "ㅇ", "ㄹ", "ㅎ", "ㅗ", "ㅓ", "ㅏ", "ㅣ"],
  bottom: ["ㅋ", "ㅌ", "ㅊ", "ㅍ", "ㅠ", "ㅜ", "ㅡ"],
};

// 쉬프트 적용 시 매핑
export const SHIFT_MAP: Record<string, string> = {
  ㅂ: "ㅃ",
  ㅈ: "ㅉ",
  ㄷ: "ㄸ",
  ㄱ: "ㄲ",
  ㅅ: "ㅆ",
  ㅐ: "ㅒ",
  ㅔ: "ㅖ",
};

// 한글 유니코드 상수
export const HANGUL_START = 0xac00; // '가'
export const HANGUL_END = 0xd7a3; // '힣'
export const CHOSUNG_BASE = 588;
export const JUNGSUNG_BASE = 28;

// 초성, 중성, 종성 리스트
export const CHOSUNG_LIST = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];
export const JUNGSUNG_LIST = [
  "ㅏ",
  "ㅐ",
  "ㅑ",
  "ㅒ",
  "ㅓ",
  "ㅔ",
  "ㅕ",
  "ㅖ",
  "ㅗ",
  "ㅘ",
  "ㅙ",
  "ㅚ",
  "ㅛ",
  "ㅜ",
  "ㅝ",
  "ㅞ",
  "ㅟ",
  "ㅠ",
  "ㅡ",
  "ㅢ",
  "ㅣ",
];
export const JONGSUNG_LIST = [
  "",
  "ㄱ",
  "ㄲ",
  "ㄳ",
  "ㄴ",
  "ㄵ",
  "ㄶ",
  "ㄷ",
  "ㄹ",
  "ㄺ",
  "ㄻ",
  "ㄼ",
  "ㄽ",
  "ㄾ",
  "ㄿ",
  "ㅀ",
  "ㅁ",
  "ㅂ",
  "ㅄ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

// 복합 모음 조합 규칙
export const JUNGSUNG_COMBINATIONS: Record<string, Record<string, string>> = {
  ㅗ: { ㅏ: "ㅘ", ㅐ: "ㅙ", ㅣ: "ㅚ" },
  ㅜ: { ㅓ: "ㅝ", ㅔ: "ㅞ", ㅣ: "ㅟ" },
  ㅡ: { ㅣ: "ㅢ" },
};

// 복합 자음 조합 규칙
export const JONGSUNG_COMBINATIONS: Record<string, Record<string, string>> = {
  ㄱ: { ㅅ: "ㄳ" },
  ㄴ: { ㅈ: "ㄵ", ㅎ: "ㄶ" },
  ㄹ: { ㄱ: "ㄺ", ㅁ: "ㄻ", ㅂ: "ㄼ", ㅅ: "ㄽ", ㅌ: "ㄾ", ㅍ: "ㄿ", ㅎ: "ㅀ" },
  ㅂ: { ㅅ: "ㅄ" },
};

export const doubled: Record<string, string> = {
  ㄱ: "ㄲ",
  ㄷ: "ㄸ",
  ㅂ: "ㅃ",
  ㅅ: "ㅆ",
  ㅈ: "ㅉ",
};

export const doubledReverse: Record<string, string> = {
  ㄲ: "ㄱ",
  ㄸ: "ㄷ",
  ㅃ: "ㅂ",
  ㅆ: "ㅅ",
  ㅉ: "ㅈ",
};
