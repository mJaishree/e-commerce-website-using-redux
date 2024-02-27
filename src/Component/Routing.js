import React from "react";
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import { Home } from "./Home";
import { Fav } from "./Fav";
import { Cart } from "./Cart";
import {Detail} from './Detail';
//import { Login } from "./Login";
import { useSelector } from "react-redux";

export const Routing =()=>{
    const state = useSelector((samp)=>samp.data)
    console.log(state)
    return (
        <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/fav" element={<Fav/>}></Route>
                <Route path="/cart" element={<Cart/>}></Route>
                <Route path="/det/:id" element={<Detail/>}></Route>
            </Routes>
        </BrowserRouter>
        </div>
    )
}


