import BackspaceIcon from "@/assets/backspace.svg?react";

interface NumberKeyboardProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

export function NumberKeyboard({
  value,
  onChange,
  maxLength = 8,
}: NumberKeyboardProps) {
  const handleKeyPress = (key: string) => {
    // 최대 길이 체크
    if (value.length >= maxLength) {
      return;
    }

    onChange(value + key);
  };

  const handleBackspace = () => {
    if (value.length === 0) {
      return;
    }

    onChange(value.slice(0, -1));
  };

  return (
    <div className="font-pretendard mx-auto my-5 grid w-fit grid-cols-3 gap-3 max-sm:gap-2">
      {/* 1-9 버튼 */}
      {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((key) => (
        <button
          key={key}
          onClick={() => handleKeyPress(key)}
          className="h-27 w-20 rounded-lg bg-white shadow-[inset_0rem_-0.3125rem_0rem_0rem_rgba(0,0,0,0.25)] max-sm:h-24 max-sm:w-16"
        >
          <span className="font-pretendard text-5xl leading-[120%] font-medium tracking-[-1px] text-black max-sm:text-3xl">
            {key}
          </span>
        </button>
      ))}

      {/* 빈 공간 */}
      <div />

      {/* 0 버튼 */}
      <button
        onClick={() => handleKeyPress("0")}
        className="h-27 w-20 rounded-lg bg-white shadow-[inset_0rem_-0.3125rem_0rem_0rem_rgba(0,0,0,0.25)] max-sm:h-24 max-sm:w-16"
      >
        <span className="font-pretendard text-5xl leading-[120%] font-medium tracking-[-1px] text-black max-sm:text-3xl">
          0
        </span>
      </button>

      {/* Backspace 버튼 */}
      <button
        onClick={handleBackspace}
        className="flex h-27 w-20 items-center justify-center rounded-lg bg-[#CFCFCF] shadow-[inset_0rem_-0.3125rem_0rem_0rem_rgba(0,0,0,0.25)] max-sm:h-24 max-sm:w-16"
      >
        <BackspaceIcon className="h-12 w-12" />
      </button>
    </div>
  );
}
