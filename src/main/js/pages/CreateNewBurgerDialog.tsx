'use strict';

import { Modal, Button} from 'react-bootstrap';
import * as React from 'react';
import {useState} from 'react';
// @ts-ignore
import Ingredient from '../model/Ingredient.tsx';
// @ts-ignore
import Burger from '../model/Burger.tsx'

const CreateNewBurgerDialog = ({show, handleClose, ingredients}) =>{
    const [pageNr, setPageNr] = useState(1);
    const [currCost, setCurrCost] = useState(2.25);
    const [selectedBun, setSelectedBun] = useState("Regular Bun");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [currSelectedIngredients, setCurrSelectedIngredients]=useState([]);
    const [burgerName, setBurgerName]=useState("");

    const nextPage = () =>{
        let next=pageNr+1;
        if(next<=6){
            if(pageNr==1){
                currSelectedIngredients.push(selectedBun);
            }
            if(next==2 || next==6){
                setButtonDisabled(true);
            }
            setPageNr(next);
        }else{
            let burger=new Burger(burgerName,[]);
            currSelectedIngredients.forEach( ingr =>{
                burger.addIngredient(getIngredientByName(ingr));
            });
            {/* TODO: Add new burger to burgers*/}
            {closeDialog()}
        }
    }

    const closeDialog = () => {
        setPageNr(1);
        setSelectedBun("Regular Bun");
        setCurrSelectedIngredients([]);
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
                    {ingredients.filter(ingr => ingr.type==type).map((ingr,idx)=>{
                    return  <div key={idx}>
                               <input key={idx} type="checkbox" id={ingr.type} value={ingr.name+";"+ingr.price}
                                    checked={currSelectedIngredients.includes(ingr.name)} onChange={ingredientSelected}/>
                               <span className="ingredientLabel">{ingr.name} {ingr.price}{'$'}</span>
                            </div>;
                    })}
                </div>;
    }

    const ingredientSelected = (event) => {
        event.preventDefault();
        let checked=event.target.checked;
        let selected=event.target.value.split(";");
        let cost=0;
        if(checked){
            currSelectedIngredients.push(selected[0]);
            cost=currCost+(+selected[1]);
        }else{
            {/* Could be optimized to not search, but attempts did fail. Also array sizes are really small*/}
            let index = currSelectedIngredients.indexOf(selected[0]);
            currSelectedIngredients.splice(index, 1);
            cost=currCost-(+selected[1]);
        }
        setCurrCost(+cost.toFixed(2));
        if(pageNr==2){
            setButtonDisabled(currSelectedIngredients.length<2);
        }
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