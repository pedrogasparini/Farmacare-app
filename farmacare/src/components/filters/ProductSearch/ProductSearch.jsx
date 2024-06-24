import { Form } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";

const ProductSearch = ({onSearch}) => {

    const changeSearchHandler = (event) => {
        onSearch(event.target.value);
    }

    return (
        <Form.Group controlId="searchProduct">
            <Form.Control
                onChange={changeSearchHandler}
                type="text"
                placeholder="Buscar un producto..."
            />
        </Form.Group>
    );
}

ProductSearch.propTypes = {
    onSearch: propTypes.func,
}

export default ProductSearch;