/**
 * 정규화 유틸리티
 * @fileoverview 배열 및 값 정규화를 위한 전용 유틸리티
 */

/**
 * 반올림 함수 타입 정의
 */
export type RoundingFunction = (value: number) => number;

/**
 * 정규화 옵션 인터페이스
 */
export interface NormalizeOptions {
  /** 정규화 후 최솟값 (기본값: 0) */
  min?: number;
  /** 정규화 후 최댓값 (기본값: 1) */
  max?: number;
  /** 반올림 함수 (기본값: 소수점 3자리 반올림) */
  roundFn?: RoundingFunction;
}

/**
 * 정규화 유틸리티 클래스
 */
export class Normalizer {
  private static readonly DEFAULT_DECIMALS = 3;

  /**
   * 반올림 함수 생성기
   */
  static readonly Rounding = {
    /**
     * 소수점 n번째 자리에서 반올림
     */
    round:
      (decimals: number = Normalizer.DEFAULT_DECIMALS): RoundingFunction =>
      (value: number) =>
        Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals),

    /**
     * 소수점 n번째 자리에서 내림
     */
    floor:
      (decimals: number = Normalizer.DEFAULT_DECIMALS): RoundingFunction =>
      (value: number) =>
        Math.floor(value * Math.pow(10, decimals)) / Math.pow(10, decimals),

    /**
     * 소수점 n번째 자리에서 올림
     */
    ceil:
      (decimals: number = Normalizer.DEFAULT_DECIMALS): RoundingFunction =>
      (value: number) =>
        Math.ceil(value * Math.pow(10, decimals)) / Math.pow(10, decimals),

    /**
     * 반올림 없음
     */
    none: (): RoundingFunction => (value: number) => value,
  };

  /**
   * 배열을 Min-Max 정규화
   *
   * @param arr 정규화할 숫자 배열
   * @param options 정규화 옵션
   * @returns 정규화된 배열
   *
   * @example
   * ```typescript
   * import { Normalizer } from './normalizeUtils';
   *
   * const data = [10, 20, 30, 40, 50];
   *
   * // 기본 정규화 (0~1)
   * const normalized1 = Normalizer.minMax(data);
   *
   * // 커스텀 범위와 반올림
   * const normalized2 = Normalizer.minMax(data, {
   *   min: 0,
   *   max: 10,
   *   roundFn: Normalizer.Rounding.floor(2)
   * });
   * ```
   */
  static minMax(arr: number[], options: NormalizeOptions = {}): number[] {
    if (arr.length === 0) {
      return [];
    }

    const {
      min: targetMin = 0,
      max: targetMax = 1,
      roundFn = Normalizer.Rounding.round(),
    } = options;

    const arrMin = Math.min(...arr);
    const arrMax = Math.max(...arr);

    // 모든 값이 동일한 경우
    if (arrMin === arrMax) {
      return new Array(arr.length).fill(targetMin);
    }

    // Min-Max 정규화 공식
    return arr.map((value) => {
      const normalized =
        ((value - arrMin) / (arrMax - arrMin)) * (targetMax - targetMin) +
        targetMin;
      return roundFn(normalized);
    });
  }

  /**
   * Z-Score 정규화 (표준화)
   *
   * @param arr 정규화할 숫자 배열
   * @param roundFn 반올림 함수
   * @returns 표준화된 배열
   *
   * @example
   * ```typescript
   * const data = [10, 20, 30, 40, 50];
   * const standardized = Normalizer.zScore(data);
   * ```
   */
  static zScore(
    arr: number[],
    roundFn: RoundingFunction = Normalizer.Rounding.round(),
  ): number[] {
    if (arr.length === 0) {
      return [];
    }

    const mean = arr.reduce((sum, val) => sum + val, 0) / arr.length;
    const variance =
      arr.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / arr.length;
    const stdDev = Math.sqrt(variance);

    // 표준편차가 0인 경우 (모든 값이 동일)
    if (stdDev === 0) {
      return new Array(arr.length).fill(0);
    }

    return arr.map((value) => roundFn((value - mean) / stdDev));
  }

  /**
   * 단일 값을 지정된 범위에서 다른 범위로 정규화
   *
   * @param value 정규화할 값
   * @param fromMin 원본 범위 최솟값
   * @param fromMax 원본 범위 최댓값
   * @param toMin 대상 범위 최솟값
   * @param toMax 대상 범위 최댓값
   * @param roundFn 반올림 함수
   * @returns 정규화된 값
   */
  static mapValue(
    value: number,
    fromMin: number,
    fromMax: number,
    toMin: number = 0,
    toMax: number = 1,
    roundFn: RoundingFunction = Normalizer.Rounding.round(),
  ): number {
    if (fromMin === fromMax) {
      return toMin;
    }

    const normalized =
      ((value - fromMin) / (fromMax - fromMin)) * (toMax - toMin) + toMin;
    return roundFn(normalized);
  }
}

/**
 * 편의를 위한 함수형 인터페이스
 */
export const normalize = Normalizer.minMax;
export const standardize = Normalizer.zScore;
export const mapValue = Normalizer.mapValue;
export const rounding = Normalizer.Rounding;

/**
 * 기본 내보내기
 */
export default Normalizer;
