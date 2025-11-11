import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "react-oidc-context";

const authConfig = {
  authority:
    "https://cognito-idp.ap-northeast-2.amazonaws.com/ap-northeast-2_FXuNGiQ1A",
  client_id: "7vq668vncjdbjto00n49p1l5vs",
  redirect_uri: window.location.origin + "/callback",
  response_type: "code",
  post_logout_redirect_uri: window.location.origin,
  scope: "phone openid email",
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider {...authConfig}>
      <App />
    </AuthProvider>
  </StrictMode>,
);
