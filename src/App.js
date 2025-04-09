import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { MainNavigation } from "./shared/components/Navigation";
import { AuthenticationContext } from "./shared/context/authenticationContext";
import { useAuthentication } from "./shared/hooks/authHook";
import { LoadingSpinner } from "./shared/components/UIElements";
import "./App.css";

const Users = React.lazy(() => import("./users/pages/Users"));
const NewPlace = React.lazy(() => import("./places/pages/NewPlace"));
const UpdatePlace = React.lazy(() => import("./places/pages/UpdatePlace"));
const UserPlaces = React.lazy(() => import("./places/pages/UserPlaces"));
const Login = React.lazy(() => import("./users/pages/Login"));
const Signup = React.lazy(() => import("./users/pages/Signup"));

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
    <Suspense
      fallback={
        <div className="center">
          <LoadingSpinner />
        </div>
      }
    >
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
    </Suspense>
  );
}

export default App;
