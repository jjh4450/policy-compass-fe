import { cn } from "@/lib/utils";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import { useMediaQuery } from "@/shared/utils/useMediaQuery";
import { useEnterpriseStore } from "@/stores/enterpriseStore";
import { BasicInfoSection } from "./BasicInfoSection";
import { CompanyInfoSection } from "./CompanyInfoSection";
import { DetailInfoSection } from "./DetailInfoSection";
import { FormActions } from "./FormActions";

/**
 * Enterprise 입력 폼 컴포넌트
 *
 * @remarks
 * ENTERPRISE 테이블의 모든 입력 가능한 필드를 포함하는 폼입니다.
 *
 * 주요 기능:
 * - 기본 정보(기업명, 사업자등록번호)는 항상 표시
 * - 기업 정보와 상세 정보는 Collapsible로 구성
 * - 입력이 있으면 해당 섹션이 자동으로 펼쳐짐
 * - 사용자가 수동으로 토글 가능
 * - 모든 상태는 Zustand를 통해 전역 관리
 *
 * @example
 * ```tsx
 * <EnterpriseForm />
 * ```
 */
export function EnterpriseForm() {
  const formData = useEnterpriseStore((state) => state.formData);
  const isMobile = useMediaQuery("(max-width: 768px)");

  /**
   * 폼 제출 핸들러
   *
   * @param e - 폼 제출 이벤트
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API 호출
    console.log("Enterprise Form Data:", formData);
    alert("기업 정보가 저장되었습니다.");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "w-full mx-auto",
        isMobile ? "max-w-full px-4" : "max-w-2xl",
      )}
    >
      <FieldSet>
        <FieldGroup>
          <h2 className={cn("text-2xl font-bold mb-6")}>기업 정보 입력</h2>

          <BasicInfoSection />
          <CompanyInfoSection />
          <DetailInfoSection />

          <FormActions />
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
