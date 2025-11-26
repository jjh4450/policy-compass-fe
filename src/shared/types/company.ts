/**
 * 회사 정보 타입
 */
export interface Company {
  id: string;
  name: string;
  bizRegNo: string;
  companySize: string;
  region: string[];
  businessSector: string;
  establishedDate: string;
  employeesCount: number;
  revenueAmount: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * 회사 생성/수정 요청 페이로드
 */
export interface CompanyUpsertPayload {
  name: string;
  bizRegNo: string;
  companySize: string;
  region: string[];
  businessSector: string;
  establishedDate: string;
  employeesCount: number;
  revenueAmount: number;
}
