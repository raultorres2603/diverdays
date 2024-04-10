import { createContext, ReactNode } from "react";
import { useCookies } from "react-cookie";

export const mContext = createContext(null);
export const MainContext = ({ children }: { children: ReactNode }) => {
  const [cookie, setCookies, removeCookies] = useCookies(["session"]);

  return (
    <mContext.Provider value={{ cookie, setCookies, removeCookies }}>
      {children}
    </mContext.Provider>
  );
};
