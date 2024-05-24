import { useContext } from "react";
import { Login } from "./Login";
import { MainMenu } from "./MainMenu";
import { mContext } from "../contexts/MainContext";
import { Profile } from "./Profile";
import { DiverCalendar } from "./DiverCalendar";
import { Friends } from "./Friends";

export const View = () => {
  const { view } = useContext(mContext) || { view: 0 };

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
        break;

      case 3:
        return <DiverCalendar />;
        break;

      case 4:
        return <Friends />;
        break;

      default:
        break;
    }
  }

  return handleView();
};
