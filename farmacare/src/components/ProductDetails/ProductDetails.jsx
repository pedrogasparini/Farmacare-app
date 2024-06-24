import { useLocation, useNavigate } from "react-router-dom";
import { Button,Card } from "react-bootstrap";

const ProductDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const {productName,price,description,image} = location.state.product;

    const clickHandler = () => {
        navigate("/home");
    };

    return (
        <Card>
            <Card.Img 
                height={400}
                variant="top"
                src={image !== "" ? image : "https://bit.ly/47NylZk"}
                />
            <Card.Body>
                <Card.Title>{productName}</Card.Title>
                <Card.Subtitle>{price}</Card.Subtitle>
                <p>
                    <b>Descripcion: {description}</b>
                </p>
                <Button onClick={clickHandler}>
                    Volver a la pagina principal
                </Button>
            </Card.Body>
        </Card>
    );
}

export default ProductDetails;