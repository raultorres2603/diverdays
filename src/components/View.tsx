import { useEffect, useState } from "react";
import { Login } from "./Login";
import { MainMenu } from "./MainMenu";
import { useCookies } from "react-cookie";

export const View = () => {
  const [cookies] = useCookies(["session"]);
  const [view, setView] = useState(0);

  useEffect(() => {
    if (!cookies.session) {
      setView(0);
    } else {
      setView(1);
    }
  }, [cookies.session]);

  function handleView() {
    switch (view) {
      case 0:
        return (
          <div className="transition duration-700 ease-in-out">
            <Login />
          </div>
        );
        break;

      case 1:
        return (
          <div className="transition duration-700 ease-in-out">
            <MainMenu />
          </div>
        );
        break;

      default:
        break;
    }
  }

  return handleView();
};
