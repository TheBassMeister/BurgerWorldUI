'use strict';

import { Modal, Button} from 'react-bootstrap';
import * as React from 'react';
import {useState} from 'react';
// @ts-ignore
import Ingredient from '../model/Ingredient';
// @ts-ignore
import Burger from '../model/Burger.tsx'

const CreateNewBurgerDialog = ({show, handleClose, ingredients, addNewBurger}) =>{
    const [pageNr, setPageNr] = useState(1);
    const [currCost, setCurrCost] = useState(2.25);
    const [selectedBun, setSelectedBun] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [currSelectedIngredients, setCurrSelectedIngredients]=useState(new Map());
    const [burgerName, setBurgerName]=useState("");

    let defaultBun=[...ingredients].filter(ingr => ingr[1].type=="BUN")[0];

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
                burger.addIngredient(key ,value);
            });
            addNewBurger(burger);
            {closeDialog()}
        }
    }

    const closeDialog = () => {
        setPageNr(1);
        setSelectedBun(defaultBun[0]);
        setCurrSelectedIngredients(new Map());
        setCurrCost(2.25);
        setBurgerName("");
        setButtonDisabled(false);
        {handleClose()}
    }

    const BunSelection = () => {
        return <div>
                <p>Please select your Bun:</p>
                    {[...ingredients].filter(ingr => ingr[1].type=="BUN").map((ingr,idx)=>{
                    return  <div key={idx} onChange={handleBunChanged}>
                               <input type="radio" name={"BUN"} value={ingr[0]+";"+ingr[1].price} checked={selectedBun==ingr[0]} onChange={e => {}}/>
                               <span className="ingredientLabel"> {ingr[1].name} {ingr[1].price}{'$'}</span>
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
                    {[...ingredients].filter(([id, ingr])=> ingr.type==type).map((ingr,idx)=>{
                    const isSelected=currSelectedIngredients.has(ingr[0]);
                    return  <React.Fragment key={idx}>
                               <div><input key={idx} type="checkbox" id={ingr.id} value={ingr[0]+";"+ingr[1].price}
                                    checked={isSelected} onChange={ingredientSelected}/>
                               <span className="ingredientLabel">{ingr[1].name} {ingr[1].price}{'$'}</span></div>
                              <div><input className="ingredientQuant" type="number" id="quantity" name="quantity" min="1" max="5"
                               disabled={!isSelected} defaultValue={currSelectedIngredients.get(ingr[0])}
                               onChange={() => ingrAmountChanged(ingr[0], event)}/></div>
                            </React.Fragment>;
                    })}
                    </div>
                </div>;
    }

    const ingredientSelected = (event) => {
        event.preventDefault();
        let checked = event.target.checked;
        let selected = event.target.value.split(";");
        let ingrId=selected[0];
        let quantity = currSelectedIngredients.get(ingrId)? currSelectedIngredients.get(ingrId) : 1;
        let newPrice = quantity*(+selected[1]);
        let cost = 0;
        if(checked){
            currSelectedIngredients.set(ingrId,quantity);
            cost=currCost+newPrice;
        }else{
            currSelectedIngredients.delete(ingrId);
            cost=currCost-newPrice;
        }
        setCurrCost(+cost.toFixed(2));
        if(pageNr==2){
            setButtonDisabled(currSelectedIngredients.size<2);
        }
    }

    const ingrAmountChanged = (ingr, event) =>{
        event.preventDefault();
        let quantity = event.target.value;
        let change = quantity - currSelectedIngredients.get(ingr);
        currSelectedIngredients.set(ingr, quantity);
        let cost = (ingredients.get(ingr).price*change)+currCost;
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