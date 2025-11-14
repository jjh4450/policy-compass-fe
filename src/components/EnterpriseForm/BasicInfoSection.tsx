import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useEnterpriseStore } from "@/stores/enterpriseStore";
import { formatBizRegNo } from "./utils";

/**
 * 기본 정보 섹션 컴포넌트
 *
 * @remarks
 * 기업명과 사업자등록번호를 입력하는 섹션입니다.
 * 항상 표시되며 접을 수 없습니다.
 */
export function BasicInfoSection() {
  const formData = useEnterpriseStore((state) => state.formData);
  const setFormData = useEnterpriseStore((state) => state.setFormData);

  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="name">
          기업명 <span className={cn("text-destructive")}>*</span>
        </FieldLabel>
        <FieldContent>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ name: e.target.value })}
            placeholder="기업명을 입력하세요"
            required
            maxLength={200}
          />
          <FieldDescription>기업의 공식 명칭을 입력하세요</FieldDescription>
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel htmlFor="bizRegNo">사업자등록번호</FieldLabel>
        <FieldContent>
          <Input
            id="bizRegNo"
            type="text"
            value={formData.bizRegNo}
            onChange={(e) => {
              const formatted = formatBizRegNo(e.target.value);
              setFormData({ bizRegNo: formatted });
            }}
            placeholder="000-00-00000"
            maxLength={12}
          />
          <FieldDescription>
            숫자만 입력하면 자동으로 포맷팅됩니다 (000-00-00000)
          </FieldDescription>
        </FieldContent>
      </Field>
    </FieldGroup>
  );
}
