/**
 * SupportProject 관련 상수 데이터
 */

import type { ApplicationStatus } from "@/shared/types/supportProject";

/**
 * 지원사업 신청 상태 옵션 목록
 */
export const APPLICATION_STATUSES: ApplicationStatus[] = [
  "모집예정",
  "모집중",
  "마감",
  "종료",
];

/**
 * 지원사업 신청 상태별 Badge 색상 매핑
 */
export const APPLICATION_STATUS_BADGE_VARIANTS: Record<
  ApplicationStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  모집예정: "outline",
  모집중: "default",
  마감: "secondary",
  종료: "destructive",
} as const;
