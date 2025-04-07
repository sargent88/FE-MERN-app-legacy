import { createContext } from "react";

export const AuthenticationContext = createContext({
  isAuthenticated: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {},
});
