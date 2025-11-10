import { useEffect, useState } from "react";

/**
 * 미디어 쿼리를 사용하는 커스텀 훅
 * @param query 원하는 미디어 쿼리
 * @returns 미디어 쿼리 매치 여부
 */
export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia(query).matches;
    }
    return false; // SSR 환경 또는 matchMedia 미지원 브라우저에서 기본값 설정
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }

    const media = window.matchMedia(query);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);

    if (media.addEventListener) {
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    } else if (media.addListener) {
      media.addListener(listener);
      return () => media.removeListener(listener);
    }
  }, [query]);

  return matches;
};
