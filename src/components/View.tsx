import { useContext } from "react";
import { mContext } from "../contexts/MainContext";
import { Login } from "./Login";
import { MainMenu } from "./MainMenu";
export const View = () => {
  const { cookies } = useContext(mContext);

  function handleView() {
    if (!cookies) {
      return <Login />;
    } else {
      return <MainMenu />;
    }
  }

  return handleView();
};
