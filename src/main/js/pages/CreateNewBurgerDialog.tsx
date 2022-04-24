'use strict';

import { Modal, Button} from 'react-bootstrap';
import * as React from "react";
// @ts-ignore
import Ingredient from './Ingredient.tsx';

const CreateNewBurgerDialog = ({show, handleClose, ingredients}) =>{

    type SelectionProps={
        type: string,
        typeAsString: string
    }

    const Selection = ({type, typeAsString}) =>{
        return <div>
                <p>Please select your {typeAsString}:</p>
                <ul>
                    {ingredients.filter(ingr => ingr.type==type).map((ingr,idx)=>{
                    return <li key={idx}>{ingr.name} {ingr.price}</li>;
                    })}
                </ul>
                </div>;
    }

    return <Modal show={show} onHide={handleClose}>
                   <Modal.Header closeButton>
                     <Modal.Title>Create your own Burger</Modal.Title>
                   </Modal.Header>
                   <Modal.Body><Selection type="BUN" typeAsString="Bun"/></Modal.Body>
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