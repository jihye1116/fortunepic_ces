import { useState } from "react";

import BackspaceIcon from "@/assets/backspace.svg?react";
import ShiftIcon from "@/assets/shift.svg?react";

const ENGLISH_KEYBOARD = {
  top: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  middle: ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  bottom: ["Z", "X", "C", "V", "B", "N", "M"],
};

interface EnglishKeyboardProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

export function EnglishKeyboard({
  value,
  onChange,
  maxLength = 20,
}: EnglishKeyboardProps) {
  const [isShiftPressed, setIsShiftPressed] = useState(false);

  const handleKeyPress = (key: string) => {
    // 최대 길이 체크
    if (value.length >= maxLength) {
      return;
    }

    // 쉬프트 적용
    const actualKey = isShiftPressed ? key.toUpperCase() : key.toLowerCase();

    // 쉬프트 해제
    if (isShiftPressed) {
      setIsShiftPressed(false);
    }

    onChange(value + actualKey);
  };

  const handleBackspace = () => {
    if (value.length === 0) {
      onChange("");
      return;
    }

    onChange(value.slice(0, -1));
  };

  const handleShift = () => {
    setIsShiftPressed(!isShiftPressed);
  };

  return (
    <div className="font-pretendard flex flex-col gap-6">
      {/* 첫 번째 줄 */}
      <div className="flex h-30 justify-center gap-3">
        {ENGLISH_KEYBOARD.top.map((key) => (
          <button
            key={key}
            onClick={() => handleKeyPress(key)}
            className="w-17 rounded-lg bg-white shadow-[inset_0rem_-0.3125rem_0rem_0rem_rgba(0,0,0,0.25)]"
          >
            <span className="text-5xl leading-[120%] font-medium tracking-[-1px] text-black">
              {isShiftPressed ? key.toUpperCase() : key.toLowerCase()}
            </span>
          </button>
        ))}
      </div>

      {/* 두 번째 줄 */}
      <div className="flex h-30 justify-center gap-3">
        {ENGLISH_KEYBOARD.middle.map((key) => (
          <button
            key={key}
            onClick={() => handleKeyPress(key)}
            className="w-17 rounded-lg bg-white shadow-[inset_0rem_-0.3125rem_0rem_0rem_rgba(0,0,0,0.25)]"
          >
            <span className="text-5xl leading-[120%] font-medium tracking-[-1px] text-black">
              {isShiftPressed ? key.toUpperCase() : key.toLowerCase()}
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
        {ENGLISH_KEYBOARD.bottom.map((key) => (
          <button
            key={key}
            onClick={() => handleKeyPress(key)}
            className="w-17 rounded-lg bg-white shadow-[inset_0rem_-0.3125rem_0rem_0rem_rgba(0,0,0,0.25)]"
          >
            <span className="text-5xl leading-[120%] font-medium tracking-[-1px] text-black">
              {isShiftPressed ? key.toUpperCase() : key.toLowerCase()}
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
