import { useContext } from "react";
import { mContext } from "../contexts/MainContext";
import User from "../classes/User";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { BackwardIcon } from "@heroicons/react/24/outline";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-hot-toast";

export const DiverCalendar = () => {
  const { setView, user, loading } = useContext(mContext) || {
    setView: () => {},
    user: new User("", ""),
    loading: true,
  };
  return (
    <>
      <div className="title text-4xl font-bold dark:text-sky-200 text-sky-700 select-none">
        DiverCalendar
      </div>

      {/* Footer */}
      <ArrowLeftEndOnRectangleIcon
        stroke="red"
        onClick={() => {
          setView(0);
        }}
        className="transition ease-in-out w-14 h-auto fixed bottom-5 right-5 active:scale-90 hover:scale-150"
      />
      <BackwardIcon
        stroke="red"
        onClick={() => {
          setView(1);
        }}
        className="transition ease-in-out w-14 h-auto fixed bottom-5 left-5 active:scale-90 hover:scale-150"
      />

      <CheckCircleIcon
        stroke="green"
        className="transition ease-in-out w-14 h-auto fixed bottom-5 left-20 active:scale-90 hover:scale-150"
      />
    </>
  );
};
