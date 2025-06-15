import { createContext, useContext } from "react";
import { AuthContextType } from "./Auth.interface";

export const AuthContext = createContext<AuthContextType>({
  session: null,
  deleteSession() {},
  token: null,
  loginToken() {},
  getToken() {},
  login() {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (typeof authContext === "undefined") {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext;
};
