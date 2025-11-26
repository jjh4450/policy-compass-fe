import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import routerInfo from "@/shared/routing/routerInfo.ts";
import { routerInfoType } from "@/shared/types/routing.ts";
import { isCurrentPath } from "@utils/routerUtils.ts";
import { useToggle } from "@utils/useToggle.ts";
import { useMediaQuery } from "@utils/useMediaQuery.ts";
import { useOnClickOutside } from "@utils/useOnClickOutside.ts";
import { useCognitoLogout } from "@utils/cognito.ts";
import clsx from "clsx";
import { useAuth } from "react-oidc-context";
import { Button } from "@/components/ui/button.tsx";
import { useEnterpriseStore } from "@/stores/enterpriseStore";
import { Badge } from "@/components/ui/badge";

const LoginIcon = (
  <svg
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="w-4 h-4"
    viewBox="0 0 24 24"
  >
    <path d="M5 12h14M12 5l7 7-7 7"></path>
  </svg>
);

/**
 * Header 컴포넌트 (개선된 Tailwind CSS 버전)
 * @component
 * @returns {React.ReactElement} Header 컴포넌트 요소
 */
const Header: React.FC = () => {
  const [isActive, handleToggle] = useToggle(false);
  const auth = useAuth();
  const location = useLocation();
  const headerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 1000px)");
  const { logout } = useCognitoLogout();
  const formData = useEnterpriseStore((state) => state.formData);
  const companyId = useEnterpriseStore((state) => state.companyId);
  const companyInfoComplete = !!companyId && !!formData.name;

  /**
   * 데스크탑에서 페이지 이동 시 메뉴 닫기
   */
  useEffect(() => {
    if (isDesktop && isActive) {
      handleToggle();
    }
  }, [isDesktop, isActive, handleToggle]);

  useOnClickOutside(headerRef, () => {
    if (isActive) {
      handleToggle();
    }
  });

  // 스타일 클래스 상수
  const styles = {
    header:
      "fixed top-0 left-0 right-0 z-[1000] backdrop-blur-xl bg-white/70 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border-b border-gray-200/50",
    container:
      "flex justify-between items-center px-6 py-3 h-16 lg:px-8 max-lg:px-4",
    logo: "inline-flex items-center justify-center gap-2 text-gray-900 no-underline h-full",
    logoText:
      "font-yeongdo text-xl leading-tight text-center transition-colors hover:text-indigo-600 max-md:text-lg",
    nav: {
      desktop: "hidden lg:flex items-center text-base justify-center gap-1",
      mobile: clsx(
        "lg:hidden absolute top-full right-0 mt-2 p-3 transition-all duration-300 ease-out",
        isActive
          ? "translate-x-0 opacity-100 pointer-events-auto backdrop-blur-xl bg-white/80 rounded-tl-2xl rounded-bl-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-gray-200/50"
          : "translate-x-full opacity-0 pointer-events-none",
      ),
    },
    menuList: {
      desktop: "flex flex-row items-center gap-1",
      mobile: "flex flex-col items-end list-none p-0 m-0",
    },
    menuItem: {
      desktop: "",
      mobile: "my-2 mx-3 text-base",
    },
    menuLink: (isCurrent: boolean) =>
      clsx(
        "inline-block px-4 py-2 no-underline text-sm font-medium rounded-xl transition-all duration-200",
        "hover:bg-gray-100/80",
        isCurrent
          ? "text-indigo-600 font-semibold bg-indigo-50/80"
          : "text-gray-700 hover:text-gray-900",
      ),
    button: {
      desktop:
        "hidden lg:inline-flex items-center gap-1.5 bg-indigo-600 text-white border-0 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30",
      mobile:
        "w-full inline-flex items-center justify-center gap-1.5 bg-indigo-600 text-white border-0 py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-indigo-700",
    },
    toggleBtn:
      "lg:hidden p-2 text-gray-700 hover:text-indigo-600 focus:outline-none transition-colors",
  };

  // 인증 상태에 따라 노출할 라우트 필터링
  const sortedRoutes = routerInfo
    .filter((item: routerInfoType) => {
      if (!item.expose) return false;
      // isProtected가 true인 경우 인증된 사용자만 표시
      if (item.isProtected && !auth.isAuthenticated) return false;
      return true;
    })
    .sort((a: routerInfoType, b: routerInfoType) =>
      a.korean!.localeCompare(b.korean!),
    );

  return (
    <header ref={headerRef} className={styles.header}>
      <div className={styles.container}>
        {/* 로고 */}
        <Link to="/" className={styles.logo}>
          <span className={styles.logoText}>정책나침반</span>
        </Link>

        {/* 데스크탑 네비게이션 */}
        <nav className={styles.nav.desktop}>
          <ul className={styles.menuList.desktop}>
            {sortedRoutes.map((item: routerInfoType) => (
              <li key={item.path} className={styles.menuItem.desktop}>
                <Link
                  to={item.path}
                  className={styles.menuLink(isCurrentPath(item, location))}
                >
                  {item.korean}
                </Link>
              </li>
            ))}
          </ul>
          <Badge
            variant={companyInfoComplete ? "default" : "outline"}
            className="ml-4 hidden lg:inline-flex"
          >
            {companyInfoComplete ? "기업 정보 입력 완료" : "기업 정보 미입력"}
          </Badge>
        </nav>

        {/* 데스크탑 버튼 */}
        {auth.isAuthenticated ? (
          <Button
            className="hidden lg:inline-flex"
            size="slim"
            variant="outline"
            label="로그아웃"
            onClick={logout}
          />
        ) : (
          <Button
            className="hidden lg:inline-flex"
            size="slim"
            label="로그인"
            icon={LoginIcon}
            iconPosition="right"
            onClick={() =>
              auth.signinRedirect({
                state: { from: location.pathname + location.search },
              })
            }
          />
        )}

        {/* 모바일 햄버거 메뉴 버튼 */}
        <button
          onClick={handleToggle}
          className={styles.toggleBtn}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isActive ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* 모바일 메뉴 */}
      <nav className={styles.nav.mobile}>
        <ul className={styles.menuList.mobile}>
          {sortedRoutes.map((item: routerInfoType) => (
            <li key={item.path} className={styles.menuItem.mobile}>
              <Link
                to={item.path}
                className={styles.menuLink(isCurrentPath(item, location))}
                onClick={handleToggle}
              >
                {item.korean}
              </Link>
            </li>
          ))}
          <li className="px-4 py-3">
            {auth.isAuthenticated ? (
              <Button
                fullWidth={true}
                variant="outline"
                label="로그아웃"
                onClick={logout}
              />
            ) : (
              <Button
                fullWidth={true}
                variant="primary"
                label="로그인"
                icon={LoginIcon}
                iconPosition="right"
                onClick={() =>
                  auth.signinRedirect({
                    state: { from: location.pathname + location.search },
                  })
                }
              />
            )}
          </li>
          <li className="px-4 py-2 w-full">
            <Badge
              variant={companyInfoComplete ? "default" : "outline"}
              className="w-full justify-center"
            >
              {companyInfoComplete ? "기업 정보 입력 완료" : "기업 정보 미입력"}
            </Badge>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
