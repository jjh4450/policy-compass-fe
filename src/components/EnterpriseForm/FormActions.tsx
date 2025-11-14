import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { useEnterpriseStore } from "@/stores/enterpriseStore";

/**
 * 폼 액션 버튼 컴포넌트
 *
 * @remarks
 * 저장 및 초기화 버튼을 제공합니다.
 * 저장 버튼은 더 넓게, 초기화 버튼은 적절한 너비로 설정됩니다.
 */
export function FormActions() {
  const resetFormData = useEnterpriseStore((state) => state.resetFormData);

  return (
    <FieldGroup className={cn("mt-6 flex-row gap-4")}>
      <Button type="submit" variant="primary" className="flex-1">
        저장
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={resetFormData}
        className="w-32 shrink-0"
      >
        초기화
      </Button>
    </FieldGroup>
  );
}
