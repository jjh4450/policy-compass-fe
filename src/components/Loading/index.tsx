import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-light-react";
import loadingAnimation from "@/assets/loading.json";
import clsx from "clsx";

const loadingTexts = [
  "Rolling the dough for the perfect churro...",
  "Adding an extra sprinkle of sugar magic...",
  "Dipping churros in chocolate dreams...",
  "Twisting up a sticky sweet surprise...",
  "Caramelizing the moment, hold tight...",
  "Churro-fying your experience, just a sec...",
  "Sticky goodness is almost ready...",
  "Cinnamon swirl in progress, hang tight!",
  "Glazing your churro dreams, almost there...",
  "Heating up the fryer, stay with us...",
];

export function Loading() {
  const [text, setText] = useState(() => {
    const index = Math.floor(Math.random() * loadingTexts.length);
    return loadingTexts[index];
  });

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setText((prevText) => {
        const baseText = prevText.replace(/\.+$/, "");
        const dots = prevText.match(/\.+$/)?.[0] || "";
        return baseText + (dots.length >= 3 ? "" : dots + ".");
      });
    }, 500);

    return () => clearInterval(dotInterval);
  }, []);

  // 스타일 클래스 상수
  const styles = {
    container: clsx(
      "flex flex-col items-center justify-center min-h-screen",
      "bg-gradient-to-br from-slate-50 via-white to-indigo-50",
      "text-center relative overflow-hidden",
    ),
    backdrop: clsx(
      "absolute inset-0 backdrop-blur-3xl",
      "bg-gradient-to-br from-indigo-50/30 to-slate-50/30",
    ),
    content: "relative z-10 flex flex-col items-center",
    lottieWrapper: clsx(
      "w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64",
      "drop-shadow-2xl",
    ),
    text: clsx(
      "mt-8 px-6",
      "text-lg sm:text-xl md:text-2xl",
      "text-gray-700 font-medium",
      "animate-pulse",
    ),
    spinner: clsx("mt-4 w-2 h-2 rounded-full", "bg-indigo-600 animate-ping"),
  };

  return (
    <div ref={containerRef} className={styles.container}>
      {/* 배경 효과 */}
      <div className={styles.backdrop} />

      {/* 메인 콘텐츠 */}
      <div className={styles.content}>
        <div className={styles.lottieWrapper}>
          <Lottie animationData={loadingAnimation} />
        </div>
        <p className={styles.text}>{text}</p>
        <div className={styles.spinner} />
      </div>
    </div>
  );
}
