import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/Layout";
import { lazyLoad } from "@utils/LazyLoad.tsx";
import routerInfo from "@shared/routing/routerInfo.ts";
import RequireAuth from "@/components/RecquireAuth.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: import.meta.env.PROD && lazyLoad(import("@/pages/Error")),
    children: routerInfo.map(({ path, element, isProtected }) => ({
      path,
      element: isProtected ? (
        <RequireAuth>{lazyLoad(element)}</RequireAuth>
      ) : (
        lazyLoad(element)
      ),
    })),
  },
]);
