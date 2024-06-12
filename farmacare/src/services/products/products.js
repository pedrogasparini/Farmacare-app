class ProductsService {

    productsList = [];

    constructor() {
        this.productsList = [
            { id: 1, name: "Gasas", price: 3000, pathImg: "Img/gasas.png", idCategory: 4 },
            { id: 2, name: "Paracetamol", price: 4500, pathImg: "Img/ibuprofeno.png", idCategory: 2 },
            { id: 3, name: "Alcohol etilico", price: 2500, pathImg: "Img/alcohol.png", idCategory: 4 },
            { id: 4, name: "Creama hidratante", price: 8500, pathImg: "Img/cremaParaManos.png", idCategory: 1 },
            { id: 5, name: "Agua micelar", price: 4000, pathImg: "Img/aguaMicelar.png", idCategory: 1 },
            { id: 6, name: "Shampoo", price: 3700, pathImg: "Img/shampoo.png", idCategory: 1 },
            { id: 7, name: "Enjuague bucal", price: 2800, pathImg: "Img/enjuagueBucal.png", idCategory: 1 },
            { id: 8, name: "Crema nivea", price: 3000, pathImg: "Img/crema.png", idCategory: 1 }
        ]

    }
    getProducts() {
        return this.productsList;
    }
}

export default ProductsService;