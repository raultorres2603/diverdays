import { useContext } from "react";
import { Login } from "./Login";
import { MainMenu } from "./MainMenu";
import { mContext } from "../contexts/MainContext";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";

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
            <ArrowLeftEndOnRectangleIcon
              stroke="red"
              onClick={() => {
                setView(0);
              }}
              className="transition ease-in-out w-10 h-auto fixed bottom-5 right-5 active:scale-90 hover:scale-150"
            />
          </>
        );
        break;

      default:
        break;
    }
  }

  return handleView();
};
