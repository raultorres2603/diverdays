import { useContext, Fragment, useRef, useState } from "react";
import { mContext } from "../contexts/MainContext";
import User from "../classes/User";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { BackwardIcon } from "@heroicons/react/24/outline";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Dialog, Transition } from "@headlessui/react";

export const DiverCalendar = () => {
  const { setView, loading, user } = useContext(mContext) || {
    setView: () => {},
    user: new User("", ""),
    loading: true,
  };

  const [diverday, setDiverDay] = useState(0);

  const [openDiverDaySet, setOpenDiverDaySet] = useState(false);

  const cancelButtonRef = useRef(null);

  function addDiverDay() {
    const diverCount = Math.round(
      (new Date() - new Date(user.birthday)) / 1000 / 24 / 60 / 60
    );
    if (diverday && diverday > diverCount) {
      try {
        user.actDiverDay(diverday);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log(diverday, diverCount);
      alert("DiverDay tiene que se superior a tu total");
    }
  }

  function comprobDiverDay(diverday: number): string {
    const today: number = Math.round(
      (new Date() - new Date(user.birthday)) / 1000 / 24 / 60 / 60
    );
    const difference: number = today - diverday;
    console.log(difference);
    if (difference > 0) {
      return "past";
    } else if (difference == 0) {
      return "today";
    } else {
      return "tomorrow";
    }
  }

  return (
    <>
      {loading ? (
        <>
          <div className="title text-4xl lg:text-6xl  font-bold dark:text-sky-200 text-sky-700 select-none mb-4">
            <Skeleton count={1} className="w-3/4 lg:w-2/4" />
          </div>
          <div className="addButton">
            <Skeleton
              count={1}
              className="text-xl lg:text-2xl lg:w-1/4 w-3/4"
            />
          </div>
          <div className="diverDays mt-5">
            <Skeleton
              count={1}
              className="text-xl lg:text-2xl lg:w-1/4 w-3/4 mb-3"
            />
          </div>
        </>
      ) : (
        <>
          <div className="title text-4xl lg:text-6xl font-bold dark:text-sky-200 text-sky-700 select-none mb-4">
            DiverCalendar
          </div>
          <div className="addButton">
            <button
              type="button"
              className="transition-all ease-in-out text-xl lg:text-2xl hover:scale-125 hover:shadow-xl hover:shadow-violet-500/50 dark:hover:shadow-violet-300/50 ring-violet-500/-50 hover:border-5 active:bg-violet-500 dark:active:bg-violet-700 active:shadow-xl active:shadow-violet-300/50 rounded-lg text-white bg-violet-700 dark:bg-violet-700 bg-sky-700 dark:bg-zinc-900 active:scale-90 hover:bg-violet-600 dark:hover:bg-violet-800"
              onClick={() => {
                setOpenDiverDaySet(true);
              }}
            >
              Añadir diversario
            </button>
          </div>
          <div className="diverTitle mt-5">
            <div className="text-3xl lg:text-5xl font-bold dark:text-sky-200 text-sky-700 select-none mb-4">
              MyDiverDays
            </div>
          </div>
          <div className="diverdays mt-2 grid lg:grid-cols-4 grid-cols-2 gap-4">
            {user.diverdays
              .sort((a, b) => a - b)
              .map((diverday, index) => (
                <div
                  key={index}
                  className={`transition-all ease-in-out diverday text-3xl lg:text-5xl text-white ${
                    comprobDiverDay(diverday) == "past"
                      ? "bg-slate-600 dark:bg-slate-500 hover:shadow-slate-300/50 active:bg-slate-500 dark:active:bg-slate-700 active:shadow-slate-300/50"
                      : comprobDiverDay(diverday) == "tomorrow"
                      ? "bg-sky-800 dark:bg-sky-600 hover:shadow-sky-300/50 active:bg-sky-500 dark:active:bg-sky-700 active:shadow-sky-300/50"
                      : "bg-lime-600 dark:bg-lime-500 hover:shadow-lime-300/50 active:bg-lime-500 dark:active:bg-lime-700 active:shadow-lime-300/50"
                  } rounded-lg hover:scale-105 hover:shadow-lg hover:border-5 active:shadow-xl active:border-5 active:scale-90 select-none`}
                >
                  {diverday}
                </div>
              ))}
          </div>
        </>
      )}

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

      <Transition.Root show={openDiverDaySet} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpenDiverDaySet}>
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
                  <div className="dark:bg-slate-800 bg-sky-900 text-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-white font-semibold leading-6"
                        >
                          Añade un diversario
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-white">
                            Selecciona la fecha que quieres añadir
                          </p>
                        </div>
                        <div className="mt-2">
                          <p className="text-md text-white rounded-lg text-center">
                            <input
                              type="number"
                              id="diverday"
                              defaultValue={Math.round(
                                (new Date() - new Date(user.birthday)) /
                                  1000 /
                                  24 /
                                  60 /
                                  60
                              )}
                              onInput={(e) => {
                                console.log(e.currentTarget.value);
                                setDiverDay(parseInt(e.currentTarget.value));
                              }}
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="dark:bg-slate-700 bg-sky-600 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="transition-all ease-in-out inline-flex w-full hover:scale-105 justify-center rounded-md bg-lime-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-lime-700 sm:ml-3 sm:w-auto"
                      onClick={() => addDiverDay()}
                    >
                      Añadir
                    </button>
                    <button
                      type="button"
                      className="transition-all ease-in-out mt-3 inline-flex bg-red-500 hover:bg-red-600 hover:scale-105 w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpenDiverDaySet(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
