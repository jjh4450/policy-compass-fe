import { useEffect, useState } from "react";
import { useCognitoLogout } from "@utils/cognito.ts";
import { useEnterpriseStore } from "@/stores/enterpriseStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { formatDate, formatCurrencyWithUnit } from "@/shared/utils/dateUtils";
import { formatBizRegNo } from "@/shared/utils/formUtils";
import { REGIONS, SECTORS } from "@/shared/constants/enterprise";
import { fetchCompany } from "@/shared/api/companyApi";
import { companyToEnterpriseForm } from "@/shared/utils/companyMapper";
import { LogOutIcon } from "lucide-react";

/**
 * 마이페이지 컴포넌트
 *
 * @remarks
 * 사용자의 회사 정보를 표시하는 페이지입니다.
 * EnterpriseStore에서 저장된 회사 정보를 가져와 표시합니다.
 */
export default function MyPage() {
  const { logout } = useCognitoLogout();
  const formData = useEnterpriseStore((state) => state.formData);
  const companyId = useEnterpriseStore((state) => state.companyId);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setFormData = useEnterpriseStore((state) => state.setFormData);
  const setCompanyId = useEnterpriseStore((state) => state.setCompanyId);

  useEffect(() => {
    if (!companyId) {
      setError(null);
      return;
    }

    let isMounted = true;
    const loadCompany = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const company = await fetchCompany(companyId);
        if (isMounted) {
          setFormData(companyToEnterpriseForm(company));
          setCompanyId(company.id);
        }
      } catch (err) {
        console.error("회사 정보 조회 실패:", err);
        if (isMounted) {
          setError("회사 정보를 불러오지 못했습니다.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadCompany();

    return () => {
      isMounted = false;
    };
  }, [companyId, setFormData, setCompanyId]);

  const hasData = formData.name !== "";

  return (
    <div className={cn("w-full max-w-4xl mx-auto p-6 space-y-6")}>
      {/* 헤더 섹션 */}
      <div className={cn("flex items-center justify-between")}>
        <div className={cn("space-y-1")}>
          <h1 className={cn("text-3xl font-bold")}>마이페이지</h1>
          <p className={cn("text-muted-foreground")}>
            등록된 회사 정보를 확인하실 수 있습니다.
          </p>
        </div>
        <Button onClick={logout} variant="outline" className={cn("gap-2")}>
          <LogOutIcon className={cn("size-4")} />
          로그아웃
        </Button>
      </div>

      <Separator />

      {!companyId && (
        <div className={cn("rounded-lg border bg-card p-6 text-center")}>
          <p className={cn("text-muted-foreground text-sm")}>
            등록된 회사 정보가 없습니다. 메인 페이지에서 회사 정보를
            입력해주세요.
          </p>
        </div>
      )}

      {isLoading && (
        <div className={cn("rounded-lg border bg-card p-6 text-center")}>
          <p className={cn("text-muted-foreground")}>
            회사 정보를 불러오는 중입니다...
          </p>
        </div>
      )}

      {error && !isLoading && (
        <div className={cn("rounded-lg border bg-card p-6 text-center")}>
          <p className={cn("text-destructive text-sm font-medium")}>{error}</p>
        </div>
      )}

      {/* 회사 정보 카드 */}
      {!isLoading && !error && hasData ? (
        <div
          className={cn(
            "w-full rounded-lg border bg-card p-6 shadow-sm",
            "space-y-6",
          )}
        >
          <div className={cn("space-y-4")}>
            <div className={cn("flex items-start justify-between gap-4")}>
              <div className={cn("flex-1 space-y-2")}>
                <h2 className={cn("text-2xl font-bold leading-tight")}>
                  {formData.name}
                </h2>
                {formData.bizRegNo && (
                  <p className={cn("text-muted-foreground text-sm")}>
                    사업자등록번호: {formatBizRegNo(formData.bizRegNo)}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* 기본 정보 */}
          <div className={cn("grid gap-4", "md:grid-cols-2")}>
            {formData.companySize && (
              <DetailItem
                label="기업 규모"
                value={<Badge variant="outline">{formData.companySize}</Badge>}
              />
            )}
            {formData.establishedDate && (
              <DetailItem
                label="설립일"
                value={formatDate(formData.establishedDate)}
              />
            )}
            {formData.regionId && (
              <DetailItem
                label="지역"
                value={
                  REGIONS.find((r) => r.id === formData.regionId)?.name || "-"
                }
              />
            )}
            {formData.sectorCode && (
              <DetailItem
                label="업종"
                value={
                  SECTORS.find((s) => s.code === formData.sectorCode)?.name ||
                  "-"
                }
              />
            )}
            {formData.employeesCount !== null && (
              <DetailItem
                label="직원 수"
                value={`${formData.employeesCount.toLocaleString()}명`}
              />
            )}
            {formData.revenueAmount !== null && (
              <DetailItem
                label="매출액"
                value={formatCurrencyWithUnit(formData.revenueAmount)}
              />
            )}
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "w-full rounded-lg border bg-card p-12 text-center",
            "space-y-4",
          )}
        >
          <p className={cn("text-muted-foreground text-lg")}>
            등록된 회사 정보가 없습니다.
          </p>
          <p className={cn("text-muted-foreground text-sm")}>
            메인 페이지에서 회사 정보를 입력해주세요.
          </p>
        </div>
      )}
    </div>
  );
}

/**
 * 상세 정보 아이템 컴포넌트
 */
function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string | React.ReactNode;
}) {
  return (
    <div className={cn("space-y-1")}>
      <dt className={cn("text-muted-foreground text-sm font-medium")}>
        {label}
      </dt>
      <dd className={cn("text-foreground text-base")}>{value}</dd>
    </div>
  );
}
