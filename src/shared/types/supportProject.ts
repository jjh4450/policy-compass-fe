/**
 * SupportProject 관련 타입 정의
 */

/**
 * 정부지원사업 신청 상태
 */
export type ApplicationStatus = "모집예정" | "모집중" | "마감" | "종료";

/**
 * 정책/정부지원사업 상세 정보
 */
export interface SupportProject {
  id: string;
  projectName: string;
  organization: string;
  applicationStartDate: string | null;
  applicationEndDate: string | null;
  projectStartDate: string | null;
  projectEndDate: string | null;
  applicationStatus: ApplicationStatus | null;
  projectField: string | null;
  description: string | null;
  applicationUrl: string | null;
  budgetAmount: number | null;
  sourceApi: string | null;
}

/**
 * 정부지원사업 목록 요약 정보
 */
export interface SupportProjectListItem {
  id: string;
  projectName: string;
  organization: string;
  applicationStatus: ApplicationStatus | null;
  applicationEndDate: string | null;
  budgetAmount: number | null;
}
