import React from 'react';
import {render, screen, fireEvent} from "@testing-library/react";
import Basket from "../Components/Basket/Basket";
import * as reduxHooks from "react-redux";
import storeData from "./TestStoreData.js";
import {BrowserRouter as Router,} from "react-router-dom";


jest.mock("react-redux")
const mockedUseDispatch = jest.spyOn(reduxHooks, 'useDispatch');
const mockedUseSelector = jest.spyOn(reduxHooks, 'useSelector')

describe('Basket', function(): void {    
        it('renders with product in basket then delete this product', function() { 
            mockedUseSelector.mockImplementation(cb => cb(storeData));
            const dispatch = jest.fn();
            mockedUseDispatch.mockReturnValue(dispatch);
            renderBasket();
            expect(screen.getByText("Корзина")).toBeInTheDocument; 
            expect(screen.getByText("124346715")).toBeInTheDocument;   
            expect(screen.getByTestId("busketRow")).toBeInTheDocument; 
            fireEvent.click(screen.getByText("X")); 
            expect(screen.queryByTestId("busketRow")).not.toBeInTheDocument;   
    });
});

  function renderBasket() {
    return render(
        <Router>
            <Basket/> 
        </Router> 
    )
  }

  