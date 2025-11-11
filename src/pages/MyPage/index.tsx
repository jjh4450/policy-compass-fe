import { useCognitoLogout } from "@utils/cognito.ts";

function Index() {
  const { logout } = useCognitoLogout();
  return (
    <div>
      마이페이지 입니다
      <button onClick={logout}>Sign out</button>
    </div>
  );
}

export default Index;
