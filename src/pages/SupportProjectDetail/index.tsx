import { useSearchParams, useNavigate } from "react-router-dom";
import { SupportProjectDetail as SupportProjectDetailComponent } from "@/components/SupportProject";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SupportProject } from "@/shared/types/supportProject";
import { ArrowLeftIcon } from "lucide-react";

/**
 * 정부지원사업 상세 정보 페이지
 *
 * @remarks
 * useSearchParams를 통해 전달된 ID를 사용하여 상세 정보를 표시합니다.
 * 실제 프로덕션 환경에서는 ID를 통해 API에서 데이터를 가져와야 합니다.
 *
 * URL 예시: /support-project/detail?id=1
 */
export default function SupportProjectDetail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get("id");

  // TODO: 실제로는 ID를 통해 API에서 데이터를 가져와야 합니다
  // 예시 데이터 (실제로는 API 호출로 대체)
  const exampleProjects: Record<string, SupportProject> = {
    "1": {
      tblkey: 1,
      projectName: "2024년 스마트제조 혁신 지원사업",
      organization: "중소벤처기업부",
      applicationStartDate: "20240101000000",
      applicationEndDate: "20240331235959",
      projectStartDate: "20240401000000",
      projectEndDate: "20241231235959",
      applicationStatus: "모집중",
      fieldCode: "MFG",
      description:
        "중소기업의 스마트제조 도입을 지원하는 사업입니다.\n\n지원 내용:\n- 스마트공장 구축 지원\n- 디지털 전환 컨설팅\n- 인력 양성 프로그램",
      applicationUrl: "https://example.com/apply",
      budgetAmount: 5000000000,
      sourceApi: "정부24 API",
    },
    "2": {
      tblkey: 2,
      projectName: "디지털 뉴딜 지원사업",
      organization: "과학기술정보통신부",
      applicationStartDate: "20240401000000",
      applicationEndDate: "20240430235959",
      projectStartDate: "20240501000000",
      projectEndDate: "20241231235959",
      applicationStatus: "모집예정",
      fieldCode: "IT",
      description:
        "디지털 전환을 위한 혁신 기술 개발을 지원하는 사업입니다.\n\n지원 분야:\n- AI/빅데이터 기술 개발\n- 클라우드 인프라 구축\n- 보안 솔루션 개발",
      applicationUrl: "https://example.com/digital",
      budgetAmount: 3000000000,
      sourceApi: "정부24 API",
    },
    "3": {
      tblkey: 3,
      projectName: "그린 에너지 전환 지원",
      organization: "산업통상자원부",
      applicationStartDate: "20240201000000",
      applicationEndDate: "20240228235959",
      projectStartDate: "20240301000000",
      projectEndDate: "20241130235959",
      applicationStatus: "마감",
      fieldCode: "ENV",
      description:
        "친환경 에너지 전환을 위한 지원사업입니다.\n\n지원 내용:\n- 재생에너지 설비 구축\n- 에너지 효율 개선\n- 탄소 중립 기술 개발",
      applicationUrl: "https://example.com/green",
      budgetAmount: 7000000000,
      sourceApi: "정부24 API",
    },
  };

  if (!id) {
    return (
      <div className={cn("w-full max-w-6xl mx-auto p-6")}>
        <div className={cn("rounded-lg border bg-card p-12 text-center")}>
          <p className={cn("text-muted-foreground")}>
            지원사업 ID가 제공되지 않았습니다.
          </p>
          <Button
            onClick={() => navigate("/")}
            className={cn("mt-4")}
            variant="outline"
          >
            목록으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  const project = exampleProjects[id];

  if (!project) {
    return (
      <div className={cn("w-full max-w-6xl mx-auto p-6")}>
        <div className={cn("rounded-lg border bg-card p-12 text-center")}>
          <p className={cn("text-muted-foreground")}>
            해당 지원사업을 찾을 수 없습니다.
          </p>
          <Button
            onClick={() => navigate("/")}
            className={cn("mt-4")}
            variant="outline"
          >
            목록으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full max-w-6xl mx-auto p-6 space-y-6")}>
      <Button
        onClick={() => navigate(-1)}
        variant="ghost"
        className={cn("gap-2")}
      >
        <ArrowLeftIcon className={cn("size-4")} />
        뒤로 가기
      </Button>

      <SupportProjectDetailComponent project={project} />
    </div>
  );
}
