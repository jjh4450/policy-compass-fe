import { useEffect, useState } from "react";
import { SupportProjectList as SupportProjectListComponent } from "@/components/SupportProject";
import { cn } from "@/lib/utils";
import type {
  SupportProject,
  SupportProjectListItem,
} from "@/shared/types/supportProject";
import { fetchPolicies } from "@/shared/api/policyApi";
import { Button } from "@/components/ui/button";

/**
 * 정부지원사업 목록 페이지
 *
 * @remarks
 * 정부지원사업 목록을 표시하는 페이지입니다.
 * 실제 프로덕션 환경에서는 API를 통해 데이터를 가져와야 합니다.
 */
export default function SupportProjectList() {
  const [projects, setProjects] = useState<SupportProjectListItem[]>([]);
  const [page, setPage] = useState(0);
  const [size] = useState(20);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadPolicies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchPolicies({ page, size });
        if (!isMounted) return;
        setProjects(
          response.content.map((policy: SupportProject) => ({
            id: policy.id,
            projectName: policy.projectName,
            organization: policy.organization,
            applicationStatus: policy.applicationStatus,
            applicationEndDate: policy.applicationEndDate,
            budgetAmount: policy.budgetAmount,
          })),
        );
        setTotalPages(response.totalPages);
      } catch (err) {
        console.error("정책 목록 조회 실패:", err);
        if (isMounted) {
          setError("정책 목록을 불러오지 못했습니다.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadPolicies();

    return () => {
      isMounted = false;
    };
  }, [page, size]);

  return (
    <div className={cn("w-full max-w-7xl mx-auto p-6 space-y-6")}>
      <div className={cn("space-y-2")}>
        <h1 className={cn("text-3xl font-bold")}>정부지원사업 목록</h1>
        <p className={cn("text-muted-foreground")}>
          정부에서 지원하는 다양한 사업 정보를 확인하실 수 있습니다.
        </p>
      </div>

      {error && (
        <div className={cn("rounded-lg border bg-card p-6 text-center")}>
          <p className={cn("text-destructive text-sm font-medium")}>{error}</p>
        </div>
      )}

      <SupportProjectListComponent projects={projects} />

      <div className={cn("flex justify-end items-center gap-4")}>
        <Button
          variant="outline"
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={isLoading || page === 0}
        >
          이전
        </Button>
        <span className={cn("text-sm text-muted-foreground")}>
          {page + 1} / {Math.max(totalPages, 1)}
        </span>
        <Button
          variant="outline"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={isLoading || page >= totalPages - 1}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
