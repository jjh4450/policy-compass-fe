import { cn } from "@/lib/utils";

/**
 * Collapsible 섹션의 공통 스타일 클래스
 */
export const collapsibleStyles = {
  /**
   * Collapsible 트리거 버튼 스타일
   */
  trigger: "w-full justify-between",

  /**
   * Chevron 아이콘 스타일
   *
   * @param isOpen - 섹션이 열려있는지 여부
   */
  chevron: (isOpen: boolean) =>
    cn("size-4 transition-transform duration-200", isOpen && "rotate-180"),

  /**
   * Collapsible 컨텐츠 래퍼 스타일
   *
   * @param isOpen - 섹션이 열려있는지 여부
   */
  contentWrapper: (isOpen: boolean) =>
    cn(
      "mt-4 rounded-md border p-4 transition-colors",
      isOpen && "border-input",
    ),
} as const;
