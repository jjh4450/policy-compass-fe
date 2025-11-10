import { LazyComponent } from "@types_/routing.ts";
import React, { Suspense } from "react";
import { Loading } from "@/components/Loading";

/**
 * 컴포넌트를 레이지 로딩하는 함수
 * @param componets 레이지 로딩할 컴포넌트
 * @returns Suspense 컴포넌트
 */
export const lazyLoad = (componets: LazyComponent) => (
  <Suspense fallback={<Loading />}>
    {React.createElement(React.lazy(() => componets))}
  </Suspense>
);
