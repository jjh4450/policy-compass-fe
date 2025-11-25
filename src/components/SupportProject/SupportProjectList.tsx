import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { SupportProjectListItem } from "@/shared/types/supportProject";
import { APPLICATION_STATUS_BADGE_VARIANTS } from "@/shared/constants/supportProject";
import { formatDate, formatCurrencyWithUnit } from "@/shared/utils/dateUtils";

/**
 * 정부지원사업 목록 컴포넌트
 *
 * @param projects - 정부지원사업 목록 배열
 * @param onItemClick - 목록 아이템 클릭 핸들러 (선택적, 제공되지 않으면 기본 라우팅 사용)
 *
 * @remarks
 * 정부지원사업 목록을 테이블 형태로 표시합니다.
 * Badge를 사용하여 신청 상태를 시각적으로 구분합니다.
 * 반응형 디자인을 지원합니다.
 * onItemClick이 제공되지 않으면 기본적으로 /support-project/detail?id={id}로 이동합니다.
 *
 * @example
 * ```tsx
 * <SupportProjectList
 *   projects={projectList}
 *   onItemClick={(project) => navigate(`/projects/${project.id}`)}
 * />
 * ```
 */
export function SupportProjectList({
  projects,
  onItemClick,
}: {
  projects: SupportProjectListItem[];
  onItemClick?: (project: SupportProjectListItem) => void;
}) {
  const navigate = useNavigate();

  const handleItemClick = (project: SupportProjectListItem) => {
    if (onItemClick) {
      onItemClick(project);
    } else {
      // 기본 동작: useSearchParams를 사용하여 상세 페이지로 이동
      navigate(`/support-project/detail?id=${project.id}`);
    }
  };
  if (projects.length === 0) {
    return (
      <div className={cn("w-full rounded-lg border bg-card p-12 text-center")}>
        <p className={cn("text-muted-foreground")}>
          등록된 지원사업이 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("w-full overflow-x-auto rounded-lg border")}>
      <table className={cn("w-full border-collapse")}>
        <thead>
          <tr className={cn("border-b bg-muted/50")}>
            <TableHeader>사업명</TableHeader>
            <TableHeader>주관기관</TableHeader>
            <TableHeader className={cn("hidden md:table-cell")}>
              신청 상태
            </TableHeader>
            <TableHeader className={cn("hidden lg:table-cell")}>
              신청 마감일
            </TableHeader>
            <TableHeader className={cn("hidden xl:table-cell")}>
              예산 규모
            </TableHeader>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <TableRow
              key={project.id}
              project={project}
              onClick={handleItemClick}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * 테이블 헤더 셀 컴포넌트
 */
function TableHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th className={cn("px-4 py-3 text-left text-sm font-semibold", className)}>
      {children}
    </th>
  );
}

/**
 * 테이블 행 컴포넌트
 */
function TableRow({
  project,
  onClick,
}: {
  project: SupportProjectListItem;
  onClick?: (project: SupportProjectListItem) => void;
}) {
  const isClickable = !!onClick;

  return (
    <tr
      className={cn(
        "border-b transition-colors",
        isClickable && "cursor-pointer hover:bg-muted/50",
      )}
      onClick={() => onClick?.(project)}
    >
      <TableCell className={cn("font-medium")}>{project.projectName}</TableCell>
      <TableCell>{project.organization}</TableCell>
      <TableCell className={cn("hidden md:table-cell")}>
        {project.applicationStatus ? (
          <Badge
            variant={
              APPLICATION_STATUS_BADGE_VARIANTS[project.applicationStatus]
            }
          >
            {project.applicationStatus}
          </Badge>
        ) : (
          "-"
        )}
      </TableCell>
      <TableCell className={cn("hidden lg:table-cell")}>
        {formatDate(project.applicationEndDate)}
      </TableCell>
      <TableCell className={cn("hidden xl:table-cell")}>
        {formatCurrencyWithUnit(project.budgetAmount)}
      </TableCell>
    </tr>
  );
}

/**
 * 테이블 셀 컴포넌트
 */
function TableCell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <td className={cn("px-4 py-3 text-sm", className)}>{children}</td>;
}
