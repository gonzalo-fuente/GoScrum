import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const token = sessionStorage.getItem("token");

  /* If the user isn't authenticated go to Login page */
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default RequireAuth;
