/* eslint-disable @typescript-eslint/no-unused-vars */
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import OIcon from "@/assets/icons/O.svg?react";
import SmallXIcon from "@/assets/icons/small-X.svg?react";
import XIcon from "@/assets/icons/X.svg?react";
import BlackGradation from "@/assets/images/black-gradation.png";
import CorrectImg from "@/assets/images/correct.png";
import MagpieImg from "@/assets/images/magpie.jpg";
import loadingLottie from "@/assets/lottie/analyze-2.json";

import { NavigationBar } from "./NavigationBar";
import { Title } from "./Title";

export function LoadingScreen() {
  const { t } = useTranslation();
  const [showQuiz, setShowQuiz] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<null | boolean>(null);
  const [showGreatModal, setShowGreatModal] = useState(false);
  const [fadeInQuiz, setFadeInQuiz] = useState(true);
  const [fadeOutQuiz, setFadeOutQuiz] = useState(false);

  // Progress bar state
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 100;
        }
        return prev + 100 / (15 * 20); // 15s, 20fps
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // 단일 OX 퀴즈 문제
  const question = {
    question: "한국에서 까치는\n나쁜 운을 가져오는 새로 여겨져요",
    isTrue: false,
    explanation:
      "한국에서 까치는 반가운 손님이나 좋은 소식을 알리는 길조입니다.",
  };

  const handleAnswer = (answer: boolean) => {
    setSelectedAnswer(answer);
    setShowAnswer(true);
    setTimeout(() => {
      setShowResult(true);
      setShowAnswer(false);

      // If correct (False), show Correct modal then auto close it
      if (answer === false) {
        setShowGreatModal(true);
        setTimeout(() => {
          setShowGreatModal(false);
        }, 2000);
      }
    }, 1200);
  };

  // const resetQuiz = () => {
  //   setShowResult(false);
  //   setShowQuiz(true);
  //   setShowAnswer(false);
  //   setSelectedAnswer(null);
  //   setFadeInQuiz(true);
  //   setFadeOutQuiz(false);
  // };

  const closeQuiz = () => {
    setFadeOutQuiz(true);
    setTimeout(() => {
      setShowQuiz(false);
      setFadeOutQuiz(false);
      setFadeInQuiz(false);
    }, 400);
  };

  return (
    <main className="fixed inset-0 z-50 flex h-dvh flex-col bg-[#1B1C1E]">
      {/* Background Elements from Root Layout */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-80 shadow-[inset_0px_-14px_42.7px_0px_rgba(253,249,219,1),inset_0px_-27px_120px_16px_rgba(91,114,183,1),inset_0px_-43px_140px_15px_rgba(132,149,201,1)]" />
      <img
        src={BlackGradation}
        alt="background gradation"
        className="pointer-events-none absolute top-[-147px] left-1/2 -z-10 z-0 h-[1981px] max-h-[1981px] min-h-[1981px] w-[1343px] max-w-[1343px] min-w-[1343px] -translate-x-1/2 blur-[80px]"
      />

      <div className="relative z-10 w-full">
        <NavigationBar />
        <Title text={t("loading.analyzing")} />
      </div>

      {/* Background Lottie */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <Lottie
          animationData={loadingLottie}
          style={{ width: 1000, height: 1000 }}
        />
      </div>

      {/* Progress Bar Section - Footer */}
      <div className="absolute right-0 bottom-60 left-0 z-10 flex flex-col items-center justify-center">
        <span className="mb-10 text-4xl text-[#878A93]">
          Fetching your fortune details...
        </span>
        <div className="flex h-8 w-[664px] items-center rounded-full bg-[#232325]">
          <div
            className="h-8 rounded-full transition-all duration-100"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #7CA7F8 0%, #F8B5B6 100%)",
            }}
          />
        </div>
      </div>

      {/* Quiz Overlay - Contents.png Style */}
      {showQuiz && (
        <div
          className={`fixed inset-0 z-50 mx-20 flex items-center justify-center transition-all duration-700 ${fadeInQuiz ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"} ${fadeOutQuiz ? "translate-y-10 opacity-0" : ""}`}
        >
          <div className="relative flex w-full flex-col gap-4">
            {/* Main Image Card */}
            <div className="relative w-full overflow-hidden rounded-[24px] shadow-2xl">
              <img
                src={MagpieImg}
                alt="Magpie"
                className="h-120 w-full object-cover"
                draggable={false}
              />
              {/* Dark Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* Mini Quiz Badge */}
              <div className="absolute top-4 right-4 rounded-3xl bg-black/20 px-8 py-6 text-3xl text-[#C2C4C8]">
                Mini Quiz
              </div>

              {/* Text Overlay: Question OR Result */}
              <div className="absolute right-6 bottom-6 left-6">
                {!showResult ? (
                  <h3 className="text-4xl leading-[1.3] whitespace-pre-line text-white drop-shadow-lg">
                    {question.question}
                  </h3>
                ) : (
                  <h3
                    className={`ml-3 text-5xl leading-[1.3] font-medium drop-shadow-lg ${selectedAnswer === false ? "text-[#ADB8DB]" : "text-[#F8B5B6]"}`}
                  >
                    {selectedAnswer === false ? "Good!" : "Nice Try!"}
                  </h3>
                )}
              </div>
            </div>

            {/* Answer Buttons or Result Card */}
            {!showResult ? (
              <div className="mt-5 flex gap-5">
                <button
                  type="button"
                  onClick={() => handleAnswer(true)}
                  className="flex flex-1 items-center justify-center rounded-[20px] bg-[#2C2C2C] py-3 transition-all duration-200 hover:bg-[#3A3A3A] active:scale-95"
                >
                  <OIcon className="h-[90px] w-[90px]" />
                </button>
                <button
                  type="button"
                  onClick={() => handleAnswer(false)}
                  className="flex flex-1 items-center justify-center rounded-[20px] bg-[#2C2C2C] py-3 transition-all duration-200 hover:bg-[#3A3A3A] active:scale-95"
                >
                  <XIcon className="h-[90px] w-[90px]" />
                </button>
              </div>
            ) : (
              <div className="animate-in fade-in mt-5 flex flex-col items-start justify-center rounded-3xl bg-[#171719] p-6 duration-300">
                <div className="mb-4 flex items-center gap-2 rounded-xl bg-[#1B1C1E] px-3 py-1.5">
                  <span className="text-3xl text-[#878A93]">answer </span>
                  {/* <button type="button" onClick={resetQuiz} className="focus:outline-none"> */}
                  <button
                    type="button"
                    onClick={closeQuiz}
                    className="focus:outline-none"
                  >
                    <SmallXIcon className="h-[32px] w-[32px] cursor-pointer" />
                  </button>
                </div>
                <p className="text-left text-4xl leading-relaxed text-[#C2C4C8]">
                  {question.explanation}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Great Modal (Correct Modal) */}
      {showGreatModal && (
        <div className="animate-in fade-in zoom-in absolute top-1/2 left-1/2 z-[60] -translate-x-1/2 -translate-y-1/2 duration-300">
          <div className="flex flex-col items-center justify-center rounded-3xl bg-[#171719]">
            <div className="flex flex-col items-center px-40 py-20">
              <img
                src={CorrectImg}
                alt="Correct Confetti"
                className="h-[472px] w-[472px] object-cover"
                draggable={false}
              />
              <div className="rounded-2xl bg-[#232325] px-12 py-5">
                <span className="text-5xl font-medium tracking-tight text-[#E1E2E4]">
                  Correct!
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
