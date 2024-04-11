import {
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { useState } from "react";
import { ReactCookieProps } from "react-cookie";
import { useCookies } from "react-cookie";
import User from "../classes/User";

type ContextType = {
  view: number;
  setView: Dispatch<SetStateAction<number>>;
  cookies: ReactCookieProps;
};

export const mContext = createContext<ContextType | null>(null);
export const MainContext = ({ children }: { children: ReactNode }) => {
  const [cookies, setCookies, removeCookies] = useCookies(["session"]);
  const [view, setView] = useState<number | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!cookies.session) {
      setView(0);
    } else {
      setView(1);
    }
  }, [cookies]);

  useEffect(() => {
    if (view == 0) {
      removeCookies("session");
    }
  }, [view]);

  useEffect(() => {
    if (!cookies.session) {
      setView(0);
    } else {
      setView(1);
    }
  }, []);

  return (
    <mContext.Provider value={{ view, setView, cookies, user, setUser }}>
      {children}
    </mContext.Provider>
  );
};
