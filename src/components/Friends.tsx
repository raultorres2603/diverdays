import {
  ArrowLeftEndOnRectangleIcon,
  BackwardIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { useContext } from "react";
import { mContext } from "../contexts/MainContext";
import Skeleton from "react-loading-skeleton";

export const Friends = () => {
  const { setView, loading, user } = useContext(mContext) || {
    setView: () => {},
  };
  return (
    <div>
      {loading ? (
        <>
          <Skeleton count={1} className="mb-5" />
          <Skeleton count={2} />
        </>
      ) : (
        <div>
          <div className="friendsTitle">
            <h1 className="text-5xl font-bold dark:text-sky-200 text-sky-700 select-none mb-5">
              Amistades
            </h1>
          </div>
          <div className="friendsCont border-double border-8 border-sky-700 dark:border-sky-200 p-3 rounded-lg relative">
            <PlusCircleIcon className="transition ease-in-out w-14 h-auto top-0 left-0 dark:text-sky-400 text-sky-700 hover:scale-125 active:scale-100 active:text-sky-500" />
            <div className="grid grid-cols-3 lg:grid-cols-4 h-72 lg:h-80 overflow-auto">
              {user && user.friends && user.friends.length > 0 && (
                <>
                  {user.friends.map((friend, i) => (
                    <div className="friend" key={i}>
                      <button value={friend.id}>{friend.name}</button>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
          <div className="footer">
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
        </div>
      )}
    </div>
  );
};
