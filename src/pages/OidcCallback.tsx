// pages/OidcCallback.tsx
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import ErrorPage from "@/pages/Error";
import { Loading } from "@/components/Loading";

/**
 * Handles the OIDC redirect. Restores the original path stored in `state`.
 */
export default function OidcCallback() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isLoading) {
      const rawState = auth.user?.state;

      let from = "/";
      if (
        rawState &&
        typeof rawState === "object" &&
        "from" in rawState &&
        typeof rawState.from === "string"
      ) {
        from = rawState.from;
      }

      navigate(from, { replace: true });
    }
  }, [auth, navigate]);

  if (auth.error) {
    return <ErrorPage />;
  }

  return <Loading />;
}
