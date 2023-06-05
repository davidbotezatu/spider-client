import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

const PrivateRoute = () => {
  const { isValidToken } = useStateContext();

  if (!isValidToken) return <Navigate to="/login" />;

  return <Outlet />;
};

export default PrivateRoute;
