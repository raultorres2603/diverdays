import React from "react";
import {
  ArrowLeftEndOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import { mContext } from "../contexts/MainContext";
import { BackwardIcon } from "@heroicons/react/24/outline";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const Profile = () => {
  const { setView, user } = useContext(mContext);
  const [birthday, setBirthday] = useState<Date>(
    new Date(user && user.birthday ? user.birthday : new Date())
  );

  return (
    <div>
      <div className="grid grid-cols-2">
        {" "}
        <div className="rounded-full mr-3 w-auto h-1/2">
          {!user ? (
            <Skeleton className="w-full h-full bg-zinc-400 dark:bg-zinc-400 rounded-full" />
          ) : !user.avatar ? (
            <UserCircleIcon className=" bg-zinc-400 text-white dark:bg-zinc-400 rounded-full" />
          ) : (
            <img src={user.avatar} />
          )}
        </div>
        <div>
          {!user ? (
            <>
              <Skeleton className="text-xl bg-zinc-400 mt-3" count={4} />
              <div className="border-2 mt-4"></div>{" "}
              <Skeleton className="text-xl bg-zinc-400 mt-2" count={3} />
            </>
          ) : (
            <div className="grid grid-rows-4 gap-4">
              <input
                className={`form-control border-4 text-xl w-full h-auto text-center rounded-lg ${
                  !user.name ? "border-red-300" : "border-sky-300"
                }`}
                defaultValue={user.name}
                placeholder="Nombre"
              />
              <input
                className={`form-control border-4 text-xl w-full h-auto text-center rounded-lg ${
                  !user.fname ? "border-red-300" : "border-sky-300"
                }`}
                defaultValue={user.fname}
                placeholder="Apellido"
              />
              <select
                className={`form-select rounded-lg border-4 text-xl w-full h-auto text-center ${
                  !user.genre ? "border-red-300" : "border-sky-300"
                }`}
                defaultValue={user.genre ? user.genre : "N"}
              >
                <option value="N">Género</option>
                <option value="H">Hombre</option>
                <option value="M">Mujer</option>
              </select>
              <select
                className={`form-select rounded-lg border-4 text-xl w-full h-auto text-center ${
                  !user.private ? "border-red-300" : "border-sky-300"
                }`}
                defaultValue={user.private ? user.private : "N"}
              >
                <option value="N">Perfil</option>
                <option value="1">Privado</option>
                <option value="0">Público</option>
              </select>
              <div className="border-2"></div>{" "}
              <div className="birthday">
                {!user ? (
                  <div className="grid grid-rows-3 gap-4">
                    {" "}
                    <Skeleton className="text-xl bg-zinc-400" count={1} />
                    <Skeleton className="text-xl bg-zinc-400" count={1} />
                    <Skeleton className="text-xl bg-zinc-400" count={1} />
                  </div>
                ) : (
                  <div className="grid grid-rows-3 gap-2">
                    <div className="birthdayText text-2xl">Cumpleaños</div>
                    <input
                      className={`form-control border-4 text-xl w-full h-auto text-center rounded-lg ${
                        !user.birthday
                          ? birthday == new Date()
                            ? "border-red-300"
                            : "border-sky-300"
                          : "border-sky-300"
                      }`}
                      defaultValue={user && user.birthday && user.birthday}
                      onInput={(e) => {
                        setBirthday(
                          new Date((e.target as HTMLInputElement).value)
                        );
                      }}
                      type="date"
                      placeholder="Fecha de nacimiento"
                    />
                    <input
                      className={`form-control border-4 text-xl w-full h-auto text-center rounded-lg ${
                        !user.birthday
                          ? birthday == new Date()
                            ? "border-red-300"
                            : "border-sky-300"
                          : "border-sky-300"
                      }`}
                      readOnly
                      value={
                        user.birthday
                          ? Math.round(
                              ((new Date() as Date) - new Date(user.birthday)) /
                                1000 /
                                60 /
                                60 /
                                24
                            ).toString()
                          : birthday
                          ? Math.round(
                              (new Date() - birthday) / 1000 / 60 / 60 / 24
                            ).toString()
                          : 0
                      }
                      defaultValue={
                        user.birthday
                          ? Math.round(
                              ((new Date() as Date) - new Date(user.birthday)) /
                                1000 /
                                60 /
                                60 /
                                24
                            ).toString()
                          : birthday
                          ? Math.round(
                              (new Date() - birthday) / 1000 / 60 / 60 / 24
                            ).toString()
                          : 0
                      }
                      placeholder="Fecha de nacimiento"
                    />
                  </div>
                )}
              </div>
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
        className="transition ease-in-out w-14 h-auto fixed bottom-5 right-5 active:scale-90 hover:scale-150"
      />
      <BackwardIcon
        stroke="red"
        onClick={() => {
          setView(1);
        }}
        className="transition ease-in-out w-14 h-auto fixed bottom-5 left-5 active:scale-90 hover:scale-150"
      />
    </div>
  );
};
