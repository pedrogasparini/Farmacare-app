import { propTypes } from "react-bootstrap/esm/Image";
import { Button,Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const ProductItem = ({id, productName, price, description, category, stock, image, onShowModal}) => {
    const navigate = useNavigate();

    const modalShowHandler = () => {
        onShowModal(id)
    }

    const clickHandler = () => {
        navigate (`/product/${id}`, {
            state: {
                product: {
                    productName,
                    price,
                    description,
                    category,
                    stock,
                    image,
                }
            }
        })
    }

    return (
        <Card>
            <Card.Img 
                height={400}
                variant="top"
                alt="imagen del producto"
                src="assets/img/gasas.jpg"
            />
            <Card.Body>
                <Card.Title>{productName}</Card.Title>
                <Card.Subtitle>{price}</Card.Subtitle>
                <p>{description} - Stock disponible: {stock}</p>
                <Button onClick={clickHandler}>Seleciconar Producto</Button>
                <Button onClick={modalShowHandler}>Eliminar Producto</Button>
            </Card.Body>
        </Card>
    );
}

export default ProductItem;

ProductItem.propTypes = {
    productName: propTypes.string,
    price: propTypes.number,
    description: propTypes.string,
    category: propTypes.string,
    stock: propTypes.number,
}