/**
 * 주어진 문자열에서 숫자 이외의 문자를 제거하고,
 * 선행 0을 제거하며, 지정한 최대 자리수와 최대 값 범위로 제한한 숫자를 반환합니다.
 *
 * @param inputValue - 원본 입력 문자열
 * @param options - 옵션 객체
 * @param options.maxLength - 허용할 최대 자리수 (기본값: 3)
 * @param options.maxValue - 허용할 최대 숫자 값 (기본값: 100)
 * @returns 보정된 숫자 값
 */
export function sanitizeNumericInput(
  inputValue: string,
  options: { maxLength?: number; maxValue?: number } = {},
): number {
  const { maxLength = 3, maxValue = 100 } = options;
  let sanitized = inputValue.replace(/\D/g, "");
  sanitized = sanitized.replace(/^0+(?!$)/, "");
  if (sanitized.length > maxLength) {
    sanitized = sanitized.slice(0, maxLength);
  }
  let numericValue = parseInt(sanitized, 10);
  if (isNaN(numericValue)) {
    numericValue = 0;
  }
  if (numericValue > maxValue) {
    numericValue = maxValue;
  }
  return numericValue;
}
