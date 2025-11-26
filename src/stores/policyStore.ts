import { create } from "zustand";
import {
  fetchPolicies,
  fetchOpenRecommendedPolicies,
  fetchKeywordRecommendedPolicies,
  fetchRecommendedPolicies,
  fetchOpenKeywordRecommendedPolicies,
} from "@/shared/api/policyApi";
import type {
  SupportProject,
  SupportProjectListItem,
} from "@/shared/types/supportProject";

interface PolicyState {
  keyword: string;
  results: SupportProjectListItem[];
  isLoading: boolean;
  error: string | null;
  page: number;
  size: number;
  totalPages: number;
  useCompanyInfo: boolean;
  hasSearched: boolean;
  setKeyword: (keyword: string) => void;
  setUseCompanyInfo: (use: boolean) => void;
  search: (keyword?: string, companyId?: string | null) => Promise<void>;
  loadOpenRecommendations: (companyId: string) => Promise<void>;
}

const mapPolicyToListItem = (
  policy: SupportProject,
): SupportProjectListItem => ({
  id: policy.id,
  projectName: policy.projectName,
  organization: policy.organization,
  applicationStatus: policy.applicationStatus,
  applicationEndDate: policy.applicationEndDate,
  budgetAmount: policy.budgetAmount,
});

export const usePolicyStore = create<PolicyState>((set, get) => ({
  keyword: "",
  results: [],
  isLoading: false,
  error: null,
  page: 0,
  size: 20,
  totalPages: 0,
  useCompanyInfo: false,
  hasSearched: false,
  setKeyword: (keyword) => set({ keyword }),
  setUseCompanyInfo: (use) => set({ useCompanyInfo: use }),
  loadOpenRecommendations: async (companyId: string) => {
    set({ isLoading: true, error: null });

    try {
      const policies = await fetchOpenRecommendedPolicies(companyId);
      set({
        results: policies.map(mapPolicyToListItem),
        hasSearched: false,
      });
    } catch (error) {
      console.error("신청 가능한 정책 추천 실패:", error);
      set({
        error: "신청 가능한 정책을 불러오지 못했습니다.",
        results: [],
      });
    } finally {
      set({ isLoading: false });
    }
  },
  search: async (keyword, companyId) => {
    const state = get();
    const query = keyword ?? state.keyword;

    set({ isLoading: true, error: null, keyword: query, hasSearched: true });

    try {
      if (state.useCompanyInfo && companyId) {
        // 기업 정보 포함 검색
        if (query.trim()) {
          // 키워드 포함 맞춤 정책 추천
          const policies = await fetchKeywordRecommendedPolicies(
            companyId,
            query,
          );
          set({
            results: policies.map(mapPolicyToListItem),
          });
        } else {
          // 회사 임베딩 기반 정책 추천 (전체)
          const policies = await fetchRecommendedPolicies(companyId);
          set({
            results: policies.map(mapPolicyToListItem),
          });
        }
      } else {
        // 회사 ID가 없을 때
        if (query.trim()) {
          // 키워드 기반 신청 가능 정책 추천
          const policies = await fetchOpenKeywordRecommendedPolicies(query);
          set({
            results: policies.map(mapPolicyToListItem),
          });
        } else {
          // 키워드가 없으면 일반 검색
          const response = await fetchPolicies({
            page: state.page,
            size: state.size,
            keyword: query || undefined,
          });

          set({
            results: response.content.map(mapPolicyToListItem),
            totalPages: response.totalPages,
          });
        }
      }
    } catch (error) {
      console.error("정책 검색 실패:", error);
      set({
        error: "지원사업을 불러오지 못했습니다.",
        results: [],
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
