'use strict';
import { Card, CardGroup, Button} from 'react-bootstrap';
// @ts-ignore
import Burger from '../model/Burger.tsx'
// @ts-ignore
import Ingredient from '../model/Ingredient.tsx';
import { useState } from "react";
import * as React from 'react';

const Standard = () => {
    {/* Currently hardcoded will be replaced with rest call*/}
    let burgers = [
        new Burger("Standard Burger", [
            new Ingredient("Regular Bun", "BUN", 0.25),
            new Ingredient("Beef Patty","BURGER", 1.20),
            new Ingredient("Cheese", "OTHER", 0.30),
            new Ingredient("Ketchup","SAUCE", 0.10)]),
        new Burger("The Veg", [
            new Ingredient("Gluten Free Bun","BUN",0.35),
            new Ingredient("Vegetarian Patty","BURGER",1.20),
            new Ingredient("Lettuce","VEG",0.10)])
    ];
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