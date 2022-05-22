'use strict';
import './styles/App.css';
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import * as React from "react";
import axios from "axios";

import Header from './Header.tsx';
import Footer from './Footer.tsx';
import Home from "./pages/Home.tsx";
import Standard from "./pages/Standard.tsx";
import Creations from "./pages/Creations.tsx";
import CreateNewBurgerDialog  from "./pages/CreateNewBurgerDialog.tsx";
import Ingredient from "./model/Ingredient.tsx"
import Burger from "./model/Burger.tsx"

export default function App() {
    const [show, setShow] = useState(false);
    const [burgers, setBurgers] = useState([]);
    const [ingredients,setIngredients] = useState(new Map());

    React.useEffect(() => {


        axios.get("http://localhost:8080/ingredients").then((response) => {
          response.data.map( ingr => {
                  ingredients.set(ingr.id,new Ingredient(ingr.name, ingr.type, ingr.cost));
              }
          );
        }).then(
            axios.get("http://localhost:8080/burgers").then((response) => {
                let brgs=response.data.map( b => {
                    let brg=new Burger(b.name, b.isCustom);
                    for (const [key, value] of Object.entries(b.ingredients)) {
                      brg.addIngredient(ingredients.get(key),value)
                    }
                    return brg;
                }
            );
            setBurgers(brgs);
            }).catch(error => {
                console.log(error.response.status+" "+error.response.data);
            })
        ).catch(error => {
          console.log(error);
        });
    }, []);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  {/* Auth Currently hardcoded, will get fixed once user functionality will be added to project*/}
  const addNewBurger = (burger) => {
     axios.post("http://localhost:8080/burgers",
      {
        name: burger.name,
        ingredients: Object.fromEntries(burger.ingredients)
      }, {
        auth: {
            username: 'root',
            password: 'pass'
        }
      }
     ).then((response) =>{
        if(response.status==201){
            console.log("Successfully Persisted Burger");
        }else{
            console.log("Failed to persist burger "+response.statusText);
        }
     }).catch(error => {
        console.log("Failed to persist burger "+error);
     });
  }

  return (
    <BrowserRouter>
      <Header />
      <div className="mainBurgerDiv">
      <Routes>
        <Route exact path="/" element={<Home handleShow={handleShow} />} />
        <Route path="/standard" element={<Standard burgers={burgers}/>} />
        <Route path="/create" element={<Creations handleShow={handleShow} burgers={burgers}/>} />
      </Routes>
      <CreateNewBurgerDialog show={show} handleClose={handleClose} ingredients={ingredients} addNewBurger={addNewBurger}/>
      <Footer />
      </div>
    </BrowserRouter>
  );
}


ReactDOM.render(
	<App />,
	document.getElementById('react')
)