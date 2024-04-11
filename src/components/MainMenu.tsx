import { UserIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";

export const MainMenu = () => {
  return (
    <>
      <h1 className="text-6xl font-bold text-sky-200 mb-9">Menu</h1>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <button
            type="button"
            className="w-36 h-auto transition ease-in-out hover:bg-cyan-500 hover:shadow-xl hover:shadow-cyan-500/50 hover:border-5 active:bg-cyan-500 active:shadow-xl active:shadow-cyan-500/50 active:border-5"
          >
            <UserIcon />
          </button>
        </div>
        <div>
          <button
            type="button"
            className="w-36 h-auto transition ease-in-out hover:bg-cyan-500 hover:shadow-xl hover:shadow-cyan-500/50 hover:border-5 active:bg-cyan-500 active:shadow-xl active:shadow-cyan-500/50 active:border-5"
          >
            <CalendarDaysIcon />
          </button>
        </div>
      </div>
    </>
  );
};
