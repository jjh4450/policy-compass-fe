import apiClient from "./httpClient";
import type { Company, CompanyUpsertPayload } from "@/shared/types/company";

interface ApiResponse<T> {
  status: string;
  code: number;
  message: string;
  data: T;
}

export async function fetchCompany(companyId: string): Promise<Company> {
  const { data } = await apiClient.get<ApiResponse<Company>>(
    `/api/companies/${companyId}`,
  );
  return data.data;
}

export async function listCompanies(): Promise<Company[]> {
  const { data } =
    await apiClient.get<ApiResponse<Company[]>>("/api/companies");
  return data.data;
}

export async function createCompany(
  payload: CompanyUpsertPayload,
): Promise<Company> {
  const { data } = await apiClient.post<ApiResponse<Company>>(
    "/api/companies",
    payload,
  );
  return data.data;
}

export async function updateCompany(
  companyId: string,
  payload: CompanyUpsertPayload,
): Promise<Company> {
  const { data } = await apiClient.put<ApiResponse<Company>>(
    `/api/companies/${companyId}`,
    payload,
  );
  return data.data;
}

export async function deleteCompany(companyId: string): Promise<string> {
  const { data } = await apiClient.delete<ApiResponse<string>>(
    `/api/companies/${companyId}`,
  );
  return data.data;
}
