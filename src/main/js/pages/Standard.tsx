'use strict';
import {CardGroup} from 'react-bootstrap';
// @ts-ignore
import Burger from '../model/Burger.tsx'
// @ts-ignore
import BurgerCard from './BurgerCard.tsx';
import * as React from 'react';

const Standard = ({burgers}) => {
    let burgerList=burgers.filter(burger => !burger.isCustom).map((burger,index) => {
            return <BurgerCard key={index} burger={burger} index={index}/>
        }
    );

    return <CardGroup>
    {burgerList}
    </CardGroup>;
};

export default Standard;