import { useEffect, useState, useMemo } from "react";
import { useEnterpriseStore } from "@/stores/enterpriseStore";

/**
 * Collapsible 섹션의 자동 펼치기/접기 상태를 관리하는 훅
 *
 * @param shouldAutoOpen - 자동으로 펼쳐야 하는지 여부를 결정하는 함수
 * @param dependencies - shouldAutoOpen 함수가 의존하는 값들의 배열
 * @returns [isOpen, setIsOpen, isUserControlled] - 열림 상태, 상태 설정 함수, 사용자 제어 여부
 *
 * @remarks
 * - 입력이 있으면 자동으로 펼쳐집니다
 * - 사용자가 수동으로 토글하면 사용자 제어 모드로 전환됩니다
 * - 사용자 제어 모드에서는 자동 펼치기가 비활성화됩니다
 */
function useAutoCollapsible(
  shouldAutoOpen: () => boolean,
  dependencies: unknown[],
): [boolean, (open: boolean) => void, boolean] {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserControlled, setIsUserControlled] = useState(false);

  const shouldOpen = useMemo(
    () => shouldAutoOpen(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies,
  );

  // 입력 상태에 따라 자동으로 펼치기
  useEffect(() => {
    if (!isUserControlled && shouldOpen) {
      setIsOpen(true);
    }
  }, [shouldOpen, isUserControlled]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    // 사용자가 수동으로 토글하면 사용자 제어 모드로 전환
    setIsUserControlled(true);
  };

  return [isOpen, handleOpenChange, isUserControlled];
}

/**
 * 기업 정보 섹션의 자동 펼치기 조건을 확인하는 훅
 *
 * @remarks
 * 기업 규모나 설립일이 입력되면 자동으로 펼쳐집니다.
 */
export function useCompanyInfoAutoOpen() {
  const formData = useEnterpriseStore((state) => state.formData);
  return useAutoCollapsible(
    () => formData.companySize !== "" || formData.establishedDate !== "",
    [formData.companySize, formData.establishedDate],
  );
}

/**
 * 상세 정보 섹션의 자동 펼치기 조건을 확인하는 훅
 *
 * @remarks
 * 지역, 업종, 직원 수, 매출액 중 하나라도 입력되면 자동으로 펼쳐집니다.
 */
export function useDetailInfoAutoOpen() {
  const formData = useEnterpriseStore((state) => state.formData);
  return useAutoCollapsible(
    () =>
      formData.regionId !== null ||
      formData.sectorCode !== "" ||
      formData.employeesCount !== null ||
      formData.revenueAmount !== null,
    [
      formData.regionId,
      formData.sectorCode,
      formData.employeesCount,
      formData.revenueAmount,
    ],
  );
}
