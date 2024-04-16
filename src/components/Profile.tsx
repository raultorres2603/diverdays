import {
  ArrowLeftEndOnRectangleIcon,
  UserCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import React, { FormEventHandler, useContext, useState } from "react";
import { mContext } from "../contexts/MainContext";
import { BackwardIcon } from "@heroicons/react/24/outline";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import User from "../classes/User";
import toast from "react-hot-toast";

export const Profile = () => {
  const { setView, user, loading } = useContext(mContext) || {
    setView: () => {},
    user: new User("", ""),
    loading: true,
  };

  const updateUser: () => Promise<void> = async () => {
    try {
      await user?.updateU();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate: FormEventHandler<HTMLInputElement | HTMLSelectElement> = (
    e
  ) => {
    console.log(e);
    switch ((e.target as HTMLInputElement | HTMLSelectElement).id) {
      case "fname":
        user.fname = (e.target as HTMLInputElement).value;
        console.log(user);
        break;
      case "name":
        user.name = (e.target as HTMLInputElement).value;
        console.log(user);
        break;
      case "birthday":
        user.birthday = new Date((e.target as HTMLInputElement).value);
        console.log(user);
        break;
      case "genre":
        user.genre = (e.target as HTMLSelectElement).value;
        console.log(user);
        break;
      case "profile":
        user.profile = (e.target as HTMLSelectElement).value;
        console.log(user);
        break;
      default:
        break;
    }
  };

  function pushIMG() {
    document.getElementById("avatar")?.click();
  }

  function saveAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0].size > 1000000) {
      toast.error("Tamaño de imagen demasiado grande");
      return;
    }

    if (e.target.files) {
      console.log(e.target.files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        if (reader.result) {
          console.log(reader.result);
          user.avatar = reader.result as string;
        }
      };
    }
  }

  return loading ? (
    <div>
      <div className="grid grid-cols-2">
        {" "}
        <div className="rounded-full w-auto h-1/2 mr-5">
          <Skeleton className="w-full h-full bg-zinc-400 dark:bg-zinc-400 rounded-full" />
        </div>
        <div>
          <>
            <Skeleton className="text-xl bg-zinc-400 mt-3" count={4} />
            <div className="border-2 mt-4"></div>{" "}
            <Skeleton className="text-xl bg-zinc-400 mt-2" count={2} />
          </>
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
        onClick={updateUser}
        className="transition ease-in-out w-14 h-auto fixed bottom-5 right-1/2 active:scale-90 hover:scale-150"
      />
    </div>
  ) : (
    <>
      <div>
        <div className="grid grid-cols-2 gap-5">
          <div className="grid grid-rows-2">
            {" "}
            <div
              className=" rounded-full w-full h-1/2 mr-5 transition-all ease-in-out active:scale-90 duration-300"
              onClick={pushIMG}
            >
              {!user.avatar ? (
                <UserCircleIcon className=" bg-zinc-400 text-white dark:bg-zinc-400 rounded-full" />
              ) : (
                <img
                  src={user.avatar}
                  className="w-full h-full rounded-full transition-all ease-in-out duration-200"
                />
              )}
            </div>
            <div className="avatarInput">
              <input
                type="file"
                id="avatar"
                className="hidden"
                onChange={saveAvatar}
                accept="image/png, image/jpeg, image/jpg image/gif image/webp"
              />
            </div>
          </div>

          <div>
            <div className="grid grid-rows-4 gap-4">
              <input
                className={`form-control border-4 text-xl w-full h-auto text-center rounded-lg border-sky-300`}
                onInput={handleUpdate}
                id="name"
                defaultValue={user.name}
                placeholder="Nombre"
              />
              <input
                className={`form-control border-4 text-xl w-full h-auto text-center rounded-lg border-sky-300`}
                onInput={handleUpdate}
                id="fname"
                defaultValue={user.fname}
                placeholder="Apellido"
              />
              <select
                className={`form-select rounded-lg border-4 text-xl w-full h-auto text-center border-sky-300`}
                onChange={handleUpdate}
                id="genre"
                defaultValue={user.genre ? user.genre : "N"}
              >
                <option value="N">Género</option>
                <option value="H">Hombre</option>
                <option value="M">Mujer</option>
              </select>
              <select
                className={`form-select rounded-lg border-4 text-xl w-full h-auto text-center border-sky-300`}
                id="profile"
                onChange={handleUpdate}
                defaultValue={user.profile ? user.profile : "N"}
              >
                <option value="N">Perfil</option>
                <option value="1">Privado</option>
                <option value="0">Público</option>
              </select>
              <div className="border-2"></div>{" "}
              <div className="birthday">
                <div className="grid grid-rows-3 gap-2">
                  <div className="birthdayText text-2xl">Cumpleaños</div>
                  <input
                    className={`form-control border-4 text-xl w-full h-auto text-center rounded-lg border-sky-300`}
                    id="birthday"
                    defaultValue={
                      user && user.birthday && `${new Date(user.birthday)}`
                    }
                    onInput={handleUpdate}
                    type="date"
                    placeholder="Fecha de nacimiento"
                  />
                </div>
              </div>
            </div>
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
          onClick={updateUser}
          className="transition ease-in-out w-14 h-auto fixed bottom-5 right-1/2 active:scale-90 hover:scale-150"
        />
      </div>
    </>
  );
};
