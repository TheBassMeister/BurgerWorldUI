'use strict';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import CreateNewBurgerDialog  from "./CreateNewBurgerDialog.tsx";
import React, { useState } from "react";

const Home = ({handleShow}) => {

  return <div>
    <h1>Welcome to the Burgerworld UI</h1>
    <p>
        This website is a test application written in React and deployed as Docker Containers.
        You can find all the sources in my personal <a href="https://github.com/TheBassMeister/" target="_blank">Github Repo</a>
    </p>
    <p>
      You can click <NavLink to="/standard">here</NavLink> to checkout all the StandardBurgers.
    </p>
    <p>
      <Button variant="outline-primary" onClick={handleShow}>Click Here</Button> to create your own Burgers. You can check them out <NavLink to="/create">here</NavLink>.
    </p>

  </div>
  ;
};

export default Home;
