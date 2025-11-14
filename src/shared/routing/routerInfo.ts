import { routerInfoType } from "../types/routing.ts";

export const routerInfo: routerInfoType[] = [
  {
    path: "/",
    element: import("@/pages/Default"),
    korean: "메인",
    expose: true,
  },
  {
    path: "/mypage",
    element: import("@/pages/MyPage"),
    korean: "마이페이지-test",
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
