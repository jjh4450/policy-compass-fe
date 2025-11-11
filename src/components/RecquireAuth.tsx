import React from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import ErrorPage from "@/pages/Error";
import { Loading } from "@/components/Loading";

/**
 * Guards a route: if unauthenticated, initiates OIDC login
 * while remembering the original location via the `state` param.
 */
export default function RequireAuth({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  const auth = useAuth();
  const location = useLocation();

  if (auth.isLoading) return <Loading />;

  if (!auth.isAuthenticated) {
    auth.signinRedirect({
      state: { from: location.pathname + location.search }, //현재 경로를 OIDC 표준 state 객체에 전달
      redirectMethod: "replace",
    });
    return <Loading />;
  }

  // if (auth.error) return <div>Error: {auth.error.message}</div>;
  if (auth.error) return <ErrorPage />;

  /* already logged‑in */
  return children;
}
