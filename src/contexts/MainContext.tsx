import { createContext, ReactNode, useState } from "react";

export const mContext = createContext({});
export const MainContext = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState(sessionStorage.getItem("uI"));

  return (
    <mContext.Provider value={{ session, setSession }}>
      {children}
    </mContext.Provider>
  );
};
