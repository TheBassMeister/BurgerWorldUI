'use strict';
// @ts-ignore
import Ingredient from './Ingredient.tsx';

export default class Burger{
    private name:string;
    private ingredients:Map<Ingredient, Number>;
    private isCustom:Boolean;

    constructor(name:string, isCustom:Boolean) {
        this.name = name;
        this.ingredients = new Map();
        this.isCustom = isCustom;
    }

    get price(){
        let price=2.00;
        for (let ingr of this.ingredients.entries()) {
           price+=(ingr[0].price * +ingr[1]);
        }
        return price;
    }

    addIngredient(ingredient:Ingredient, amount:Number){
        this.ingredients.set(ingredient,amount);
    }
}