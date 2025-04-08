import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { NewPlace, UpdatePlace, UserPlaces } from "./places/pages";
import Login from "./users/pages/Login";
import Signup from "./users/pages/Signup";
import Users from "./users/pages/Users";
import { MainNavigation } from "./shared/components/Navigation";
import { AuthenticationContext } from "./shared/context/authenticationContext";
import { useAuthentication } from "./shared/hooks/authHook";
import "./App.css";

function App() {
  const { login, logout, token, userId } = useAuthentication();

  return (
    <AuthenticationContext.Provider
      value={{ isAuthenticated: !!token, userId, token, login, logout }}
    >
      <Router>
        <MainNavigation />
        <MainRoutes token={token} />
      </Router>
    </AuthenticationContext.Provider>
  );
}

function MainRoutes({ token }) {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:uid/places" element={<UserPlaces />} />
        {token ? (
          <>
            <Route path="/places/new" element={<NewPlace />} />
            <Route path="/places/:pid" element={<UpdatePlace />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </main>
  );
}

export default App;
