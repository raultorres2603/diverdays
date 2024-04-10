import { useContext } from "react";
import { mContext } from "../contexts/MainContext";
import { Login } from "./Login";
import { MainMenu } from "./MainMenu";
export const View = () => {
  const { session } = useContext(mContext);

  function handleView() {
    if (!session.session) {
      return <Login />;
    } else {
      return <MainMenu />;
    }
  }

  return handleView();
};
