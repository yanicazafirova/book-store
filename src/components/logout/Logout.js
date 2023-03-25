import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import * as authService from '../../services/authService';

export const Logout = () => {
    const { user, userLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        authService.logout(user.accessToken)
            .then(() => {
                userLogout();
                localStorage.clear();
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
                navigate('/');
            })
    });

    return null;
};