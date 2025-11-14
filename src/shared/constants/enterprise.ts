/**
 * Enterprise 관련 상수 데이터
 *
 * @remarks
 * 실제 프로덕션 환경에서는 API를 통해 동적으로 가져와야 합니다.
 */

/**
 * 지역 목록
 */
export const REGIONS = [
  { id: 1, name: "서울특별시" },
  { id: 2, name: "부산광역시" },
  { id: 3, name: "대구광역시" },
  { id: 4, name: "인천광역시" },
  { id: 5, name: "광주광역시" },
  { id: 6, name: "대전광역시" },
  { id: 7, name: "울산광역시" },
  { id: 8, name: "세종특별자치시" },
  { id: 9, name: "경기도" },
  { id: 10, name: "강원도" },
] as const;

/**
 * 업종 목록
 */
export const SECTORS = [
  { code: "A", name: "농업, 임업 및 어업" },
  { code: "B", name: "광업" },
  { code: "C", name: "제조업" },
  { code: "D", name: "전기, 가스, 증기 및 공기조절 공급업" },
  { code: "E", name: "수도, 하수 및 폐기물 처리, 원료재생업" },
  { code: "F", name: "건설업" },
  { code: "G", name: "도매 및 소매업" },
  { code: "H", name: "운수 및 창고업" },
  { code: "I", name: "숙박 및 음식점업" },
  { code: "J", name: "정보통신업" },
  { code: "K", name: "금융 및 보험업" },
  { code: "L", name: "부동산업" },
  { code: "M", name: "전문, 과학 및 기술 서비스업" },
  { code: "N", name: "사업시설 관리, 사업 지원 및 임대 서비스업" },
  { code: "O", name: "공공행정, 국방 및 사회보장 행정" },
  { code: "P", name: "교육 서비스업" },
  { code: "Q", name: "보건업 및 사회복지 서비스업" },
  { code: "R", name: "예술, 스포츠 및 여가관련 서비스업" },
  { code: "S", name: "협회 및 단체, 수리 및 기타 개인 서비스업" },
  {
    code: "T",
    name: "가구 내 고용활동 및 달리 분류되지 않은 자가소비 생산활동",
  },
  { code: "U", name: "국제 및 외국기관" },
] as const;

/**
 * 기업 규모 옵션 목록
 */
import { type CompanySize } from "@/shared/types/enterprise";

export const COMPANY_SIZES: CompanySize[] = ["소기업", "중기업", "대기업"];
