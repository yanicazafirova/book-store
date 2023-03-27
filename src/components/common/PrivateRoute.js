import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export const PrivateRoute = ({ children }) => {

    const { isAuthenticated } = useContext(AuthContext);
    console.log(isAuthenticated);
    if (!isAuthenticated) {
        return <Navigate to="/users/login" replace />
    }

    return children ? children : <Outlet />;
};