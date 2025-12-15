import Lottie from "lottie-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import OIcon from "@/assets/icons/O.svg?react";
import SmallXIcon from "@/assets/icons/small-X.svg?react";
import XIcon from "@/assets/icons/X.svg?react";
import CorrectImg from "@/assets/images/correct.png";

import { NavigationBar } from "./NavigationBar";
import { Title } from "./Title";

export function LoadingScreen() {
  const { t } = useTranslation();
  const [showQuiz, setShowQuiz] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<null | boolean>(null);
  const [showGreatModal, setShowGreatModal] = useState(false);
  const [fadeInQuiz, setFadeInQuiz] = useState(true);
  const [fadeOutQuiz, setFadeOutQuiz] = useState(false);

  // 단일 OX 퀴즈 문제
  const question = {
    question: '한국에서 까치는\n나쁜 운을 가져오는 새로 여겨져요',
    isTrue: false,
    explanation: '한국에서 까치는 반가운 손님이나 좋은 소식을 알리는 길조입니다.'
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

  const resetQuiz = () => {
    setShowResult(false);
    setShowQuiz(true);
    setShowAnswer(false);
    setSelectedAnswer(null);
    setFadeInQuiz(true);
    setFadeOutQuiz(false);
  };

  const closeQuiz = () => {
    setFadeOutQuiz(true);
    setTimeout(() => {
      setShowQuiz(false);
      setFadeOutQuiz(false);
      setFadeInQuiz(false);
    }, 400);
  };

  return (
    <main className="fixed inset-0 z-50 flex h-dvh flex-col bg-black">
      <NavigationBar />
      <Title text={t("loading.analyzing")} />
      <div className="px-10">
        <Lottie animationData={loadingLottie} width={1000} height={1000} />
      </div>


      {/* Quiz Overlay - Contents.png Style */}
      {showQuiz && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center  mx-20 transition-all duration-700
            ${fadeInQuiz ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            ${fadeOutQuiz ? 'opacity-0 translate-y-10' : ''}`}
        >
          <div className="relative w-full flex flex-col gap-4">
            
            {/* Main Image Card */}
            <div className="relative w-full  rounded-[24px] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1549608276-5786777e6587?q=80&w=800&auto=format&fit=crop"
                alt="Magpie"
                className="w-full h-120 object-cover"
              />
              {/* Dark Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Mini Quiz Badge */}
              <div className="absolute top-4 right-4 bg-black/20  text-[#C2C4C8] text-3xl px-8 py-6 rounded-3xl">
                Mini Quiz
              </div>

              {/* Text Overlay: Question OR Result */}
              <div className="absolute bottom-6 left-6 right-6">
                {!showResult ? (
                  <h3 className="text-white text-4xl  leading-[1.3] whitespace-pre-line drop-shadow-lg">
                    한국에서 까치는{'\n'}
                    나쁜 운을 가져오는 새로 여겨져요
                  </h3>
                ) : (
                   <h3 className={`ml-3 text-5xl font-semibold leading-[1.3] drop-shadow-lg ${selectedAnswer === false ? 'text-[#5b72b7]' : 'text-[#F8B5B6]'}`}>
                    {selectedAnswer === false ? 'Good!' : 'Nice Try!'}
                  </h3>
                )}
              </div>
            </div>

            {/* Answer Buttons or Result Card */}
            {!showResult ? (
              <div className="flex gap-5 mt-5">
                <button
                  type="button"
                  onClick={() => handleAnswer(true)}
                  className="py-3 flex-1 bg-[#2C2C2C] rounded-[20px] flex items-center justify-center hover:bg-[#3A3A3A] active:scale-95 transition-all duration-200"
                >
                  <OIcon className="w-[90px] h-[90px]" />
                </button>
                <button
                  type="button"
                  onClick={() => handleAnswer(false)}
                  className="flex-1 py-3 bg-[#2C2C2C] rounded-[20px] flex items-center justify-center hover:bg-[#3A3A3A] active:scale-95 transition-all duration-200"
                >
                  <XIcon className="w-[90px] h-[90px]" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-start justify-center p-6 bg-[#171719] rounded-[24px] mt-5 animate-in fade-in duration-300">
                <div className="bg-[#2C2C2C] px-4 py-1.5 rounded-full mb-4 flex items-center gap-2">
                   <span className="text-[#C2C4C8] text-xl">answer </span>
                     <button type="button" onClick={resetQuiz} className="focus:outline-none">
                     {/* <button type="button" onClick={closeQuiz} className="focus:outline-none"> */}
                       <SmallXIcon className="w-[40px] h-[40px] cursor-pointer" />
                     </button>
                </div>
                <p className="text-white/90 text-2xl leading-relaxed text-left">
                  In Korea, magpies are actually considered symbols of good luck and good news
                </p>
                 
              </div>
            )}
          </div>
        </div>
      )}

      {/* Great Modal (Correct Modal) */}
      {showGreatModal && (
        <div className="absolute left-1/2 top-1/2 z-[60] -translate-x-1/2 -translate-y-1/2 animate-in fade-in zoom-in duration-300">
          <div className="bg-[#171719] rounded-3xl flex flex-col items-center justify-center ">
            <div className="px-40 py-20 flex flex-col items-center ">
              <img
                src={CorrectImg}
                alt="Correct Confetti"
                className="w-[472px] h-[472px] object-cover"
                draggable={false}
              />
              <div className="bg-[#232325] rounded-2xl px-12 py-5 ">
                <span className="text-[#E1E2E4] text-5xl font-medium tracking-tight">Correct!</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}