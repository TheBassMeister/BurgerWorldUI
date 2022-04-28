'use strict';
// @ts-ignore
import Ingredient from './Ingredient.tsx';

export default class Burger{
    private name:String;
    private ingredients:Ingredient[];

    constructor(name:String, ingredients:Ingredient[]) {
        this.name = name;
        this.ingredients = ingredients;
    }

    get price(){
        let price=0.00;
        for (const ingr of this.ingredients) {
           price+=ingr.price;
        }
        return price;
    }

    addIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient);
    }
}