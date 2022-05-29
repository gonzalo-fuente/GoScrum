import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  if (!sessionStorage.getItem("token")) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default RequireAuth;
