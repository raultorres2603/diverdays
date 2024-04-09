import { useState } from "react";
import User from "../classes/User";
import { ArrowDownCircleIcon } from "@heroicons/react/16/solid";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const createUser = async (email: string, pass: string) => {
    const u = new User(email, pass);
    try {
      await u.comprobUser();
    } catch (error) {
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
              className="form-control p-4 text-center text-2xl transition ease-in-out focus:scale-105 hover:scale-105 text-white bg-indigo-500 rounded-lg"
              onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
              placeholder="Email"
              name=""
            />
          </div>

          {/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email) && (
            <>
              <svg className="animate-pulse w-100 h-14 self-center">
                <ArrowDownCircleIcon className="text-indigo-500" />
              </svg>
              <div className="snap-always snap-center">
                <input
                  type="password"
                  id={"pass"}
                  className="form-control p-4 text-center text-2xl transition ease-in-out focus:scale-105 hover:scale-105 text-white bg-indigo-500 rounded-lg"
                  onInput={(e) => setPass((e.target as HTMLInputElement).value)}
                  placeholder="Password"
                  name=""
                />
              </div>
            </>
          )}
          {pass.trim().length >= 8 && (
            <>
              <svg className="animate-pulse w-100 h-14 self-center">
                <ArrowDownCircleIcon className="text-indigo-500" />
              </svg>
              <div className="grid grid-cols-1 gap-4">
                <button
                  className="text-2xl transition ease-in-out focus:scale-105 hover:scale-105 text-white bg-indigo-500 rounded-lg w-100"
                  onClick={() => {
                    createUser(email, pass);
                  }}
                >
                  Entrar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
