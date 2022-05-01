'use strict';

import { Modal, Button} from 'react-bootstrap';
import * as React from 'react';
import {useState} from 'react';
// @ts-ignore
import Ingredient from '../model/Ingredient.tsx';
// @ts-ignore
import Burger from '../model/Burger.tsx'

const CreateNewBurgerDialog = ({show, handleClose, ingredients, addNewBurger}) =>{
    const [pageNr, setPageNr] = useState(1);
    const [currCost, setCurrCost] = useState(2.25);
    const [selectedBun, setSelectedBun] = useState("Regular Bun");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [currSelectedIngredients, setCurrSelectedIngredients]=useState(new Map());

    const [burgerName, setBurgerName]=useState("");

    const nextPage = () =>{
        let next=pageNr+1;
        if(next<=6){
            if(pageNr==1){
                currSelectedIngredients.set(selectedBun, 1);
            }
            if(next==2 || next==6){
                setButtonDisabled(true);
            }
            setPageNr(next);
        }else{
            let burger=new Burger(burgerName,[], true);
            currSelectedIngredients.forEach( (value, key) =>{
                burger.addIngredient(getIngredientByName(key),value);
            });
            addNewBurger(burger);
            {closeDialog()}
        }
    }

    const closeDialog = () => {
        setPageNr(1);
        setSelectedBun("Regular Bun");
        setCurrSelectedIngredients(new Map());
        setCurrCost(2.25);
        setBurgerName("");
        setButtonDisabled(false);
        {handleClose()}
    }
    const getIngredientByName = (name) => {
        return ingredients.filter(ingr => ingr.name==name)[0];
    }

    const BunSelection = () => {
        return <div>
                <p>Please select your Bun:</p>
                    {ingredients.filter(ingr => ingr.type=="BUN").map((ingr,idx)=>{
                    return  <div key={idx} onChange={handleBunChanged}>
                               <input type="radio" name={"BUN"} value={ingr.name+";"+ingr.price} checked={selectedBun==ingr.name} onChange={e => {}}/>
                               <span className="ingredientLabel"> {ingr.name} {ingr.price}{'$'}</span>
                            </div>;
                    })}
                </div>;
    }

    const handleBunChanged = (event) => {
        event.preventDefault();
        let bunSelection=event.target.value.split(";");
        setSelectedBun(bunSelection[0]);
        setCurrCost(2+(+bunSelection[1]));
    }

    const IngredientSelection = ({type, typeAsString}) => {
        return <div>
                <p>Please select your {typeAsString}:</p>
                    <div className="ingrSelectionGrid">
                    {ingredients.filter(ingr => ingr.type==type).map((ingr,idx)=>{
                    const isSelected=currSelectedIngredients.has(ingr.name);
                    return  <React.Fragment key={idx}>
                               <div><input key={idx} type="checkbox" id={ingr.type} value={ingr.name+";"+ingr.price}
                                    checked={isSelected} onChange={ingredientSelected}/>
                               <span className="ingredientLabel">{ingr.name} {ingr.price}{'$'}</span></div>
                              <div><input className="ingredientQuant" type="number" id="quantity" name="quantity" min="1" max="5"
                               disabled={!isSelected} defaultValue={currSelectedIngredients.get(ingr.name)}
                               onChange={() => ingrAmountChanged(ingr.name, event)}/></div>
                            </React.Fragment>;
                    })}
                    </div>
                </div>;
    }

    const ingredientSelected = (event) => {
        event.preventDefault();
        let checked = event.target.checked;
        let selected = event.target.value.split(";");
        let ingrName = selected[0];
        let quantity = currSelectedIngredients.get(ingrName)? currSelectedIngredients.get(ingrName) : 1;
        let newPrice = quantity*(+selected[1]);
        let cost = 0;
        if(checked){
            currSelectedIngredients.set(ingrName,quantity);
            cost=currCost+newPrice;
        }else{
            currSelectedIngredients.delete(ingrName);
            cost=currCost-newPrice;
        }
        setCurrCost(+cost.toFixed(2));
        if(pageNr==2){
            setButtonDisabled(currSelectedIngredients.size<2);
        }
    }

    const ingrAmountChanged = (ingrName, event) =>{
        event.preventDefault();
        let quantity = event.target.value;
        let change = quantity - currSelectedIngredients.get(ingrName);
        currSelectedIngredients.set(ingrName, quantity);
        let ingr = getIngredientByName(ingrName);
        let cost = (ingr.price*change)+currCost;
        setCurrCost(+cost.toFixed(2));
    }

    const nameChanged = (event) => {
        event.preventDefault();
        setButtonDisabled(event.target.value.length==0)
        setBurgerName(event.target.value);
    }

    return <Modal show={show} onHide={closeDialog}>
                   <Modal.Header closeButton>
                     <Modal.Title>Create your own Burger</Modal.Title>
                   </Modal.Header>
                   <Modal.Body>
                       { pageNr==1? <BunSelection />: null}
                       { pageNr==2? <IngredientSelection type="BURGER" typeAsString="Burger"/>: null}
                       { pageNr==3? <IngredientSelection type="VEGETABLE" typeAsString="Veggies"/>: null}
                       { pageNr==4? <IngredientSelection type="SAUCE" typeAsString="Sauce"/>: null}
                       { pageNr==5? <IngredientSelection type="OTHER" typeAsString="Other Stuff"/>: null}
                       { pageNr==6? <div>
                                        <p>Please Name your Creation</p>
                                        <input key="bName" type="text" onChange={nameChanged}/>
                                    </div>: null}
                       <div className="newBurgerPrice">Your Burger would cost: {currCost}{'$'}</div>
                    </Modal.Body>
                   <Modal.Footer>
                     <Button variant="secondary" onClick={closeDialog}>
                       Cancel
                     </Button>
                     <Button variant="primary" onClick={nextPage} disabled={buttonDisabled}>
                       { pageNr==6? "Order":"Next"}
                     </Button>
                   </Modal.Footer>
     </Modal>;
}

export default CreateNewBurgerDialog;