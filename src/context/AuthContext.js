import { createContext } from 'react';
import { useLocalStorage } from '../hooks/useLocaleStorage';

export const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {
    const [auth, setAuth] = useLocalStorage('auth', {});

    const userLogin = (data) => {
        
        if(data.accessToken){
            return setAuth(data);
        }
        throw new Error(data.message);
        
    }

    const userLogout = () => {
        setAuth({});
    }

    return (
        <AuthContext.Provider value={{
            user: auth,
            userLogin,
            userLogout,
            isAuthenticated: Boolean(auth.accessToken)
        }}>
            {children}
        </AuthContext.Provider>
    );
}