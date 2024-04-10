import { Login } from "./Login";
import { MainMenu } from "./MainMenu";
import { useCookies } from "react-cookie";

export const View = () => {
  const [cookies] = useCookies(["session"]);

  function handleView() {
    if (!cookies.session) {
      return <Login />;
    } else {
      return <MainMenu />;
    }
  }

  return handleView();
};
