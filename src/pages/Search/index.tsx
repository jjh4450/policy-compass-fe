import { useEffect } from "react";
import { SearchIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SupportProjectList } from "@/components/SupportProject";
import { usePolicyStore } from "@/stores/policyStore";
import { useEnterpriseStore } from "@/stores/enterpriseStore";

/**
 * 정부지원사업 검색 페이지
 *
 * @remarks
 * 키워드 기반으로 정부지원사업을 검색합니다.
 * 기업 정보 포함 검색 옵션을 선택하면 회사 정보를 기반으로 맞춤 추천을 받을 수 있습니다.
 * 검색 시도가 없을 경우 신청 가능한 정책을 자동으로 표시합니다.
 */
export default function SearchPage() {
  const {
    keyword,
    results,
    isLoading,
    error,
    useCompanyInfo,
    hasSearched,
    setKeyword,
    setUseCompanyInfo,
    search,
    loadOpenRecommendations,
  } = usePolicyStore();
  const companyId = useEnterpriseStore((state) => state.companyId);

  // 초기 로드 시: 검색 시도가 없고 회사 ID가 있으면 신청 가능한 정책 표시
  useEffect(() => {
    if (!hasSearched && companyId) {
      loadOpenRecommendations(companyId);
    }
  }, [hasSearched, companyId, loadOpenRecommendations]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    search(keyword, companyId);
  };

  const handleUseCompanyInfoChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setUseCompanyInfo(event.target.checked);
    // 체크박스 변경 시 즉시 검색 실행
    if (event.target.checked && companyId) {
      if (keyword.trim()) {
        search(keyword, companyId);
      } else {
        loadOpenRecommendations(companyId);
      }
    } else {
      search(keyword, companyId);
    }
  };

  return (
    <div className={cn("w-full max-w-6xl mx-auto p-6 space-y-6")}>
      <div className={cn("space-y-2")}>
        <h1 className={cn("text-3xl font-bold")}>정부지원사업 검색</h1>
        <p className={cn("text-muted-foreground")}>
          키워드를 입력해 관련 지원사업을 찾아보세요.
        </p>
      </div>

      <form onSubmit={handleSubmit} className={cn("space-y-3")}>
        <div
          className={cn("flex flex-col gap-3", "sm:flex-row sm:items-center")}
        >
          <Input
            type="text"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="예: 스마트 제조, 디지털 전환"
            className="flex-1"
          />
          <Button
            type="submit"
            className="gap-2"
            disabled={isLoading}
            variant="primary"
          >
            <SearchIcon className="size-4" />
            {isLoading ? "검색 중..." : "검색"}
          </Button>
        </div>
        {companyId && (
          <div className={cn("flex items-center gap-2")}>
            <input
              type="checkbox"
              id="useCompanyInfo"
              checked={useCompanyInfo}
              onChange={handleUseCompanyInfoChange}
              className={cn(
                "size-4 rounded border-input text-primary",
                "focus:ring-2 focus:ring-primary focus:ring-offset-2",
                "disabled:cursor-not-allowed disabled:opacity-50",
              )}
            />
            <Label
              htmlFor="useCompanyInfo"
              className={cn(
                "text-sm font-medium cursor-pointer",
                "text-foreground",
              )}
            >
              기업 정보 포함 검색
            </Label>
            <span className={cn("text-xs text-muted-foreground")}>
              (회사 정보를 기반으로 맞춤 정책을 추천합니다)
            </span>
          </div>
        )}
      </form>

      <div className={cn("space-y-4")}>
        <div className="flex items-center justify-between">
          <h2 className={cn("text-xl font-semibold")}>
            {!hasSearched && companyId
              ? "신청 가능한 정책 추천"
              : useCompanyInfo
                ? "맞춤 정책 추천"
                : keyword.trim()
                  ? "신청 가능한 정책 추천"
                  : "검색 결과"}{" "}
            ({results.length}건)
          </h2>
          {error && (
            <span className="text-destructive text-sm font-medium">
              {error}
            </span>
          )}
        </div>
        <SupportProjectList projects={results} />
        {!results.length && !isLoading && !error && (
          <div className="rounded-lg border bg-card p-6 text-center text-muted-foreground">
            {!hasSearched && companyId
              ? "신청 가능한 정책이 없습니다."
              : keyword.trim()
                ? "신청 가능한 정책이 없습니다."
                : "검색 결과가 없습니다."}
          </div>
        )}
      </div>
    </div>
  );
}
