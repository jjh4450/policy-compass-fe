import apiClient from "./httpClient";
import type { SupportProject } from "@/shared/types/supportProject";

interface ApiResponse<T> {
  status: string;
  code: number;
  message: string;
  data: T;
}

interface PaginatedResponse<T> {
  totalElements: number;
  totalPages: number;
  size: number;
  content: T[];
  number: number;
}

export interface PolicyListParams {
  page?: number;
  size?: number;
  sort?: string[];
  keyword?: string;
}

export async function fetchPolicies(
  params: PolicyListParams = {},
): Promise<PaginatedResponse<SupportProject>> {
  const { data } = await apiClient.get<
    ApiResponse<PaginatedResponse<SupportProject>>
  >("/api/policies", { params });
  return data.data;
}

export async function fetchPolicy(id: string): Promise<SupportProject> {
  const { data } = await apiClient.get<ApiResponse<SupportProject>>(
    `/api/policies/${id}`,
  );
  return data.data;
}

export async function fetchRecommendedPolicies(
  companyId: string,
  threshold?: number,
): Promise<SupportProject[]> {
  const { data } = await apiClient.get<ApiResponse<SupportProject[]>>(
    `/policies/recommend/${companyId}`,
    { params: { threshold } },
  );
  return data.data;
}

export async function fetchOpenRecommendedPolicies(
  companyId: string,
): Promise<SupportProject[]> {
  const { data } = await apiClient.get<ApiResponse<SupportProject[]>>(
    `/policies/recommend/${companyId}/open`,
  );
  return data.data;
}

export async function fetchKeywordRecommendedPolicies(
  companyId: string,
  keyword: string,
  threshold?: number,
): Promise<SupportProject[]> {
  const { data } = await apiClient.get<ApiResponse<SupportProject[]>>(
    `/policies/recommend/${companyId}/keyword`,
    {
      params: { q: keyword, threshold },
    },
  );
  return data.data;
}

/**
 * 키워드 기반 신청 가능 정책 추천 (회사 ID 없음)
 * 사용자가 입력한 키워드를 기반으로 현재 신청 가능한 정책만 추천합니다.
 */
export async function fetchOpenKeywordRecommendedPolicies(
  keyword: string,
): Promise<SupportProject[]> {
  const { data } = await apiClient.get<ApiResponse<SupportProject[]>>(
    `/policies/recommend/open/keyword`,
    {
      params: { q: keyword },
    },
  );
  return data.data;
}
