import React from "react";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { mContext } from "../contexts/MainContext";
import { BackwardIcon } from "@heroicons/react/24/outline";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const Profile = () => {
  const { setView, user } = useContext(mContext);
  return (
    <div>
      {!user && <Skeleton circle={true} className="w-40 h-40" />}
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
