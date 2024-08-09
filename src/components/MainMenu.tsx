import {
  UserIcon,
  CalendarDaysIcon,
  ArrowLeftEndOnRectangleIcon,
  UserGroupIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/outline";
import User from "../classes/User";
import { mContext } from "../contexts/MainContext";
import { useContext, useEffect, useState } from "react";

export const MainMenu = () => {
  const { cookies, setView, setUser, setLoading, user } = useContext(
    mContext
  ) || {
    cookies: null,
    setView: () => {},
    setUser: () => {},
    user: new User("", ""),
    setLoading: () => {},
  };
  const [friendsRequests, setFriendsRequests] = useState<number>(0);

  useEffect(() => {
    setFriendsRequests(0);
    // for each friend not accepted
    user?.friends?.map((friend) => {
      if (friend.accepted === false) {
        setFriendsRequests(friendsRequests + 1);
      }
    });
  }, [user?.friends]);

  return (
    <>
      <h1 className="text-6xl font-bold dark:text-sky-200 text-sky-700 select-none mb-3	">
        Menu
      </h1>
      {user.birthday && (
        <div className="mx-auto transition-all ease-in-out text-sm mb-3 mt-2 w-max text-center rounded-lg text-white bg-indigo-700 dark:bg-zinc-500 p-1 opacity-100">
          {Math.round(
            (new Date().getTime() - new Date(user.birthday).getTime()) /
              (1000 * 60 * 60 * 24)
          )}{" "}
          diverdias
        </div>
      )}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="relative">
          <button
            type="button"
            className="rounded-lg text-white transition ease-in-out bg-sky-700 dark:bg-zinc-900 hover:bg-sky-500 active:scale-90 hover:scale-110 hover:shadow-xl hover:shadow-sky-300/50 hover:border-5 active:bg-sky-500 active:shadow-xl active:shadow-sky-300/50 active:border-5 "
            onClick={async () => {
              setLoading(true);
              setView(2);
              try {
                const info = await User.getInfo(cookies?.session as string);
                if (typeof info === "boolean") {
                  // Handle boolean case
                } else {
                  setUser(info);
                }
                setLoading(false);
              } catch (error) {
                setLoading(false);
                console.log(error);
              }
            }}
          >
            <UserIcon className="w-full h-1/2" />
          </button>
        </div>
        <div>
          <button
            type="button"
            className="rounded-lg text-white transition ease-in-out bg-sky-700 dark:bg-zinc-900 hover:bg-sky-500 active:scale-90 hover:scale-110 hover:shadow-xl hover:shadow-sky-300/50 hover:border-5 active:bg-sky-500 active:shadow-xl active:shadow-sky-300/50 active:border-5"
            onClick={async () => {
              setLoading(true);
              setView(3);
              try {
                const info = await User.getInfo(cookies?.session as string);
                if (typeof info === "boolean") {
                  // Handle boolean case
                } else {
                  setUser(info);
                }
                setLoading(false);
              } catch (error) {
                setLoading(false);
                console.log(error);
              }
            }}
          >
            <CalendarDaysIcon className="w-full h-1/2" />
          </button>
        </div>
        <div>
          <button
            type="button"
            className="rounded-lg text-white transition ease-in-out bg-sky-700 dark:bg-zinc-900 hover:bg-sky-500 active:scale-90 hover:scale-110 hover:shadow-xl hover:shadow-sky-300/50 hover:border-5 active:bg-sky-500 active:shadow-xl active:shadow-sky-300/50 active:border-5 relative"
          >
            {friendsRequests > 0 ? (
              <div className="rounded-full absolute top-0 right-0 bg-amber-500 dark:bg-amber-400 dark:text-zinc-900 text-lg p-1">
                {friendsRequests}
              </div>
            ) : null}
            <UserGroupIcon
              className="w-full h-1/2"
              onClick={async () => {
                setLoading(true);
                setView(4);
                try {
                  const info = await User.getInfo(cookies?.session as string);
                  if (typeof info === "boolean") {
                    // Handle boolean case
                  } else {
                    setUser(info);
                  }
                  setLoading(false);
                } catch (error) {
                  setLoading(false);
                  console.log(error);
                }
              }}
            />
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
