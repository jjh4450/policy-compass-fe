import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { useEnterpriseStore } from "@/stores/enterpriseStore";
import type { CompanySize } from "@/shared/types/enterprise";
import { COMPANY_SIZES } from "@/shared/constants/enterprise";
import { collapsibleStyles } from "./styles";

/**
 * 기업 정보 섹션 컴포넌트
 *
 * @remarks
 * 기업 규모와 설립일을 입력하는 Collapsible 섹션입니다.
 * 사용자가 수동으로 토글하여 펼치거나 접을 수 있습니다.
 */
export function CompanyInfoSection() {
  const formData = useEnterpriseStore((state) => state.formData);
  const setFormData = useEnterpriseStore((state) => state.setFormData);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={collapsibleStyles.trigger}
        >
          <span>기업 정보</span>
          <ChevronDownIcon className={collapsibleStyles.chevron(isOpen)} />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className={collapsibleStyles.contentWrapper(isOpen)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="companySize">기업 규모</FieldLabel>
              <FieldContent>
                <Select
                  value={formData.companySize}
                  onValueChange={(value) =>
                    setFormData({ companySize: value as CompanySize })
                  }
                >
                  <SelectTrigger id="companySize" className="w-full">
                    <SelectValue placeholder="기업 규모를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {COMPANY_SIZES.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldDescription>
                  소기업, 중기업, 대기업 중 선택하세요
                </FieldDescription>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="establishedDate">설립일</FieldLabel>
              <FieldContent>
                <Input
                  id="establishedDate"
                  type="date"
                  value={formData.establishedDate}
                  onChange={(e) =>
                    setFormData({ establishedDate: e.target.value })
                  }
                />
                <FieldDescription>기업 설립일을 선택하세요</FieldDescription>
              </FieldContent>
            </Field>
          </FieldGroup>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
