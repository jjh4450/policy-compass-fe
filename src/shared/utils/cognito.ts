import { useAuth } from "react-oidc-context";

export const cognitoDomain =
  "https://ap-northeast-2fxungiq1a.auth.ap-northeast-2.amazoncognito.com";
export const clientId = "7vq668vncjdbjto00n49p1l5vs";

/**
 * Cognito 로그아웃 훅
 * - react-oidc-context 내부 세션 제거
 * - Cognito Hosted UI 로그아웃으로 리디렉션
 * @param logoutUri 로그아웃 후 리디렉션될 URI (기본값: window.location.origin)
 */
export const useCognitoLogout = (
  logoutUri?: string,
): { logout: () => void } => {
  const auth = useAuth();

  const logout = (): void => {
    auth.removeUser();
    auth.signoutSilent();

    const redirectUri = logoutUri || window.location.origin;
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(redirectUri)}`;
  };

  return { logout };
};
