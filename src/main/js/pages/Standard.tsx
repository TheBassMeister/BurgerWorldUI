'use strict';
import { Card, CardGroup, Button} from 'react-bootstrap';
// @ts-ignore
import Burger from '../model/Burger.tsx'
// @ts-ignore
import Ingredient from '../model/Ingredient.tsx';
import * as React from 'react';

const Standard = ({burgers}) => {

    let burgerList=burgers.map((burger,index)=>{
    return <Card className="burgerCard" key={index} style={{ width: '18rem' }}>
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

    });

    return <CardGroup>
    {burgerList}
    </CardGroup>;
};

export default Standard;