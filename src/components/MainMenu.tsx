import { UserIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";

export const MainMenu = () => {
  return (
    <>
      <h1 className="text-6xl font-bold dark:text-sky-200 text-sky-700 mb-9">
        Menu
      </h1>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <button
            type="button"
            className="rounded-lg text-white w-36 h-auto transition ease-in-out bg-sky-700 dark:bg-zinc-900 hover:bg-sky-500 active:scale-90 hover:scale-110 hover:shadow-xl hover:shadow-sky-300/50 hover:border-5 active:bg-sky-500 active:shadow-xl active:shadow-sky-300/50 active:border-5"
          >
            <UserIcon />
          </button>
        </div>
        <div>
          <button
            type="button"
            className="rounded-lg text-white w-36 h-auto transition ease-in-out bg-sky-700 dark:bg-zinc-900 hover:bg-sky-500 active:scale-90 hover:scale-110 hover:shadow-xl hover:shadow-sky-300/50 hover:border-5 active:bg-sky-500 active:shadow-xl active:shadow-sky-300/50 active:border-5"
          >
            <CalendarDaysIcon />
          </button>
        </div>
      </div>
    </>
  );
};
