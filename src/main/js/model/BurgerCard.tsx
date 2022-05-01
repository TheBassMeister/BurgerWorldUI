'use strict';
import * as React from 'react';
import { Card, CardGroup, Button} from 'react-bootstrap';
// @ts-ignore
import Burger from '../model/Burger.tsx';


export default function BurgerCard({burger, index}) {

    return (
        <Card className="burgerCard" key={index} style={{ width: '18rem' }}>
           <Card.Body className="burgerCardBody">
             <Card.Title>{burger.name}</Card.Title>
             <Card.Text className="burgerDesc">
                  {burger.ingredients.map((ingr,idx)=>{
                      return <span key={idx}>- {ingr.name}<br/></span>;
                  })}
             </Card.Text>
              <span className="burgerPrice">Price: {burger.price}</span>
             <Button variant="primary">Order Me</Button>
           </Card.Body>
         </Card>
    );

}