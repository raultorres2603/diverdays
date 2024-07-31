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
import User from "../classes/User";
import toast from "react-hot-toast";
export const Friends = () => {
  const { setView, loading, user, cookies } = useContext(mContext) || {
    setView: () => {},
  };
  const [openFriendReq, setOpenFriendReq] = useState(false);
  const [openAcceptFriend, setOpenAcceptFriend] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");
  const [friendSelected, setFriendSelected] = useState<User | null>(null);

  async function findUsers(): Promise<User[] | undefined> {
    if (search.length > 0) {
      try {
        const users = await User.searchUser(cookies?.session as string, search);
        console.log(users);
        if (users instanceof Array) {
          setSearchedUsers(users);
          return users;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  function acceptFriend(friend: User): void {
    if (user) {
      setFriendSelected(friend);
      setOpenAcceptFriend(true);
    }
  }

  function declineOrAcceptFriend(friend: User | null, accept: boolean): void {
    if (user && friend) {
      console.log(friend, accept);
      try {
        user.acceptFriend(friend, accept);
      } catch (error) {
        console.log(error);
      }
    }
  }

  function seeProfile(userF: User): void {
    // see info of friend
    if (user) {
      user.friendss.map((friend) => {
        Object.setPrototypeOf(friend, User.prototype);
        if (friend.id === userF.id) {
          console.log(friend);
        }
      });
    }
  }

  async function addFriend(userF: User) {
    console.log(userF);
    if (user) {
      const loading = toast.loading("Añadiendo amistad...");
      try {
        await user.addFriend(userF);
        toast.dismiss(loading);
      } catch (error) {
        toast.dismiss(loading);
        toast.error("Error al añadir amistad");
        console.log(error);
      }
    }
  }

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
            <div className="grid grid-cols-2 lg:grid-cols-4 h-72 w-auto lg:h-80 overflow-auto mt-4">
              {user && user.friends && user.friends.length > 0 && (
                <>
                  {user.friends.map((friend, i) => (
                    <div className="friend w-full" key={i}>
                      <button
                        className={`transition ease-in-out ${
                          friend.accepted
                            ? "bg-sky-700 dark:bg-zinc-900 dark:hover:bg-sky-400 dark:hover:text-zinc-900 hover:bg-sky-500 text-white"
                            : "bg-amber-400 dark:bg-amber-400 dark:hover:bg-amber-500 dark:hover:text-zinc-900 hover:bg-amber-500 text-zinc-900 cursor-not-allowed"
                        } rounded-lg p-2 active:scale-90 hover:scale-105`}
                        onClick={() =>
                          friend.accepted
                            ? seeProfile(friend)
                            : friend.accepted === false
                            ? acceptFriend(friend)
                            : alert("Tienes que esperar a que te acepte.")
                        } // see info of friend if it's accepted or put a modal to accept or not
                        value={friend.id}
                      >
                        {friend.alias}
                      </button>
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
                        <div className="searcher grid grid-cols-2 gap-4 mt-4">
                          <input
                            type="text"
                            name="uName"
                            id="uName"
                            className="transition ease-in-out text-sm lg:text-lg rounded-lg text-center hover:scale-105"
                            placeholder="Usuario"
                            onChange={(e) => {
                              setSearch(e.target.value);
                            }}
                          />
                          <button
                            type="button"
                            className="transition ease-in-out rounded-lg bg-sky-700 dark:bg-sky-500 hover:bg-sky-500 active:scale-90 hover:scale-110 hover:shadow-xl hover:shadow-sky-300/50 hover:border-5 active:bg-sky-500 active:shadow-xl active:shadow-sky-300/50 active:border-5 "
                            onClick={() => findUsers()}
                          >
                            Buscar
                          </button>
                        </div>
                        <div className="mt-4">
                          <div className="searchedUsers border border-8 border-double min-h-48 max-h-48 overflow-auto border-sky-700 dark:border-sky-400">
                            {searchedUsers && (
                              <div className="grid grid-cols-2 m-2 gap-2 lg:grid-cols-4">
                                {searchedUsers.map((userF, i) => (
                                  <button
                                    type="button"
                                    className="transition ease-in-out text-sm lg:text-lg rounded-lg text-center hover:scale-105 active:scale-90 hover:scale-110 hover:shadow-lg hover:shadow-sky-300/50 hover:border-5 active:shadow-xl active:shadow-sky-300/50 active:border-5 "
                                    key={i}
                                    onClick={() => {
                                      addFriend(
                                        Object.setPrototypeOf(
                                          userF,
                                          User.prototype
                                        )
                                      );
                                    }}
                                  >
                                    <img
                                      src={
                                        userF.avatar
                                          ? userF.avatar
                                          : "https://cdn-icons-png.freepik.com/256/149/149071.png?semt=ais_hybrid"
                                      }
                                      alt=""
                                      className="rounded-lg mb-2"
                                    />{" "}
                                    {userF.name} {userF.fname}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={openAcceptFriend} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={setOpenAcceptFriend}
        >
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
                      <div className="text-center sm:ml-4 sm:mt-0 sm:text-left mb-5">
                        <Dialog.Title
                          as="h3"
                          className="text-white font-semibold leading-6"
                        >
                          ¿Quiéres aceptar esta solicitud de
                          {" " + friendSelected?.alias}
                        </Dialog.Title>
                      </div>
                      <div className="acceptOrNot grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          className="acceptButton w-full text-center text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
                          onClick={() =>
                            declineOrAcceptFriend(friendSelected, true)
                          }
                        >
                          Aceptar
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            declineOrAcceptFriend(friendSelected, false)
                          }
                          className="denyButton w-full text-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        >
                          Declinar
                        </button>
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
