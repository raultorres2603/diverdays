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
        <div className="w-36 h-36 bg-sky-300 rounded-full">
          {!user ? (
            <Skeleton className="w-36 h-36 bg-zinc-400 dark:bg-zinc-400 rounded-full" />
          ) : !user.avatar ? (
            <UserCircleIcon />
          ) : (
            <img src={user.avatar} className="rounded-full" />
          )}
        </div>
        <div>
          {!user ? (
            <Skeleton className="text-xl bg-zinc-400 my-3" count={3} />
          ) : (
            <div className="grid grid-rows-3 gap-4">
              <input
                className={`form-control border-4 text-2xl w-full text-center rounded-lg ${
                  !user.name ? "border-red-300" : "border-sky-300"
                }`}
                defaultValue={user.name}
                placeholder="Nombre"
              />
              <input
                className={`form-control border-4 text-2xl w-full text-center rounded-lg ${
                  !user.fname ? "border-red-300" : "border-sky-300"
                }`}
                defaultValue={user.fname}
                placeholder="Apellido"
              />
              <select
                className={`form-select rounded-lg border-4 text-2xl w-full text-center ${
                  !user.genre ? "border-red-300" : "border-sky-300"
                }`}
                defaultValue={user.genre ? user.genre : "N"}
              >
                <option value="N">Selecciona</option>
                <option value="H">Hombre</option>
                <option value="M">Mujer</option>
              </select>
            </div>
          )}
        </div>
      </div>
      {/* Footer */}
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
