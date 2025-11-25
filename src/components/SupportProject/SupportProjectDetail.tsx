import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { SupportProject } from "@/shared/types/supportProject";
import { APPLICATION_STATUS_BADGE_VARIANTS } from "@/shared/constants/supportProject";
import { formatDate, formatCurrencyWithUnit } from "@/shared/utils/dateUtils";

/**
 * 정부지원사업 상세 정보 컴포넌트
 *
 * @param project - 정부지원사업 정보 객체
 *
 * @remarks
 * 정부지원사업의 모든 세부 정보를 카드 형태로 표시합니다.
 * Badge를 사용하여 신청 상태를 시각적으로 구분합니다.
 *
 * @example
 * ```tsx
 * <SupportProjectDetail project={projectData} />
 * ```
 */
export function SupportProjectDetail({ project }: { project: SupportProject }) {
  return (
    <div
      className={cn(
        "w-full rounded-lg border bg-card p-6 shadow-sm",
        "space-y-6",
      )}
    >
      {/* 헤더 섹션 */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <h2 className={cn("text-2xl font-bold leading-tight")}>
              {project.projectName}
            </h2>
            <p className={cn("text-muted-foreground text-sm")}>
              {project.organization}
            </p>
          </div>
          {project.applicationStatus && (
            <Badge
              variant={
                APPLICATION_STATUS_BADGE_VARIANTS[project.applicationStatus]
              }
            >
              {project.applicationStatus}
            </Badge>
          )}
        </div>
      </div>

      <Separator />

      {/* 기본 정보 섹션 */}
      <div className={cn("grid gap-4", "md:grid-cols-2")}>
        <DetailItem
          label="신청 시작일"
          value={formatDate(project.applicationStartDate)}
        />
        <DetailItem
          label="신청 마감일"
          value={formatDate(project.applicationEndDate)}
        />
        <DetailItem
          label="사업 시작일"
          value={formatDate(project.projectStartDate)}
        />
        <DetailItem
          label="사업 종료일"
          value={formatDate(project.projectEndDate)}
        />
        <DetailItem
          label="예산 규모"
          value={formatCurrencyWithUnit(project.budgetAmount)}
        />
        {project.projectField && (
          <DetailItem label="분야" value={project.projectField} />
        )}
      </div>

      {/* 설명 섹션 */}
      {project.description && (
        <>
          <Separator />
          <div className="space-y-2">
            <h3 className={cn("text-lg font-semibold")}>사업 설명</h3>
            <p className={cn("text-muted-foreground whitespace-pre-wrap")}>
              {project.description}
            </p>
          </div>
        </>
      )}

      {/* 링크 섹션 */}
      {project.applicationUrl && (
        <>
          <Separator />
          <div className="space-y-2">
            <h3 className={cn("text-lg font-semibold")}>신청 링크</h3>
            <a
              href={project.applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn("text-primary hover:underline", "break-all")}
            >
              {project.applicationUrl}
            </a>
          </div>
        </>
      )}

      {/* 출처 정보 */}
      {project.sourceApi && (
        <>
          <Separator />
          <div className="space-y-2">
            <h3 className={cn("text-lg font-semibold")}>데이터 출처</h3>
            <p className={cn("text-muted-foreground text-sm")}>
              {project.sourceApi}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

/**
 * 상세 정보 아이템 컴포넌트
 *
 * @param label - 라벨 텍스트
 * @param value - 값 텍스트
 */
function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <dt className={cn("text-muted-foreground text-sm font-medium")}>
        {label}
      </dt>
      <dd className={cn("text-foreground text-base")}>{value}</dd>
    </div>
  );
}
