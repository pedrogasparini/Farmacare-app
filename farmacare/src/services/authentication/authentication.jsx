import { useState, createContext, useEffect } from "react";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const handleLogin = async (username, password) => {
        try {
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al iniciar sesión');
            }

            const data = await response.json();
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);
            return data; // Aseguramos que se retorne la data en caso de éxito
        } catch (error) {
            throw error;
        }
    };

    const handleRegister = async (newUser) => {
        try {
            const response = await fetch('http://localhost:8000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al registrar');
            }

            const data = await response.json();
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);
        } catch (error) {
            throw error;
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthenticationContext.Provider
            value={{ user, handleLogin, handleRegister, handleLogout }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
};
