/**
 * 폼 관련 공유 유틸리티 함수들
 */

/**
 * 숫자 문자열을 정제하여 숫자만 남기는 함수
 *
 * @param value - 입력 문자열
 * @returns 숫자만 포함된 문자열
 */
export function sanitizeNumericString(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * 사업자등록번호 포맷팅 함수
 *
 * @param value - 사업자등록번호 문자열 (숫자만)
 * @returns 포맷팅된 사업자등록번호 (000-00-00000 형식)
 */
export function formatBizRegNo(value: string): string {
  const numbers = sanitizeNumericString(value);
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 5) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 5)}-${numbers.slice(5, 10)}`;
}

/**
 * 숫자 입력값을 파싱하는 함수
 *
 * @param value - 입력 문자열
 * @returns 파싱된 숫자 또는 null
 */
export function parseNumericInput(value: string): number | null {
  if (!value || value.trim() === "") return null;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? null : parsed;
}

/**
 * 정수 입력값을 파싱하는 함수
 *
 * @param value - 입력 문자열
 * @returns 파싱된 정수 또는 null
 */
export function parseIntegerInput(value: string): number | null {
  if (!value || value.trim() === "") return null;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? null : parsed;
}
