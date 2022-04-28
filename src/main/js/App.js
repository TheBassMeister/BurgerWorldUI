'use strict';
import './styles/App.css';
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import * as React from "react";

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
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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

  let ingredients = [
        new Ingredient("Regular Bun","BUN", 0.25), new Ingredient("Sesame Bun","BUN", 0.40),
        new Ingredient("Gluten Free Bun","BUN", 0.35), new Ingredient("Beef Patty","BURGER", 1.20),
        new Ingredient("Chicken Patty","BURGER", 0.99), new Ingredient("Vegetarian Patty","BURGER", 1.20), new Ingredient("Lettuce","VEGETABLE", 0.10),
        new Ingredient("Tomato","VEGETABLE", 0.20), new Ingredient("Ketchup","SAUCE", 0.10),
        new Ingredient("Mayo","SAUCE", 0.10), new Ingredient("Chipotle","SAUCE", 0.20),
        new Ingredient("Bacon","OTHER", 0.8), new Ingredient("Cheese","OTHER", 0.30),
        new Ingredient("Pickles","OTHER",0.25)
  ];

  return (
    <BrowserRouter>
      <Header />
      <div className="mainBurgerDiv">
      <Routes>
        <Route exact path="/" element={<Home handleShow={handleShow} />} />
        <Route path="/standard" element={<Standard burgers={burgers}/>} />
        <Route path="/create" element={<Creations handleShow={handleShow} />} />
      </Routes>
      <CreateNewBurgerDialog show={show} handleClose={handleClose} ingredients={ingredients} />
      <Footer />
      </div>
    </BrowserRouter>
  );
}


ReactDOM.render(
	<App />,
	document.getElementById('react')
)