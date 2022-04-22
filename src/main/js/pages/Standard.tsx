'use strict';
import { Card, Button} from 'react-bootstrap';

const React = require('react');

const Standard = () => {
  return <Card style={{ width: '18rem' }}>
           {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
           <Card.Body>
             <Card.Title>Example Burger</Card.Title>
             <Card.Text>
                Here will be some description of the burger.
             </Card.Text>
             <Button variant="primary">Order Me</Button>
           </Card.Body>
         </Card>;
};

export default Standard;