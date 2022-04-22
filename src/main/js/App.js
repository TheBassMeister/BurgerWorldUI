'use strict';
import './styles/App.css';
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";

import Header from './Header.tsx';
import Footer from './Footer.tsx';
import Home from "./pages/Home.tsx";
import Standard from "./pages/Standard.tsx";
import Creations from "./pages/Creations.tsx";
import CreateNewBurgerDialog  from "./pages/CreateNewBurgerDialog.tsx";

export default function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <BrowserRouter>
      <Header />
      <div className="mainBurgerDiv">
      <Routes>
        <Route exact path="/" element={<Home handleShow={handleShow} />} />
        <Route path="/standard" element={<Standard />} />
        <Route path="/create" element={<Creations handleShow={handleShow} />} />
      </Routes>
      <CreateNewBurgerDialog show={show} handleClose={handleClose}/>
      <Footer />
      </div>
    </BrowserRouter>
  );
}


ReactDOM.render(
	<App />,
	document.getElementById('react')
)