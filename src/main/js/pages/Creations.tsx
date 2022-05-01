'use strict';
import { CardGroup, Button } from 'react-bootstrap';
import * as React from "react";
// @ts-ignore
import BurgerCard from './BurgerCard.tsx';

const Create = ({handleShow, burgers}) => {

    const CreateButton = () => {
        return (
            <Button variant="outline-primary" onClick={handleShow}>Click Here</Button>
        );
    }

    let burgerList=burgers.filter(burger => burger.isCustom).map((burger,index)=>{
        return <BurgerCard key={index} burger={burger} index={index}/>
    });

    return <div>
            <h1>Your Creations</h1>
            {burgerList.length==0?
                <p>You haven't created any Burgers yet.{' '}
                    <CreateButton />{' '}to create your first burgers.</p>:
                <div>
                    <CardGroup>{burgerList}</CardGroup>
                    <p className="orderAnother"><CreateButton /> to create another Burger</p>
                </div>
            }
    </div>;
};

export default Create;