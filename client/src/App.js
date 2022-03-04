import React, { useEffect, useState} from "react";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Grow, Grid } from "@mui/material";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import useStyles from "./styles";

const App = () => {

    return(
        <Router>
            <Container maxidth="lg">
                <Navbar/>
                <Routes>
                    <Route path="/" exact element={<Home/>}/> 
                    <Route path="/auth" exact element={<Auth/>} />
                </Routes>
            </Container>
        </Router>
    )
}


export default App;