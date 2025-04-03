import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Users from "./users/pages/Users";
import { MainNavigation } from "./shared/components/Navigation";
import { NewPlace, UpdatePlace, UserPlaces } from "./places/pages";
import Login from "./users/pages/Login";
import Signup from "./users/pages/Signup";
import { AuthenticationContext } from "./shared/context/authContext";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback((userId) => {
    setIsLoggedIn(true);
    setUserId(userId);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{ isLoggedIn, userId, login, logout }}
    >
      <Router>
        <MainNavigation />
        <MainRoutes isLoggedIn={isLoggedIn} />
      </Router>
    </AuthenticationContext.Provider>
  );
}

function MainRoutes({ isLoggedIn }) {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:uid/places" element={<UserPlaces />} />
        {isLoggedIn ? (
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
