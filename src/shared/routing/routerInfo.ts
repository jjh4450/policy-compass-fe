import { routerInfoType } from "../types/routing.ts";

export const routerInfo: routerInfoType[] = [
  {
    path: "/",
    element: import("@/pages/Default"),
    korean: "메인",
    expose: true,
  },
  {
    path: "callback",
    element: import("@/pages/OidcCallback.tsx"),
  },
];

export default routerInfo;
