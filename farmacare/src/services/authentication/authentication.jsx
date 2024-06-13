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


    const handleRegister = (newUser) => {
        const registeredUsers = JSON.parse(localStorage.getItem('users')) || [];
        
        if (registeredUsers.some(user => user.username === newUser.username)) {
            throw new Error('El nombre de usuario ya existe.');
        }

        registeredUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(registeredUsers));
    };

    return (
        <AuthenticationContext.Provider value={{ user, handleLogin, handleLogout,handleRegister }}>
            {children}
        </AuthenticationContext.Provider>
    );
};

