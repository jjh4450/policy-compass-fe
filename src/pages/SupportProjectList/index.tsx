import { SupportProjectList as SupportProjectListComponent } from "@/components/SupportProject";
import { cn } from "@/lib/utils";
import type { SupportProjectListItem } from "@/shared/types/supportProject";

/**
 * 정부지원사업 목록 페이지
 *
 * @remarks
 * 정부지원사업 목록을 표시하는 페이지입니다.
 * 실제 프로덕션 환경에서는 API를 통해 데이터를 가져와야 합니다.
 */
export default function SupportProjectList() {
  // TODO: 실제로는 API를 통해 데이터를 가져와야 합니다
  // 예시 데이터
  const exampleProjectList: SupportProjectListItem[] = [
    {
      tblkey: 1,
      projectName: "2024년 스마트제조 혁신 지원사업",
      organization: "중소벤처기업부",
      applicationStatus: "모집중",
      applicationEndDate: "20240331235959",
      budgetAmount: 5000000000,
    },
    {
      tblkey: 2,
      projectName: "디지털 뉴딜 지원사업",
      organization: "과학기술정보통신부",
      applicationStatus: "모집예정",
      applicationEndDate: "20240430235959",
      budgetAmount: 3000000000,
    },
    {
      tblkey: 3,
      projectName: "그린 에너지 전환 지원",
      organization: "산업통상자원부",
      applicationStatus: "마감",
      applicationEndDate: "20240228235959",
      budgetAmount: 7000000000,
    },
    {
      tblkey: 4,
      projectName: "스타트업 육성 지원사업",
      organization: "중소벤처기업부",
      applicationStatus: "모집중",
      applicationEndDate: "20240531235959",
      budgetAmount: 2000000000,
    },
    {
      tblkey: 5,
      projectName: "지역혁신 클러스터 구축",
      organization: "과학기술정보통신부",
      applicationStatus: "종료",
      applicationEndDate: "20240131235959",
      budgetAmount: 10000000000,
    },
  ];

  return (
    <div className={cn("w-full max-w-7xl mx-auto p-6 space-y-6")}>
      <div className={cn("space-y-2")}>
        <h1 className={cn("text-3xl font-bold")}>정부지원사업 목록</h1>
        <p className={cn("text-muted-foreground")}>
          정부에서 지원하는 다양한 사업 정보를 확인하실 수 있습니다.
        </p>
      </div>

      <SupportProjectListComponent projects={exampleProjectList} />
    </div>
  );
}
