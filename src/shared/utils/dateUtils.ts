/**
 * 날짜 관련 유틸리티 함수들
 */

/**
 * 날짜 문자열을 포맷팅하는 함수
 *
 * @param dateString - 날짜 문자열 (YYYYMMDDHHmmss 형식 또는 기타)
 * @param format - 포맷 형식 (기본값: 'YYYY-MM-DD')
 * @returns 포맷팅된 날짜 문자열
 *
 * @remarks
 * 입력 형식: YYYYMMDDHHmmss 또는 YYYYMMDD
 * 출력 형식: YYYY-MM-DD 또는 지정된 형식
 */
export function formatDate(
  dateString: string | null | undefined,
  format: "YYYY-MM-DD" | "YYYY.MM.DD" | "YYYY/MM/DD" = "YYYY-MM-DD",
): string {
  if (!dateString) return "-";

  // YYYYMMDDHHmmss 형식 처리
  let dateStr = dateString;
  if (dateString.length >= 8) {
    dateStr = dateString.substring(0, 8);
  }

  // YYYYMMDD 형식 검증
  if (dateStr.length !== 8 || !/^\d{8}$/.test(dateStr)) {
    return dateString; // 형식이 맞지 않으면 원본 반환
  }

  const year = dateStr.substring(0, 4);
  const month = dateStr.substring(4, 6);
  const day = dateStr.substring(6, 8);

  const separator = format.includes(".")
    ? "."
    : format.includes("/")
      ? "/"
      : "-";
  return `${year}${separator}${month}${separator}${day}`;
}

/**
 * 숫자를 천 단위 구분자와 함께 포맷팅하는 함수
 *
 * @param amount - 금액 (숫자)
 * @returns 포맷팅된 금액 문자열
 */
export function formatCurrency(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) return "-";
  return new Intl.NumberFormat("ko-KR").format(amount);
}

/**
 * 금액을 원 단위와 함께 포맷팅하는 함수
 *
 * @param amount - 금액 (숫자)
 * @returns 포맷팅된 금액 문자열 (예: "1,000,000원")
 */
export function formatCurrencyWithUnit(
  amount: number | null | undefined,
): string {
  if (amount === null || amount === undefined) return "-";
  return `${formatCurrency(amount)}원`;
}
