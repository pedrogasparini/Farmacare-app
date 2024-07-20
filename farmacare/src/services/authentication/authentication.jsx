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
            console.log('Enviando datos de login:', { username, password });
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const responseData = await response.json();
            console.log('Respuesta del servidor:', responseData);

            if (!response.ok) {
                throw new Error(responseData.message || 'Error al iniciar sesión');
            }

            localStorage.setItem("user", JSON.stringify(responseData));
            setUser(responseData);
            return responseData; 
        } catch (error) {
            console.error('Error en handleLogin:', error);
            throw error;
        }
    };

    const handleRegister = async (newUser) => {
        try {
            console.log('Enviando datos de registro:', newUser);
            const response = await fetch('http://localhost:8000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            const responseData = await response.json();
            console.log('Respuesta del servidor:', responseData);

            if (!response.ok) {
                throw new Error(responseData.message || 'Error al registrar');
            }

            localStorage.setItem("user", JSON.stringify(responseData));
            setUser(responseData);
        } catch (error) {
            console.error('Error en handleRegister:', error);
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
