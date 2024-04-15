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
  view: number | null;
  setView: Dispatch<SetStateAction<number | null>>;
  cookies: ReactCookieProps;
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setCookies: Dispatch<SetStateAction<ReactCookieProps>>;
};

export const mContext = createContext<ContextType | null>(null);
export const MainContext = ({ children }: { children: ReactNode }) => {
  const [cookies, setCookies, removeCookies] = useCookies(["session"]);
  const [view, setView] = useState<number | null>(null);
  const [user, setUser] = useState<User>(new User("", ""));
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!cookies.session) {
      setView(0);
      setUser(new User("", ""));
    } else {
      setView(1);
      setLoading(true);
      const fetchUser = async () => {
        const userInfo = await User.getInfo(cookies?.session as string);
        if (userInfo instanceof User) {
          setUser(userInfo);
        } else {
          // Handle the case where the promise resolves to a boolean
        }
        setLoading(false);
      };
      fetchUser();
      console.log(cookies);
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
    <mContext.Provider
      value={{
        view,
        setView,
        cookies,
        user,
        setUser,
        loading,
        setLoading,
      }}
    >
      {children}
    </mContext.Provider>
  );
};
