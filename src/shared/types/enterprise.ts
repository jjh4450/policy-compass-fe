/**
 * Enterprise 관련 타입 정의
 */

/**
 * 기업 규모 타입
 */
export type CompanySize = "중소기업" | "중견기업" | "대기업";

/**
 * Enterprise 폼 데이터 인터페이스
 */
export interface EnterpriseFormData {
  name: string;
  bizRegNo: string;
  companySize: CompanySize | "";
  regionId: number | null;
  sectorCode: string;
  establishedDate: string;
  employeesCount: number | null;
  revenueAmount: number | null;
}
