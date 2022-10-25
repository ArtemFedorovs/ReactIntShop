import React from 'react';
import {render, screen, fireEvent} from "@testing-library/react";
import ProductTile from "../Components/ProductTile/ProductTile";
import * as reduxHooks from "react-redux"
import {BrowserRouter as Router,} from "react-router-dom";
import storeData from "./TestStoreData.js";

jest.mock("react-redux")
const mockedUseDispatch = jest.spyOn(reduxHooks, 'useDispatch');
const mockedUseSelector = jest.spyOn(reduxHooks, 'useSelector')

const storeDataNoAut = {"autorization": ""} //данные из стора, когда юзер не авторизирован
let id = 1;
let name = "имя";
let img = "img"; 
let price = 300;
let stock = 2;

describe('ProductTile', function(): void {
    describe('render with', function(): void {
        it('should dispatch when clicking button', function() {  
            mockedUseSelector.mockImplementation(cb => cb(storeData))
            const dispatch = jest.fn();
            mockedUseDispatch.mockReturnValue(dispatch);
            renderProductTile();
            fireEvent.click(screen.getByText("Добавить в корзину"))
            expect(dispatch).toHaveBeenCalledWith({type: "ADD_TO_BUSCET", payload: {id: id, price: price, amount: 1, limit: stock}});
        }); 

        it('should not dispatch when clicking button without autorisation', function() {  
            mockedUseSelector.mockImplementation(cb => cb(storeDataNoAut))
            const dispatch = jest.fn();
            mockedUseDispatch.mockReturnValue(dispatch);
            renderProductTile();
            fireEvent.click(screen.getByText("Чтобы добавить товар в корзину залогинтесь"))
            expect(dispatch).not.toHaveBeenCalled();
        }); 

        it('should not dispatch when clicking button without stock', function() {  
            mockedUseSelector.mockImplementation(cb => cb(storeData))
            const dispatch = jest.fn();
            mockedUseDispatch.mockReturnValue(dispatch);
            render(
                <Router>
                    <ProductTile id = {id} img = {img} name = {name} price = {price} stock = {0}/>
                </Router> ) 
            fireEvent.click(screen.getByText("Нет в наличии"))
            expect(dispatch).not.toHaveBeenCalled();
        }); 
    });

    it('render', function() {
        renderProductTile();
        expect(screen.getByText(name)).toBeInTheDocument;

    });  

    describe('render with', function(): void {
        it('no autorization', function() {
            mockedUseSelector.mockImplementation(cb => cb(storeDataNoAut))
            renderProductTile();
            expect(screen.getByText("Чтобы добавить товар в корзину залогинтесь")).toBeInTheDocument;

        });

        it('autorization', function() {
            mockedUseSelector.mockImplementation(cb => cb(storeData))
            renderProductTile();
            expect(screen.getByText("Добавить в корзину")).toBeInTheDocument;

        });
    });
});

function renderProductTile() {
    return render(
        <Router>
            <ProductTile id = {id} img = {img} name = {name} price = {price} stock = {stock}/>
        </Router>  
    )
}


  