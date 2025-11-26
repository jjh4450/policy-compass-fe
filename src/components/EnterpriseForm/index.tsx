import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import { useMediaQuery } from "@/shared/utils/useMediaQuery";
import { useEnterpriseStore } from "@/stores/enterpriseStore";
import { BasicInfoSection } from "./BasicInfoSection";
import { CompanyInfoSection } from "./CompanyInfoSection";
import { DetailInfoSection } from "./DetailInfoSection";
import { FormActions } from "./FormActions";
import {
  fetchCompany,
  updateCompany,
  createCompany,
} from "@/shared/api/companyApi";
import {
  companyToEnterpriseForm,
  enterpriseFormToCompanyPayload,
} from "@/shared/utils/companyMapper";

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
  const setFormData = useEnterpriseStore((state) => state.setFormData);
  const companyId = useEnterpriseStore((state) => state.companyId);
  const setCompanyId = useEnterpriseStore((state) => state.setCompanyId);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!companyId) {
      setFetchError(null);
      return;
    }

    let isMounted = true;
    const loadCompany = async () => {
      setFetchError(null);
      setIsFetching(true);
      try {
        const company = await fetchCompany(companyId);
        if (isMounted) {
          setFormData(companyToEnterpriseForm(company));
          setCompanyId(company.id);
        }
      } catch (error) {
        console.error("회사 정보 불러오기 실패:", error);
        if (isMounted) {
          setFetchError("회사 정보를 불러오지 못했습니다.");
        }
      } finally {
        if (isMounted) {
          setIsFetching(false);
        }
      }
    };

    loadCompany();

    return () => {
      isMounted = false;
    };
  }, [companyId, setFormData, setCompanyId]);

  /**
   * 폼 제출 핸들러
   *
   * @param e - 폼 제출 이벤트
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      if (companyId) {
        // 기존 회사 정보 업데이트
        await updateCompany(
          companyId,
          enterpriseFormToCompanyPayload(formData),
        );
        alert("기업 정보가 업데이트되었습니다.");
      } else {
        // 새 회사 생성
        const newCompany = await createCompany(
          enterpriseFormToCompanyPayload(formData),
        );
        setCompanyId(newCompany.id);
        alert("기업 정보가 생성되었습니다.");
      }
    } catch (error) {
      console.error("기업 정보 저장 실패:", error);
      alert("기업 정보를 저장하지 못했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
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

          {fetchError && (
            <p className={cn("text-destructive text-sm mb-4")}>{fetchError}</p>
          )}
          {!fetchError && isFetching && (
            <p className={cn("text-sm mb-4 text-muted-foreground")}>
              회사 정보를 불러오는 중입니다...
            </p>
          )}

          <BasicInfoSection />
          <CompanyInfoSection />
          <DetailInfoSection />

          <FormActions isSubmitting={isSubmitting} />
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
