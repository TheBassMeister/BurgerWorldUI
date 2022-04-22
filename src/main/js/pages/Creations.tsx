'use strict';
import { Button} from 'react-bootstrap';
import React from "react";

const Create = ({handleShow}) => {

  return <div>
        <h1>Your Creations</h1>
        <p>You haven't created any Burgers yet.{' '}
        <Button variant="outline-primary" onClick={handleShow}>Click Here</Button>
          {' '}to create your first burgers.</p>
        </div>
        ;
};

export default Create;