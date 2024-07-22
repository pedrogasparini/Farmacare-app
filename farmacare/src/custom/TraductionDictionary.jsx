
import { createContext,  useState } from "react";

export const TraductionDictionaryContext = createContext();

export const TraductionDictionaryProvider = ({ children }) => {
    const [language, setLanguage] = useState("es");

    const traduction = {
        es: {
            description: "En Farmacare, nos dedicamos a proporcionar medicamentos y productos de salud de alta calidad para mejorar tu bienestar. Contamos con un equipo de profesionales listos para asistirte en todas tus necesidades farmacéuticas.",
            farmacare: "Sobre Farmacare",
            valores: "Nuestros valores",
            compromiso: "Compromiso con la salud",
            calidad: "Calidad y seguridad",
            atencion: "Atención personalizada",
            innovacion: "Innovacion constante",
            contacto: "Contactanos",
            derechos: "©2024 Farmacare. Todos los derechos reservados.",
            todosLosProductos: "Todos los productos",
            cuidadoPersonal: "Cuidado Personal",
            medicamentos: "Medicamentos",
            primerosAuxilios: "Primeros Auxilios",
            productosParaPiel: "Productos para el cuidado de la piel",
            precio: "Precio",
            stock: "Stock",
            cantidad: "Cantidad",
            agregarAlCarrito: "Añadir al carrito",
            telefono:"Numero de celular: +3406 505050",
            noProducts: "No hay productos disponibles",
            stockInsufficient: "Stock insuficiente",
            insufficientStock: "no tiene suficiente stock",
            productAdded: "Producto añadido",
            addedToCart: "ha sido añadido al carrito",
            accept: "Aceptar"
        },
        en: {
            description: "At Farmacare, we are dedicated to providing high-quality medications and health products to improve your well-being. We have a team of professionals ready to assist you with all your pharmaceutical needs.",
            farmacare: "About Farmacare",
            valores: "Our Values",
            compromiso: "Commitment to Health",
            calidad: "Quality and Safety",
            atencion: "Personalized Attention",
            innovacion: "Constant Innovation",
            contacto: "Contact Us",
            derechos: "©2024 Farmacare. All rights reserved.",
            todosLosProductos: "All Products",
            cuidadoPersonal: "Personal Care",
            medicamentos: "Medicines",
            primerosAuxilios: "First Aid",
            productosParaPiel: "Skin Care Products",
            precio: "Price",
            stock: "Stock",
            cantidad: "Quantity",
            agregarAlCarrito: "Add to Cart",
            telefono:"Cel number: +3406 505050",
            noProducts: "No products available",
            stockInsufficient: "Insufficient stock",
            insufficientStock: "does not have enough stock",
            productAdded: "Product Added",
            addedToCart: "has been added to the cart",
            accept: "Accept"
        }
    };

    const translate = (key) => traduction[language][key] || key;

    return (
        <TraductionDictionaryContext.Provider value={{ translate, setLanguage }}>
            {children}
        </TraductionDictionaryContext.Provider>
    );
};
