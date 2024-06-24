import ProductItem from "../ProductItem/ProductItem";
import { useState } from "react";
import ProductSearch from "../filters/ProductSearch/ProductSearch";
import DeleteModal from "../ui/DeleteModal/DeleteModal";

const Products = ({ products, onSearch, onDelete }) => {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState(-1);

    const showModalHandler = (id) => {
        setShowDeleteModal(true);
        setProductIdToDelete(id);
    };

    const hideModalHandler = () => {
        setShowDeleteModal(false);
        setProductIdToDelete(-1);
    }

    const deleteProductHandler = () => {
        onDelete(productIdToDelete);
    }

    const productMapped = products.map((product) => (
        <ProductItem
            key={product.id}
            id={product.id}
            productName={product.productName}
            price={product.price}
            description={product.description}
            category={product.category}
            stock={product.stock}
            image={product.image}
            onShowModal={showModalHandler}
        />
    ))

    return (
        <>
        <ProductSearch onSearch={onSearch} />
        <DeleteModal    
        onDelete={deleteProductHandler}
        showDeleteModal={showDeleteModal}
        onHide={hideModalHandler}
        />
        <div className="d-flex justify-content flex-wrap">
            {productMapped.lenght > 0 ? (productMapped) : (
                <p>No se encontraron productos cargados</p>
            )}
        </div>
        </>
    );
};

export default Products;