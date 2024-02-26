import { useState, useEffect } from 'react';
import Home from "./pages/Home.jsx";
import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout.jsx";
import OpenFridge from "./pages/OpenFridge.jsx";
import Recipes from "./pages/Recipes.jsx";
import Header from "./components/Header.jsx";

function App() {
 return(
    <div className='App'>
        <Header/>
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/myfridge' element={<OpenFridge/>}></Route>
                <Route path='/recipes' element={<Recipes/>}></Route>
            </Route>
        </Routes>
    </div>
 )
}

export default App
