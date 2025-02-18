/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import Loader from "./Loader";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utility/firebase";

const PrivateRoute = ({ children }) => {
  const [user, loading, authError] = useAuthState(auth);

  if (loading) {
    return <Loader />;
  }

  if (user === null || authError) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
