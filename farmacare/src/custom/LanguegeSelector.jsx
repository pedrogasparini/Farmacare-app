import useTranslation from "./UseTraduction";
import "./Custom.css"; 

const LanguageSelector = () => {
  const { setLanguage } = useTranslation();

  const handleChangeLanguage = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <select className="language-selector" onChange={handleChangeLanguage}>
      <option value="es">Español</option>
      <option value="en">English</option>
    </select>
  );
};

export default LanguageSelector;