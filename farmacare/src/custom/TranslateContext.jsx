import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const TranslateContext = createContext(null);

export const TranslateContextProvider = ({ children }) => {
    const tValue = localStorage.getItem("translation") || "en";
    const [language, setLanguage] = useState(tValue);

    const changeLanguageHandler = (newLanguage) => {
        localStorage.setItem("translation", newLanguage);
        setLanguage(newLanguage);
    };

    return (
        <TranslateContext.Provider value={{ language, changeLanguageHandler }}>
            {children}
        </TranslateContext.Provider>
    );
};

TranslateContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};