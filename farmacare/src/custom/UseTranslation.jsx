// src/custom/UseTranslation.jsx
import { useContext } from "react";
import { dictionary_translations } from "./DictionayTranslations";
import { TranslateContext } from "./TranslateContext";

const useTranslation = () => {
    const { language } = useContext(TranslateContext);

    return (key) => {
        const translation = dictionary_translations[language]?.find((t) => t.key === key)?.value
            || dictionary_translations["en"].find((t) => t.key === key)?.value;
        return translation || key;
    };
};

export default useTranslation;
