import { createContext } from "react";

export const AuthenticationContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});
