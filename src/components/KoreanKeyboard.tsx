import { useState } from "react";

import BackspaceIcon from "@/assets/backspace.svg?react";
import ShiftIcon from "@/assets/shift.svg?react";

const KOREAN_KEYBOARD = {
  consonants: ["ㅂ", "ㅈ", "ㄷ", "ㄱ", "ㅅ", "ㅛ", "ㅕ", "ㅑ", "ㅐ", "ㅔ"],
  vowels: ["ㅁ", "ㄴ", "ㅇ", "ㄹ", "ㅎ", "ㅗ", "ㅓ", "ㅏ", "ㅣ"],
  bottom: ["ㅋ", "ㅌ", "ㅊ", "ㅍ", "ㅠ", "ㅜ", "ㅡ"],
};

// 쉬프트 적용 시 매핑
const SHIFT_MAP: Record<string, string> = {
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
const CHOSUNG_BASE = 588;
const JUNGSUNG_BASE = 28;

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
const JONGSUNG_LIST = [
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
const JUNGSUNG_COMBINATIONS: Record<string, Record<string, string>> = {
  ㅗ: { ㅏ: "ㅘ", ㅐ: "ㅙ", ㅣ: "ㅚ" },
  ㅜ: { ㅓ: "ㅝ", ㅔ: "ㅞ", ㅣ: "ㅟ" },
  ㅡ: { ㅣ: "ㅢ" },
};

// 복합 자음 조합 규칙
const JONGSUNG_COMBINATIONS: Record<string, Record<string, string>> = {
  ㄱ: { ㅅ: "ㄳ" },
  ㄴ: { ㅈ: "ㄵ", ㅎ: "ㄶ" },
  ㄹ: { ㄱ: "ㄺ", ㅁ: "ㄻ", ㅂ: "ㄼ", ㅅ: "ㄽ", ㅌ: "ㄾ", ㅍ: "ㄿ", ㅎ: "ㅀ" },
  ㅂ: { ㅅ: "ㅄ" },
};

// 한글 분해 함수
const disassemble = (char: string): [string, string, string] | null => {
  const code = char.charCodeAt(0);
  if (code < HANGUL_START || code > HANGUL_END) {
    return null;
  }

  const hangulCode = code - HANGUL_START;
  const chosungIndex = Math.floor(hangulCode / CHOSUNG_BASE);
  const jungsungIndex = Math.floor((hangulCode % CHOSUNG_BASE) / JUNGSUNG_BASE);
  const jongsungIndex = hangulCode % JUNGSUNG_BASE;

  return [
    CHOSUNG_LIST[chosungIndex],
    JUNGSUNG_LIST[jungsungIndex],
    JONGSUNG_LIST[jongsungIndex],
  ];
};

// 한글 조합 함수
const assemble = (
  chosung: string,
  jungsung: string,
  jongsung: string,
): string => {
  const chosungIndex = CHOSUNG_LIST.indexOf(chosung);
  const jungsungIndex = JUNGSUNG_LIST.indexOf(jungsung);
  const jongsungIndex = JONGSUNG_LIST.indexOf(jongsung);

  if (chosungIndex === -1 || jungsungIndex === -1 || jongsungIndex === -1) {
    return "";
  }

  const code =
    HANGUL_START +
    chosungIndex * CHOSUNG_BASE +
    jungsungIndex * JUNGSUNG_BASE +
    jongsungIndex;
  return String.fromCharCode(code);
};

// 글자 수를 세는 함수 (자모 포함)
const getCharacterCount = (text: string): number => {
  let count = 0;
  for (const char of text) {
    const disassembled = disassemble(char);
    if (disassembled) {
      // 완성된 한글은 1자로 카운트
      count += 1;
    } else {
      // 자모는 1자로 카운트
      count += 1;
    }
  }
  return count;
};

interface KoreanKeyboardProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

export function KoreanKeyboard({
  value,
  onChange,
  maxLength = 9,
}: KoreanKeyboardProps) {
  const [isShiftPressed, setIsShiftPressed] = useState(false);

  const handleKeyPress = (key: string) => {
    // 최대 길이 체크
    if (getCharacterCount(value) >= maxLength) {
      return;
    }

    // 쉬프트 적용
    const actualKey = isShiftPressed && SHIFT_MAP[key] ? SHIFT_MAP[key] : key;

    // 쉬프트 해제
    if (isShiftPressed) {
      setIsShiftPressed(false);
    }

    const newValue = (() => {
      if (value.length === 0) {
        return actualKey;
      }

      const lastChar = value[value.length - 1];
      const disassembled = disassemble(lastChar);

      // 마지막 글자가 완성된 한글인 경우
      if (disassembled) {
        const [chosung, jungsung, jongsung] = disassembled;

        // 자음 입력
        if (CHOSUNG_LIST.includes(actualKey)) {
          // 종성이 있는 경우
          if (jongsung) {
            // 먼저 종성과 새 자음이 겹받침을 만들 수 있는지 확인
            if (JONGSUNG_COMBINATIONS[jongsung]?.[actualKey]) {
              const combinedJongsung =
                JONGSUNG_COMBINATIONS[jongsung][actualKey];
              return (
                value.slice(0, -1) +
                assemble(chosung, jungsung, combinedJongsung)
              );
            }

            // 겹받침을 만들 수 없으면, 그냥 새로운 자음 추가
            return value + actualKey;
          }
          // 종성이 없는 경우 - 새로운 종성으로 추가 시도
          if (JONGSUNG_LIST.includes(actualKey)) {
            return value.slice(0, -1) + assemble(chosung, jungsung, actualKey);
          }
          // 종성으로 쓸 수 없는 자음이면 새 글자 시작
          return value + actualKey;
        }

        // 모음 입력
        if (JUNGSUNG_LIST.includes(actualKey)) {
          // 종성이 있는 경우 - 종성을 초성으로 새 글자 시작
          if (jongsung) {
            // 겹받침 분리 가능 여부 확인
            for (const [first, combos] of Object.entries(
              JONGSUNG_COMBINATIONS,
            )) {
              if (Object.values(combos).includes(jongsung)) {
                const [second] = Object.entries(combos).find(
                  ([, result]) => result === jongsung,
                )!;
                const newLastChar = assemble(chosung, jungsung, first);
                const newChar = assemble(second, actualKey, "");
                return value.slice(0, -1) + newLastChar + newChar;
              }
            }

            const newLastChar = assemble(chosung, jungsung, "");
            const newChar = assemble(jongsung, actualKey, "");
            return value.slice(0, -1) + newLastChar + newChar;
          }

          // 중성 결합 시도 (ㅗ + ㅏ = ㅘ 등)
          if (JUNGSUNG_COMBINATIONS[jungsung]?.[actualKey]) {
            const combinedJungsung = JUNGSUNG_COMBINATIONS[jungsung][actualKey];
            return value.slice(0, -1) + assemble(chosung, combinedJungsung, "");
          }

          // 결합 불가능하면 새 글자 시작
          return value + actualKey;
        }
      }

      // 마지막 글자가 자모인 경우
      // 자음 + 모음 조합
      if (
        CHOSUNG_LIST.includes(lastChar) &&
        JUNGSUNG_LIST.includes(actualKey)
      ) {
        return value.slice(0, -1) + assemble(lastChar, actualKey, "");
      }

      // 자음 + 자음 조합 (쌍자음) - 쉬프트가 아닌 경우에만
      if (
        !isShiftPressed &&
        lastChar === actualKey &&
        ["ㄱ", "ㄷ", "ㅂ", "ㅅ", "ㅈ"].includes(actualKey)
      ) {
        const doubled: Record<string, string> = {
          ㄱ: "ㄲ",
          ㄷ: "ㄸ",
          ㅂ: "ㅃ",
          ㅅ: "ㅆ",
          ㅈ: "ㅉ",
        };
        return value.slice(0, -1) + doubled[actualKey];
      }

      // 모음 + 모음 조합
      if (JUNGSUNG_COMBINATIONS[lastChar]?.[actualKey]) {
        return value.slice(0, -1) + JUNGSUNG_COMBINATIONS[lastChar][actualKey];
      }

      // 그 외의 경우 그냥 추가
      return value + actualKey;
    })();

    onChange(newValue);
  };

  const handleBackspace = () => {
    if (value.length === 0) {
      onChange("");
      return;
    }

    const lastChar = value[value.length - 1];
    const disassembled = disassemble(lastChar);

    if (disassembled) {
      const [chosung, jungsung, jongsung] = disassembled;

      // 종성이 있으면 종성만 제거
      if (jongsung) {
        // 겹받침인 경우 분리
        for (const [first, combos] of Object.entries(JONGSUNG_COMBINATIONS)) {
          if (Object.values(combos).includes(jongsung)) {
            onChange(value.slice(0, -1) + assemble(chosung, jungsung, first));
            return;
          }
        }
        onChange(value.slice(0, -1) + assemble(chosung, jungsung, ""));
        return;
      }

      // 중성만 있는 경우
      // 복합 모음 분리
      for (const [first, combos] of Object.entries(JUNGSUNG_COMBINATIONS)) {
        if (Object.values(combos).includes(jungsung)) {
          onChange(value.slice(0, -1) + assemble(chosung, first, ""));
          return;
        }
      }

      // 단일 모음이면 초성만 남김
      onChange(value.slice(0, -1) + chosung);
      return;
    }

    // 쌍자음 분리
    const doubledReverse: Record<string, string> = {
      ㄲ: "ㄱ",
      ㄸ: "ㄷ",
      ㅃ: "ㅂ",
      ㅆ: "ㅅ",
      ㅉ: "ㅈ",
    };
    if (doubledReverse[lastChar]) {
      onChange(value.slice(0, -1) + doubledReverse[lastChar]);
      return;
    }

    // 복합 모음 분리
    for (const [first, combos] of Object.entries(JUNGSUNG_COMBINATIONS)) {
      if (Object.values(combos).includes(lastChar)) {
        onChange(value.slice(0, -1) + first);
        return;
      }
    }

    // 일반 문자는 그냥 제거
    onChange(value.slice(0, -1));
  };

  const handleShift = () => {
    setIsShiftPressed(!isShiftPressed);
  };

  return (
    <div className="font-pretendard flex flex-col gap-6">
      {/* 첫 번째 줄 */}
      <div className="flex h-30 justify-center gap-3">
        {KOREAN_KEYBOARD.consonants.map((key) => (
          <button
            key={key}
            onClick={() => handleKeyPress(key)}
            className="w-17 rounded-lg bg-white shadow-[inset_0rem_-0.3125rem_0rem_0rem_rgba(0,0,0,0.25)]"
          >
            <span className="text-5xl leading-[120%] font-medium tracking-[-1px] text-black max-sm:text-3xl">
              {isShiftPressed && SHIFT_MAP[key] ? SHIFT_MAP[key] : key}
            </span>
          </button>
        ))}
      </div>

      {/* 두 번째 줄 */}
      <div className="flex h-30 justify-center gap-3">
        {KOREAN_KEYBOARD.vowels.map((key) => (
          <button
            key={key}
            onClick={() => handleKeyPress(key)}
            className="w-17 rounded-lg bg-white shadow-[inset_0rem_-0.3125rem_0rem_0rem_rgba(0,0,0,0.25)]"
          >
            <span className="text-5xl leading-[120%] font-medium tracking-[-1px] text-black max-sm:text-3xl">
              {key}
            </span>
          </button>
        ))}
      </div>

      {/* 세 번째 줄 */}
      <div className="flex justify-center gap-3">
        {/* Shift 버튼 */}
        <button
          onClick={handleShift}
          className={`rounded-lg px-8.5 py-9 shadow-[inset_0rem_-0.3125rem_0rem_0rem_rgba(0,0,0,0.25)] ${
            isShiftPressed ? "bg-[#777777]" : "bg-[#CFCFCF]"
          }`}
        >
          <ShiftIcon className="h-12 w-12" />
        </button>

        {/* 중간 키들 */}
        {KOREAN_KEYBOARD.bottom.map((key) => (
          <button
            key={key}
            onClick={() => handleKeyPress(key)}
            className="w-17 rounded-lg bg-white shadow-[inset_0rem_-0.3125rem_0rem_0rem_rgba(0,0,0,0.25)]"
          >
            <span className="text-5xl leading-[120%] font-medium tracking-[-1px] text-black max-sm:text-3xl">
              {key}
            </span>
          </button>
        ))}

        {/* Backspace 버튼 */}
        <button
          onClick={handleBackspace}
          className="rounded-lg bg-[#CFCFCF] px-8.5 py-9 shadow-[inset_0rem_-0.3125rem_0rem_0rem_rgba(0,0,0,0.25)]"
        >
          <BackspaceIcon className="h-12 w-12" />
        </button>
      </div>
    </div>
  );
}
