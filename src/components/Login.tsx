import { useState } from "react";
import User from "../classes/User";
import { ArrowPathIcon } from "@heroicons/react/16/solid";
import { useCookies } from "react-cookie";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loginIn, setLoginIn] = useState(false);
  const [, setCookies] = useCookies(["session"]);

  const createUser = async (email: string, pass: string) => {
    const u = new User(email, pass);
    u.password = pass;
    setLoginIn(true);
    try {
      const uLog = await u.comprobUser();
      switch (uLog) {
        case "ERR":
          setLoginIn(false);
          break;
        case "IEP":
          setLoginIn(false);
          break;
        default:
          setCookies("session", uLog, {
            //maxAge: 3600,
            sameSite: true,
            path: "/",
            maxAge: 3600000,
          });
          setLoginIn(false);
          break;
      }
    } catch (error) {
      setLoginIn(false);
    }
  };

  return (
    <div className="login">
      <h1 className="text-7xl font-bold dark:text-indigo-300 text-indigo-800 select-none">
        DiverAPP
      </h1>
      <div className="grid grid-rows-1 gap-10 mt-9 lg:justify-center">
        <input
          type="email"
          name="email"
          id={"email"}
          className={`form-control p-4 text-center text-2xl transition ease-in-out focus:scale-105 hover:scale-105 lg:w-100 lg:text-3xl text-white ${
            loginIn ? "animate-pulse bg-slate-400 opacity-50" : ""
          } bg-indigo-500 rounded-lg`}
          onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
          placeholder="Email"
          readOnly={loginIn}
        />

        {/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email) && (
          <>
            <input
              type="password"
              name="password"
              id={"pass"}
              className={`form-control p-4 text-center text-2xl transition ease-in-out focus:scale-105 hover:scale-105 lg:w-100 lg:w-100 lg:text-3xl text-white ${
                loginIn ? "animate-pulse bg-slate-400 opacity-50" : ""
              }bg-indigo-500 rounded-lg`}
              onInput={(e) => setPass((e.target as HTMLInputElement).value)}
              placeholder="Password"
              readOnly={loginIn}
            />
          </>
        )}
        {pass.trim().length >= 8 && (
          <>
            <div className="grid grid-cols-1 gap-4">
              <button
                className={`text-2xl transition ease-in-out focus:scale-105 hover:scale-105 lg:text-3xl text-white ${
                  loginIn ? "bg-slate-400 opacity-50" : "bg-indigo-500"
                } rounded-lg w-100`}
                disabled={loginIn}
                onClick={() => {
                  createUser(email, pass);
                }}
              >
                {loginIn ? (
                  <ArrowPathIcon className="animate-spin w-100 h-9 mx-auto" />
                ) : (
                  "Entrar"
                )}
              </button>
            </div>
          </>
        )}
      </div>
      <div className="fixed bottom-3 text-md">
        © 2024 raultorres - All rights reserved
      </div>
    </div>
  );
};
