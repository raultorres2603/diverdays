import {
  UserIcon,
  CalendarDaysIcon,
  ArrowLeftEndOnRectangleIcon,
  UserGroupIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/outline";
import User from "../classes/User";
import { mContext } from "../contexts/MainContext";
import { useContext } from "react";

export const MainMenu = () => {
  const { cookies, setView, setUser, user } = useContext(mContext);
  return (
    <>
      <h1 className="text-6xl font-bold dark:text-sky-200 text-sky-700 mb-9 select-none	">
        Menu
      </h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <button
            type="button"
            className="rounded-lg text-white transition ease-in-out bg-sky-700 dark:bg-zinc-900 hover:bg-sky-500 active:scale-90 hover:scale-110 hover:shadow-xl hover:shadow-sky-300/50 hover:border-5 active:bg-sky-500 active:shadow-xl active:shadow-sky-300/50 active:border-5"
            onClick={async () => {
              setView(2);
              setUser(await User.getInfo(cookies?.session as string));
            }}
          >
            <UserIcon className="w-full h-1/2" />
          </button>
        </div>
        <div>
          <button
            type="button"
            className="rounded-lg text-white transition ease-in-out bg-sky-700 dark:bg-zinc-900 hover:bg-sky-500 active:scale-90 hover:scale-110 hover:shadow-xl hover:shadow-sky-300/50 hover:border-5 active:bg-sky-500 active:shadow-xl active:shadow-sky-300/50 active:border-5"
          >
            <CalendarDaysIcon className="w-full h-1/2" />
          </button>
        </div>
        <div>
          <button
            type="button"
            className="rounded-lg text-white transition ease-in-out bg-sky-700 dark:bg-zinc-900 hover:bg-sky-500 active:scale-90 hover:scale-110 hover:shadow-xl hover:shadow-sky-300/50 hover:border-5 active:bg-sky-500 active:shadow-xl active:shadow-sky-300/50 active:border-5"
          >
            <UserGroupIcon className="w-full h-1/2" />
          </button>
        </div>
        <div>
          <button
            type="button"
            className="rounded-lg text-white transition ease-in-out bg-sky-700 dark:bg-zinc-900 hover:bg-sky-500 active:scale-90 hover:scale-110 hover:shadow-xl hover:shadow-sky-300/50 hover:border-5 active:bg-sky-500 active:shadow-xl active:shadow-sky-300/50 active:border-5"
          >
            <Cog8ToothIcon className="w-full h-1/2" />
          </button>
        </div>
      </div>
      <ArrowLeftEndOnRectangleIcon
        stroke="red"
        onClick={() => {
          setView(0);
        }}
        className="transition ease-in-out w-14 h-auto fixed bottom-5 right-5 active:scale-90 hover:scale-150"
      />
    </>
  );
};
