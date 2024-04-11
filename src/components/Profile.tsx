import React from "react";
import {
  ArrowLeftEndOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useContext } from "react";
import { mContext } from "../contexts/MainContext";
import { BackwardIcon } from "@heroicons/react/24/outline";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const Profile = () => {
  const { setView, user } = useContext(mContext);

  return (
    <div>
      <div className="grid grid-cols-2">
        {" "}
        <div className="w-32 h-32 bg-zinc-400 rounded-full">
          {!user ? (
            <Skeleton className="w-32 h-32 bg-zinc-400 rounded-full" />
          ) : !user.avatar ? (
            <UserCircleIcon />
          ) : (
            <img src={user.avatar} className="rounded-full" />
          )}
        </div>
        <div>
          {!user ? (
            <Skeleton className="text-xl bg-zinc-400" count={1} />
          ) : (
            <input
              className={`form-control text-2xl w-full text-center ${
                !user.name && "border-2 border-cyan-100 rounded-lg"
              }`}
              defaultValue={user.name}
              placeholder="Nombre"
            />
          )}
        </div>
      </div>

      <ArrowLeftEndOnRectangleIcon
        stroke="red"
        onClick={() => {
          setView(0);
        }}
        className="transition ease-in-out w-10 h-auto fixed bottom-5 right-5 active:scale-90 hover:scale-150"
      />
      <BackwardIcon
        stroke="red"
        onClick={() => {
          setView(1);
        }}
        className="transition ease-in-out w-10 h-auto fixed bottom-5 left-5 active:scale-90 hover:scale-150"
      />
    </div>
  );
};
