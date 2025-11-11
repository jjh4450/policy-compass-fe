import { Link } from "react-router-dom";
import clsx from "clsx";

function ErrorPage() {
  const styles = {
    container: clsx(
      "flex flex-col items-center justify-center min-h-screen",
      "bg-gradient-to-br from-gray-50 via-white to-indigo-50/30",
      "px-6 py-12",
    ),
    iconContainer: clsx(
      "w-full max-w-md mb-8",
      "flex items-center justify-center",
    ),
    icon: clsx("w-64 h-64 text-indigo-600/20", "animate-pulse"),
    textContainer: clsx("text-center space-y-4 max-w-lg"),
    heading: clsx(
      "text-5xl font-bold text-gray-900 tracking-tight",
      "md:text-6xl",
    ),
    description: clsx("text-lg text-gray-600 font-medium"),
    button: clsx(
      "inline-flex items-center gap-2 mt-6",
      "bg-indigo-600 text-white px-6 py-3 rounded-xl",
      "text-base font-medium",
      "transition-all duration-200",
      "hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30",
      "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
    ),
    arrowIcon: clsx("w-5 h-5"),
  };

  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* 404 숫자 형태 */}
          <circle cx="12" cy="12" r="10" className="opacity-30" />
          <path d="M12 8v4" />
          <path d="M12 16h.01" />
          {/* X 표시 */}
          <path d="M8 8l8 8" className="opacity-50" />
          <path d="M16 8l-8 8" className="opacity-50" />
        </svg>
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.heading}>404 NOT FOUND!</h1>
        <p className={styles.description}>주소를 찾을 수 없습니다.</p>
        <Link to="/" className={styles.button}>
          메인페이지로 가기
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className={styles.arrowIcon}
            viewBox="0 0 24 24"
          >
            <path d="M3 12h18M15 6l6 6-6 6"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
