import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Main from './Components/Main/Main';
import About from './Components/About/About';
import Product from './Components/Product/Product';
import WrongUrl from './Components/WrongUrl/WrongUrl';
import SideBarBasket from './Components/SideBarBasket/SideBarBasket';
import Basket from './Components/Basket/Basket';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {useSelector} from 'react-redux';
import {RootState} from './app/store'; //типы

function App(): JSX.Element {
  const autorization = useSelector((state: RootState)=>state.autorization);
  return (
    <Router>
      <Header/>
      <div className="main-container">
        <Routes>
              <Route path='/' element = {<><Main/>{autorization ? <SideBarBasket/> : null}</>} />
              <Route path='/about' element = {<><About/>{autorization ? <SideBarBasket/> : null}</>} />
              <Route path='/product' element = {<><Product/>{autorization ? <SideBarBasket/> : null}</>} /> 
              <Route path='/basket' element = {<><Basket/>{autorization ? <SideBarBasket/> : null}</>} /> 
              <Route path='*'  element = {<WrongUrl/>}/>          
        </Routes>         
      </div>
    </Router> 
  );
}

export default App;
