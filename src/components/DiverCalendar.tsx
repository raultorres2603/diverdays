import { useContext, Fragment, useRef, useState } from "react";
import { mContext } from "../contexts/MainContext";
import User from "../classes/User";
import {
  ArrowLeftEndOnRectangleIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { BackwardIcon } from "@heroicons/react/24/outline";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Dialog, Transition } from "@headlessui/react";
import toast from "react-hot-toast";

type DiverDay = {
  diverDay: number;
  diverPhotos: Array<string>;
};

export const DiverCalendar = () => {
  const { setView, loading, user } = useContext(mContext) || {
    setView: () => {},
    user: new User("", ""),
    loading: true,
  };

  const [diverday, setDiverDay] = useState<DiverDay>({} as DiverDay);

  const [openDiverDaySet, setOpenDiverDaySet] = useState(false);
  const [openCelebDiver, setOpenCelebDiver] = useState(false);

  const [selectedDiver, setSelectedDiver] = useState<DiverDay>({} as DiverDay);
  const [diverPhotos, setDiverPhotos] = useState<string[]>([]);

  const cancelButtonRef = useRef(null);

  /**
   * Adds a diver day for the user.
   *
   * This function calculates the current diver count for the user and checks if the
   * diver day is greater or equal to the current diver count. If it is, it calls
   * the `actDiverDay` method of the user object to add the diver day. If it is not,
   * it logs an error message and displays an alert to the user.
   *
   * @returns {void}
   */
  function addDiverDay(): void {
    // Calculate the current diver count for the user
    const diverCount = Math.round(
      (new Date().getTime() - new Date(user.birthday).getTime()) /
        1000 /
        24 /
        60 /
        60
    );

    // Check if the diver day is greater or equal to the diver count
    if (diverday && diverday.diverDay >= diverCount) {
      try {
        // Add the diver day for the user
        user.actDiverDay(diverday);
      } catch (error) {}
    } else {
      // Display an alert to the user if the diver day is not valid
      alert("DiverDay tiene que ser superior a tu total");
    }
  }

  /**
   * Checks the diver day against the current date to determine if it has already
   * passed, is today, or is still to come.
   *
   * @param {DiverDay} diverday - The diver day to be checked.
   * @return {string} Returns "past" if the diver day has passed, "today" if it is
   * today, and "tomorrow" if it is still to come.
   */
  function comprobDiverDay(diverday: DiverDay): string {
    // Calculate the number of days between the diver day and today
    const today: number = Math.round(
      (new Date().getTime() - new Date(user.birthday).getTime()) /
        1000 /
        24 /
        60 /
        60
    );
    const difference: number = today - diverday.diverDay;

    // Check if the diver day has passed, is today, or is still to come
    if (difference > 0) {
      return "past"; // diver day has passed
    } else if (difference == 0) {
      return "today"; // diver day is today
    } else {
      return "tomorrow"; // diver day is still to come
    }
  }

  /**
   * Triggers the click event on the "diverFoto" element, which allows the user to select
   * photos for their diver day.
   *
   * @return {void} This function does not return anything.
   */
  function addDiverPhotos(): void {
    // Get the element with the id "diverFoto" and trigger its click event
    // This opens the file selection dialog for the user to choose photos
    document.getElementById("diverFoto")?.click();
  }

  /**
   * Celebrates the selected diver day with the provided photos.
   *
   * This function calls the `celebDiverDay` method of the user object, passing
   * the selected diver day and the array of photos.
   *
   * @return {void} This function does not return anything.
   */
  function celebDiverday(): void {
    // Celebrate the selected diver day with the provided photos
    user.celebDiverDay(selectedDiver, diverPhotos);
  }

  /**
   * Handles the event when a photo is added to the diver day.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event object containing the file(s) chosen by the user.
   * @return {void} This function does not return anything.
   */
  function pushDiverPhoto(e: React.ChangeEvent<HTMLInputElement>): void {
    // Check if the chosen file exceeds the maximum size limit
    if (e.target.files && e.target.files[0].size > 1000000) {
      toast.error("Tamaño de imagen demasiado grande."); // Display an error message if the file size is too large
      return;
    }

    // Check if the number of photos already added to the diver day exceeds the limit
    if (diverPhotos.length >= 4) {
      toast.error("Solo puedes subir 4 fotos."); // Display an error message if the photo limit is reached
      return;
    }

    // Check if a file was actually chosen by the user
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]); // Read the chosen file as a data URL
      reader.onload = () => {
        if (reader.result) {
          setDiverPhotos([...diverPhotos, reader.result as string]); // Add the data URL of the chosen file to the array of photos for the diver day
        }
      };
    }
  }

  function removeDiverPhoto(i: number): void {
    diverPhotos.splice(i, 1);
    setDiverPhotos([...diverPhotos]);
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
          <div className="diverTitle mt-5">
            <div className="text-3xl lg:text-5xl font-bold dark:text-sky-200 text-sky-700 select-none mb-4">
              MyDiverDays
            </div>
          </div>
          <div className="addButton">
            <button
              type="button"
              className="mb-3 border-none transition-all ease-in-out text-xl lg:text-2xl hover:scale-105 hover:shadow-lg hover:shadow-violet-500/50 dark:hover:shadow-violet-300/50 ring-violet-500/-50 hover:border-5 active:bg-violet-500 dark:active:bg-violet-700 active:shadow-lg active:shadow-violet-300/50 rounded-lg text-white bg-violet-700 dark:bg-violet-700 bg-sky-700 dark:bg-zinc-900 active:scale-90 hover:bg-violet-600 dark:hover:bg-violet-800"
              onClick={() => {
                setOpenDiverDaySet(true);
              }}
            >
              Añadir diversario
            </button>
          </div>
          <div className="diverdays mt-2 grid lg:grid-cols-4 grid-cols-2 gap-4 h-52 lg:h-46 overflow-auto border-double border-8 border-sky-700 dark:border-sky-200 p-3 rounded-lg">
            {user.diverdays &&
              user.diverdays
                .sort((a, b) => a.diverDay - b.diverDay)
                .map((diverday: DiverDay, index: number) => (
                  <div
                    key={index}
                    className={`transition-all ease-in-out diverday text-3xl lg:text-5xl text-white border-none ${
                      comprobDiverDay(diverday) == "past"
                        ? "bg-slate-600 dark:bg-slate-500 hover:shadow-slate-300/50 active:bg-slate-500 dark:active:bg-slate-700 active:shadow-slate-300/50"
                        : comprobDiverDay(diverday) == "tomorrow"
                        ? "bg-sky-800 dark:bg-sky-600 hover:shadow-sky-300/50 active:bg-sky-500 dark:active:bg-sky-700 active:shadow-sky-300/50"
                        : "bg-lime-600 dark:bg-lime-500 hover:shadow-lime-300/50 active:bg-lime-500 dark:active:bg-lime-700 active:shadow-lime-300/50"
                    } rounded-lg hover:scale-105 hover:shadow-lg hover:border-5 active:shadow-xl active:border-5 active:scale-90 select-none`}
                    onClick={() => {
                      setSelectedDiver(diverday);
                      setOpenCelebDiver(true);
                    }}
                  >
                    {diverday.diverDay}
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
                                (new Date().getTime() -
                                  new Date(user.birthday).getTime()) /
                                  1000 /
                                  24 /
                                  60 /
                                  60
                              )}
                              onInput={(e) => {
                                setDiverDay({
                                  diverDay: parseInt(e.currentTarget.value),
                                  diverPhotos: [],
                                });
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

      {/* Modal para celebrar un diversario */}
      <Transition.Root show={openCelebDiver} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpenCelebDiver}>
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
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-white font-semibold leading-6"
                        >
                          Celebra tu diversario
                        </Dialog.Title>
                        <div className="mt-2 text-sm text-red-600 dark:text-red-400 font-bold">
                          {comprobDiverDay(selectedDiver) == "past" &&
                            selectedDiver.diverPhotos &&
                            selectedDiver.diverPhotos.length > 0 && (
                              <>
                                <div className="text-sky-200 mb-5 dark:text-sky-300 mx-auto text-sm">
                                  Así se celebró el diversario:
                                </div>
                                <div className="text-red-600 dark:text-red-400 grid grid-cols-2 gap-4">
                                  {selectedDiver.diverPhotos.map(
                                    (photo, index) => (
                                      <div className="img relative" key={index}>
                                        <img
                                          src={photo}
                                          className="transition-all ease-in-out w-auto h-24 lg:h-auto lg:w-60 rounded-full hover:scale-105 hover:grayscale active:grayscale active:scale-90"
                                        />
                                      </div>
                                    )
                                  )}
                                </div>
                              </>
                            )}
                          {comprobDiverDay(selectedDiver) == "past" &&
                            selectedDiver.diverPhotos &&
                            selectedDiver.diverPhotos.length == 0 && (
                              <div className="text-red-600 dark:text-red-400">
                                Este diversario no se celebró
                              </div>
                            )}
                          {comprobDiverDay(selectedDiver) == "tomorrow" &&
                            "No puedes celebrar un diversario que aún no ha pasado"}
                          {comprobDiverDay(selectedDiver) == "today" && (
                            <>
                              <p className="text-sm text-white">
                                Actualiza tu diversario
                              </p>
                              <div className="inputFiles mt-4">
                                <input
                                  type="file"
                                  id="diverFoto"
                                  className="hidden"
                                  onChange={(e) => pushDiverPhoto(e)}
                                />
                                <div className="transition-all ease-in-out inputBox w-20 h-20 active:scale-90 border-dashed border-4 border-sky-200 mx-auto hover:cursor-pointer hover:border-sky-300 hover:scale-105">
                                  <div className="plusMark">
                                    <PlusIcon
                                      color="lightblue"
                                      className="transition-all ease-in-out w-18 my-auto mx-auto hover:scale-105"
                                      onClick={() => addDiverPhotos()}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="imgs mt-5 border border-4 border-double rounded-lg border-slate-300">
                                <div className="imgsContainer grid grid-cols-2 gap-2 my-2 justify-items-center">
                                  {diverPhotos.map((photo, index) => (
                                    <div className="img relative">
                                      <img
                                        src={photo}
                                        className="transition-all ease-in-out w-auto h-24 lg:h-auto lg:w-60 rounded-full hover:scale-105 hover:grayscale active:grayscale active:scale-90"
                                        onClick={() => removeDiverPhoto(index)}
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="comments mt-4">
                                <input
                                  type="text"
                                  id="diverComment"
                                  accept="image/*"
                                  placeholder="Introduce un comentario"
                                  className="rounded-lg text-sm text-black dark:text-white px-3 py-2 bg-slate-200 dark:bg-slate-600 border border-slate-300 dark:border-slate-500"
                                />
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="dark:bg-slate-700 bg-sky-600 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="transition-all ease-in-out inline-flex w-full hover:scale-105 justify-center rounded-md bg-lime-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-lime-700 sm:ml-3 sm:w-auto"
                      onClick={() => celebDiverday()}
                    >
                      Añadir
                    </button>
                    <button
                      type="button"
                      className="transition-all ease-in-out mt-3 inline-flex bg-red-500 hover:bg-red-600 hover:scale-105 w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpenCelebDiver(false)}
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
