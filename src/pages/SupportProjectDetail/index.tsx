import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { SupportProjectDetail as SupportProjectDetailComponent } from "@/components/SupportProject";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SupportProject } from "@/shared/types/supportProject";
import { fetchPolicy } from "@/shared/api/policyApi";
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
  const [project, setProject] = useState<SupportProject | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    const loadPolicy = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchPolicy(id);
        if (isMounted) {
          setProject(data);
        }
      } catch (err) {
        console.error("정책 상세 조회 실패:", err);
        if (isMounted) {
          setError("지원사업 정보를 불러오지 못했습니다.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadPolicy();

    return () => {
      isMounted = false;
    };
  }, [id]);

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

  if (!project && !isLoading && !error) {
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

      {isLoading && (
        <div className={cn("rounded-lg border bg-card p-6 text-center")}>
          <p className={cn("text-muted-foreground")}>불러오는 중입니다...</p>
        </div>
      )}

      {error && !isLoading && (
        <div className={cn("rounded-lg border bg-card p-6 text-center")}>
          <p className={cn("text-destructive text-sm font-medium")}>{error}</p>
        </div>
      )}

      {!isLoading && !error && project && (
        <SupportProjectDetailComponent project={project} />
      )}
    </div>
  );
}
