import { createContext, ReactNode } from "react";
import { useCookies } from "react-cookie";

export const mContext = createContext(null);
export const MainContext = ({ children }: { children: ReactNode }) => {
  const [session, setSession, removeSession] = useCookies(["session"]);

  return (
    <mContext.Provider value={{ session, setSession, removeSession }}>
      {children}
    </mContext.Provider>
  );
};
