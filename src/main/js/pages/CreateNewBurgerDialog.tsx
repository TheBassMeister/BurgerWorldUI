'use strict';

import { Modal, Button} from 'react-bootstrap';
import React from "react";

const CreateNewBurgerDialog = ({show, handleClose}) =>{

    return <Modal show={show} onHide={handleClose}>
                   <Modal.Header closeButton>
                     <Modal.Title>Create your own Burger</Modal.Title>
                   </Modal.Header>
                   <Modal.Body>Under Construction</Modal.Body>
                   <Modal.Footer>
                     <Button variant="secondary" onClick={handleClose}>
                       Cancel
                     </Button>
                     <Button variant="primary" onClick={handleClose}>
                       Next
                     </Button>
                   </Modal.Footer>
     </Modal>;
}

export default CreateNewBurgerDialog;