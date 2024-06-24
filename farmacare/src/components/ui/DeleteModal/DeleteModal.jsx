import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

const DeleteModal = ({ showDeleteModal, onHide, onDelete }) => {
    const deleteProductHandler = () => {
        onDelete();
        onHide();
    }

    const handleClose = () => onHide();
    return (
        <Modal show={showDeleteModal} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>¿Estás seguro de que deseas eliminar este producto?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={deleteProductHandler}>
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteModal;