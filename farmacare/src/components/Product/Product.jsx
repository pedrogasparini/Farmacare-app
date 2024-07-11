import ProductItem from "../ProductItem/ProductItem";
import { useState } from "react";
import ProductSearch from "../filters/ProductSearch/ProductSearch";
import DeleteModal from "../ui/DeleteModal/DeleteModal";
import PropTypes from 'prop-types';

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

Products.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        productName: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        stock: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
    })).isRequired,
    onSearch: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default Products;