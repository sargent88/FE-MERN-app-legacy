import { createContext } from "react";

export const AuthenticationContext = createContext({
  isAuthenticated: false,
  userId: null,
  login: () => {},
  logout: () => {},
});
