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
import { REGIONS, SECTORS } from "@/shared/constants/enterprise";
import { collapsibleStyles } from "./styles";
import { parseIntegerInput, parseNumericInput } from "@/shared/utils/formUtils";

/**
 * 상세 정보 섹션 컴포넌트
 *
 * @remarks
 * 지역, 업종, 직원 수, 매출액을 입력하는 Collapsible 섹션입니다.
 * 사용자가 수동으로 토글하여 펼치거나 접을 수 있습니다.
 */
export function DetailInfoSection() {
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
          <span>상세 정보</span>
          <ChevronDownIcon className={collapsibleStyles.chevron(isOpen)} />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className={collapsibleStyles.contentWrapper(isOpen)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="regionId">지역</FieldLabel>
              <FieldContent>
                <Select
                  value={
                    formData.regionId ? formData.regionId.toString() : undefined
                  }
                  onValueChange={(value) =>
                    setFormData({ regionId: parseInt(value, 10) })
                  }
                >
                  <SelectTrigger id="regionId" className="w-full">
                    <SelectValue placeholder="지역을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {REGIONS.map((region) => (
                      <SelectItem key={region.id} value={region.id.toString()}>
                        {region.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldDescription>기업 소재지를 선택하세요</FieldDescription>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="sectorCode">업종</FieldLabel>
              <FieldContent>
                <Select
                  value={formData.sectorCode || undefined}
                  onValueChange={(value) => setFormData({ sectorCode: value })}
                >
                  <SelectTrigger id="sectorCode" className="w-full">
                    <SelectValue placeholder="업종을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {SECTORS.map((sector) => (
                      <SelectItem key={sector.code} value={sector.code}>
                        {sector.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldDescription>
                  기업의 주요 업종을 선택하세요
                </FieldDescription>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="employeesCount">직원 수</FieldLabel>
              <FieldContent>
                <Input
                  id="employeesCount"
                  type="number"
                  value={formData.employeesCount ?? ""}
                  onChange={(e) =>
                    setFormData({
                      employeesCount: parseIntegerInput(e.target.value),
                    })
                  }
                  placeholder="0"
                  min="0"
                />
                <FieldDescription>전체 직원 수를 입력하세요</FieldDescription>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="revenueAmount">매출액 (원)</FieldLabel>
              <FieldContent>
                <Input
                  id="revenueAmount"
                  type="number"
                  value={formData.revenueAmount ?? ""}
                  onChange={(e) =>
                    setFormData({
                      revenueAmount: parseNumericInput(e.target.value),
                    })
                  }
                  placeholder="0"
                  min="0"
                  step="0.01"
                />
                <FieldDescription>연간 매출액을 입력하세요</FieldDescription>
              </FieldContent>
            </Field>
          </FieldGroup>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
