'use strict';
import { Card, CardGroup, Button} from 'react-bootstrap';
// @ts-ignore
import Burger from '../model/Burger.tsx'
// @ts-ignore
import Ingredient from '../model/Ingredient.tsx';
import * as React from 'react';


function getComponents(ingredientsMap) {
  const comps = [];
  ingredientsMap.forEach((value, key) =>
    comps.push(<span key={key.name}>- {key.name} x{value}<br/></span>)
  );
  return comps;
}

export default function BurgerCard({burger, index}){
        return <Card className="burgerCard" key={index} style={{ width: '18rem' }}>
                                <Card.Body className="burgerCardBody">
                                  <Card.Title>{burger.name}</Card.Title>
                                  <Card.Text className="burgerDesc">
                                       {
                                           getComponents(burger.ingredients)
                                       }
                                  </Card.Text>
                                   <span className="burgerPrice">Price: {burger.price.toFixed(2)}</span>
                                  <Button variant="primary">Order Me</Button>
                                </Card.Body>
                              </Card>
}