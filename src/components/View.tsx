import { useContext } from "react";
import { Login } from "./Login";
import { MainMenu } from "./MainMenu";
import { mContext } from "../contexts/MainContext";
import { Profile } from "./Profile";

export const View = () => {
  const { view, setView } = useContext(mContext);

  function handleView() {
    switch (view) {
      case 0:
        return <Login />;
        break;

      case 1:
        return (
          <>
            <MainMenu />{" "}
          </>
        );
        break;
      case 2:
        return (
          <>
            <Profile />
          </>
        );

      default:
        break;
    }
  }

  return handleView();
};
