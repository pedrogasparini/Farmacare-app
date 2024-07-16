class ProductsService {

    productsList = [];

    constructor() {
        this.productsList = [

            { id: 1, name: "Gasas", price: 3000, pathImg: "src/assets/img/gasas.png", idCategory: 4 },
            { id: 2, name: "Paracetamol", price: 4500, pathImg: "src/assets/img/ibuprofeno.png", idCategory: 2 },
            { id: 3, name: "Alcohol etilico", price: 2500, pathImg: "src/assets/img/alcohol.png", idCategory: 4 },
            { id: 4, name: "Creama hidratante", price: 8500, pathImg: "src/assets/img/cremaParaManos.png", idCategory: 3 },
            { id: 5, name: "Agua micelar", price: 4000, pathImg: "src/assets/img/aguaMiselar.png", idCategory: 1 },
            { id: 6, name: "Shampoo", price: 3700, pathImg: "src/assets/img/shampoo.png", idCategory: 1 },
            { id: 7, name: "Enjuague bucal", price: 2800, pathImg: "src/assets/img/enjuagueBucal.png", idCategory: 1 },
            { id: 8, name: "Crema nivea", price: 3000, pathImg: "src/assets/img/crema.png", idCategory: 3 }

        ]

    }
    getProducts() {
        return this.productsList;
    }
}

export default ProductsService;