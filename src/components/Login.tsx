import { useState, useContext } from "react";
import User from "../classes/User";
import { ArrowDownIcon, ArrowPathIcon } from "@heroicons/react/16/solid";
import { mContext } from "../contexts/MainContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loginIn, setLoginIn] = useState(false);
  const { setSession } = useContext(mContext);

  const createUser = async (email: string, pass: string) => {
    const u = new User(email, pass);
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
          setSession("session", uLog);
          setLoginIn(false);
          break;
      }
    } catch (error) {
      setLoginIn(false);
      console.log(error);
    }
  };

  return (
    <div className="login">
      <h1 className="text-7xl font-bold text-indigo-300">DiverAPP</h1>
      <div className="snap-x snap-mandatory">
        <div className="grid grid-rows-1 gap-4 mt-9">
          <div className="snap-always snap-center">
            <input
              type="email"
              id={"email"}
              className={`form-control p-4 text-center text-2xl transition ease-in-out focus:scale-105 hover:scale-105 text-white ${
                loginIn ? "animate-pulse bg-slate-400 opacity-50" : ""
              } bg-indigo-500 rounded-lg`}
              onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
              placeholder="Email"
              readOnly={loginIn}
            />
          </div>

          {/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email) && (
            <>
              <svg className="w-100 h-12 self-center">
                <ArrowDownIcon className="text-indigo-500" />
              </svg>
              <div className="snap-always snap-center">
                <input
                  type="password"
                  id={"pass"}
                  className={`form-control p-4 text-center text-2xl transition ease-in-out focus:scale-105 hover:scale-105 text-white ${
                    loginIn ? "animate-pulse bg-slate-400 opacity-50" : ""
                  }bg-indigo-500 rounded-lg`}
                  onInput={(e) => setPass((e.target as HTMLInputElement).value)}
                  placeholder="Password"
                  readOnly={loginIn}
                />
              </div>
            </>
          )}
          {pass.trim().length >= 8 && (
            <>
              <svg className="w-100 h-12 self-center">
                <ArrowDownIcon className="text-indigo-500" />
              </svg>
              <div className="grid grid-cols-1 gap-4">
                <button
                  className={`text-2xl transition ease-in-out focus:scale-105 hover:scale-105 text-white ${
                    loginIn ? "bg-slate-400 opacity-50" : "bg-indigo-500"
                  } rounded-lg w-100`}
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
      </div>
      <div className="fixed bottom-3 left-50 text-md">
        © 2024 raultorres - All rights reserved
      </div>
    </div>
  );
};
