import React from 'react';
import './App.css';
import Header from './Components/Header/Header.js';
import Main from './Components/Main/Main.js';
import About from './Components/About/About.js';
import Product from './Components/Product/Product.js';
import WrongUrl from './Components/WrongUrl/WrongUrl.js';
import SideBarBasket from './Components/SideBarBasket/SideBarBasket.js';
import Basket from './Components/Basket/Basket.js';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {useSelector} from 'react-redux';

function App() {
  const autorization = useSelector((state)=>state.autorization);
  return (
    <Router>
      <Header/>
      <div className="main-container">
        <Routes>
              <Route path='/' element = {<><Main/>{autorization ? <SideBarBasket/> : null}</>} exact/>
              <Route path='/about' element = {<><About/>{autorization ? <SideBarBasket/> : null}</>} exact/>
              <Route path='/product' element = {<><Product/>{autorization ? <SideBarBasket/> : null}</>} exact/> 
              <Route path='/basket' element = {<><Basket/>{autorization ? <SideBarBasket/> : null}</>} exact/> 
              <Route path='*' exact={true} element = {<WrongUrl/>}/>          
        </Routes>         
      </div>
    </Router> 
  );
}

export default App;
