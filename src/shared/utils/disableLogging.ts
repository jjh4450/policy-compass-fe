/**
 * 현재 환경이 프로덕션(`import.meta.env.PROD`)이며,
 * 호스트가 로컬(`localhost`, `127.0.0.1`, `.dev`)이 아닐 경우,
 * 콘솔 메서드 및 전역 에러를 무효화한다.
 *
 * @remarks
 * - 프로덕션 환경에서만 동작하도록 하였고,
 *   로컬 환경에서는 정상적으로 로그가 출력되도록 예외 처리한다.
 * - 전역 에러와 Promise rejection도 무효화하여 콘솔 에러를 차단한다.
 */
function disableLogging(
  localHosts: string[] = ["localhost", "127.0.0.1", ".dev"],
): void {
  const isProduction = import.meta.env.PROD;

  const isLocalEnvironment = (): boolean => {
    const hostname = window.location.hostname;
    return localHosts.some((localHost) => hostname.includes(localHost));
  };

  // 프로덕션 환경이면서 로컬 환경이 아닌 경우 로그 출력 제한
  if (isProduction && !isLocalEnvironment()) {
    const noop = () => {};

    console.log = noop;
    console.warn = noop;
    console.error = noop;
    console.debug = noop;

    window.addEventListener("error", (event) => {
      event.preventDefault();
    });

    window.addEventListener("unhandledrejection", (event) => {
      event.preventDefault();
    });
  }
}

export default disableLogging;
