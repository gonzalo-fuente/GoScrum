import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default RequireAuth;
