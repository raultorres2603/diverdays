import {
  ArrowLeftEndOnRectangleIcon,
  BackwardIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import { mContext } from "../contexts/MainContext";
import Skeleton from "react-loading-skeleton";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
export const Friends = () => {
  const { setView, loading, user } = useContext(mContext) || {
    setView: () => {},
  };
  const [openFriendReq, setOpenFriendReq] = useState(false);
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
            <PlusCircleIcon
              onClick={() => setOpenFriendReq(true)}
              className="transition ease-in-out w-14 h-auto top-0 left-0 dark:text-sky-400 text-sky-700 hover:scale-125 active:scale-100 active:text-sky-500"
            />
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
      <Transition.Root show={openFriendReq} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpenFriendReq}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="dark:bg-slate-800 bg-sky-900 text-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 justify-center flex">
                    <div className="sm:flex sm:items-start">
                      <div className="text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-white font-semibold leading-6"
                        >
                          Agrega a una persona
                        </Dialog.Title>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};
