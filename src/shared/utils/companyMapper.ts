import type { Company, CompanyUpsertPayload } from "@/shared/types/company";
import type { EnterpriseFormData } from "@/shared/types/enterprise";
import { REGIONS } from "@/shared/constants/enterprise";

/**
 * 회사 API 데이터를 Enterprise 폼 데이터로 변환
 */
export function companyToEnterpriseForm(company: Company): EnterpriseFormData {
  const regionName = company.region?.[0];
  const region = REGIONS.find((r) => r.name === regionName);

  return {
    name: company.name ?? "",
    bizRegNo: company.bizRegNo ?? "",
    companySize:
      (company.companySize as EnterpriseFormData["companySize"]) ?? "",
    regionId: region?.id ?? null,
    sectorCode: company.businessSector ?? "",
    establishedDate: company.establishedDate ?? "",
    employeesCount: company.employeesCount ?? null,
    revenueAmount: company.revenueAmount ?? null,
  };
}

/**
 * Enterprise 폼 데이터를 회사 API 페이로드로 변환
 */
export function enterpriseFormToCompanyPayload(
  formData: EnterpriseFormData,
): CompanyUpsertPayload {
  const regionName = REGIONS.find(
    (region) => region.id === formData.regionId,
  )?.name;

  return {
    name: formData.name,
    bizRegNo: formData.bizRegNo,
    companySize: formData.companySize || "중소기업",
    region: regionName ? [regionName] : [],
    businessSector: formData.sectorCode || "",
    establishedDate: formData.establishedDate || "",
    employeesCount: formData.employeesCount ?? 0,
    revenueAmount: formData.revenueAmount ?? 0,
  };
}
