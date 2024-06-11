// authentication.jsx
import { useState, createContext } from "react";

export const AuthenticationContext = createContext();

const userValue = JSON.parse(localStorage.getItem("user"));

export const AuthenticationContextProvider = ({ children }) => {
    const [user, setUser] = useState(userValue);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    const handleLogin = (username) => {
        localStorage.setItem("user", JSON.stringify({ username }));
        setUser({ username });
    };

    return (
        <AuthenticationContext.Provider value={{ user, handleLogin, handleLogout }}>
            {children}
        </AuthenticationContext.Provider>
    );
};

