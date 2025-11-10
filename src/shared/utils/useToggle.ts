import { useState } from "react";

/**
 * 토글 상태를 관리하는 커스텀 훅
 * @param initialState 초기 상태 (기본값: false)
 * @returns [state, toggle] 상태와 토글 함수
 */
type UseToggleReturn = [boolean, () => void];

export const useToggle = (initialState: boolean = false): UseToggleReturn => {
  const [state, setState] = useState(initialState);
  const toggle = () => setState((prev) => !prev);
  return [state, toggle];
};

/**
 * 여러 개의 토글 상태를 배열로 관리하는 커스텀 훅
 * @param length 토글할 항목 개수
 * @param initialStates 각 항목의 초기 상태 배열 또는 단일 boolean 값 (기본값: false)
 * @returns [states, toggles] 상태 배열과 토글 함수 배열
 */
export const useToggleArray = (
  length: number,
  initialStates: boolean | boolean[] = false,
): readonly [boolean[], (() => void)[]] => {
  const initialArray = Array.isArray(initialStates)
    ? initialStates
    : Array(length).fill(initialStates);

  if (initialArray.length !== length) {
    throw new Error("initialStates 배열의 길이가 length와 일치해야 합니다");
  }

  const [states, setStates] = useState<boolean[]>(initialArray);

  const toggles = states.map((_, index) => {
    return () => {
      setStates((prevStates) =>
        prevStates.map((value, i) => (i === index ? !value : value)),
      );
    };
  });

  return [states, toggles] as const;
};
