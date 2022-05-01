export default class Ingredient{
    private name:string;
    private type:string;
    private price:Number;

    constructor(name:string, type:string, price:Number){
        this.name=name;
        this.type=type;
        this.price=price;
    }
}