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
    path: "callback",
    element: import("@/pages/OidcCallback.tsx"),
  },
];

export default routerInfo;
