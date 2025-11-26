import { routerInfoType } from "../types/routing.ts";

export const routerInfo: routerInfoType[] = [
  {
    path: "/",
    element: import("@/pages/Default"),
    korean: "가입하기",
    expose: true,
  },
  {
    path: "/mypage",
    element: import("@/pages/MyPage"),
    korean: "회사정보",
    expose: true,
    isProtected: true,
  },
  {
    path: "/support-project",
    element: import("@/pages/SupportProjectList"),
    korean: "지원사업 목록",
    expose: true,
  },
  {
    path: "/search",
    element: import("@/pages/Search"),
    korean: "검색",
    expose: true,
  },
  {
    path: "/support-project/detail",
    element: import("@/pages/SupportProjectDetail"),
    expose: false,
  },
  {
    path: "callback",
    element: import("@/pages/OidcCallback.tsx"),
  },
];

export default routerInfo;
