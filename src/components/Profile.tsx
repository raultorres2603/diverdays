import {
  ArrowLeftEndOnRectangleIcon,
  UserCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { FormEventHandler, useContext, useEffect, useState } from "react";
import { mContext } from "../contexts/MainContext";
import { BackwardIcon } from "@heroicons/react/24/outline";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import User from "../classes/User";

export const Profile = () => {
  const { setView, user, setUser } = useContext(mContext);
  const [userV] = useState<User>(user);

  async function updateUser() {
    try {
      await userV.update();
      setUser(userV);
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdate: FormEventHandler<HTMLInputElement | HTMLSelectElement> = (
    e
  ) => {
    console.log(e);
    switch (e.target.id) {
      case "fname":
        userV.fname = e.target.value;
        console.log(userV);
        break;
      case "name":
        userV.name = e.target.value;
        console.log(userV);
        break;
      case "birthday":
        userV.birthday = new Date(e.target.value);
        console.log(userV);
        break;
      case "genre":
        userV.genre = e.target.value;
        console.log(userV);
        break;
      case "profile":
        userV.profile = e.target.value;
        console.log(userV);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    console.log(userV);
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2">
        {" "}
        <div className="rounded-full w-auto h-1/2 mr-5">
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
                className={`form-control border-4 text-xl w-full h-auto text-center rounded-lg border-sky-300`}
                onInput={handleUpdate}
                id="name"
                defaultValue={userV.name}
                placeholder="Nombre"
              />
              <input
                className={`form-control border-4 text-xl w-full h-auto text-center rounded-lg border-sky-300`}
                onInput={handleUpdate}
                id="fname"
                defaultValue={userV.fname}
                placeholder="Apellido"
              />
              <select
                className={`form-select rounded-lg border-4 text-xl w-full h-auto text-center border-sky-300`}
                onChange={handleUpdate}
                id="genre"
                defaultValue={userV.genre ? userV.genre : "N"}
              >
                <option value="N">Género</option>
                <option value="H">Hombre</option>
                <option value="M">Mujer</option>
              </select>
              <select
                className={`form-select rounded-lg border-4 text-xl w-full h-auto text-center border-sky-300`}
                id="profile"
                onChange={handleUpdate}
                defaultValue={userV.profile ? userV.profile : "N"}
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
                      className={`form-control border-4 text-xl w-full h-auto text-center rounded-lg border-sky-300`}
                      id="birthday"
                      defaultValue={
                        userV &&
                        userV.birthday &&
                        `${new Date(userV.birthday).getFullYear()}-${new Date(
                          userV.birthday
                        ).getMonth()}-${new Date(userV.birthday).getDate()}`
                      }
                      onInput={handleUpdate}
                      type="date"
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

      <CheckCircleIcon
        stroke="green"
        onClick={() => {
          updateUser();
        }}
        className="transition ease-in-out w-14 h-auto fixed bottom-5 right-1/2 active:scale-90 hover:scale-150"
      />
    </div>
  );
};
