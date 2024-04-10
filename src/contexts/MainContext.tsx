import { createContext, ReactNode } from "react";

export const mContext = createContext(null);
export const MainContext = ({ children }: { children: ReactNode }) => {
  return <mContext.Provider value={null}>{children}</mContext.Provider>;
};
