import React from 'react';
import storeData from "./TestStoreData.js";
import {render, screen, fireEvent} from "@testing-library/react";
import Product from "../Components/Product/Product";
import * as reduxHooks from "react-redux"
import {BrowserRouter as Router,} from "react-router-dom";

jest.mock("react-redux");
const mockedUseDispatch = jest.spyOn(reduxHooks, 'useDispatch');
const mockedUseSelector = jest.spyOn(reduxHooks, 'useSelector');

describe('Product', function(): void {

    it('render', function() {     
        mockedUseSelector.mockImplementation(cb => cb(storeData));
        renderProduct();
        expect(screen.getByText("Газонокосилка GD40LM46SP")).toBeInTheDocument;
        expect(screen.getByText(/Она имеет переменную скорость/i)).toBeInTheDocument;
        expect(screen.getByText(/Осталось в наличии: 1 Шт/i)).toBeInTheDocument;
        console.log(window.location)
    });
    it('edit mod is on after edit button pressed', function() {     
        mockedUseSelector.mockImplementation(cb => cb(storeData));
        renderProduct();
        fireEvent.click(screen.getByText("Редактировать"))
        expect(screen.getByText("Сохранить")).toBeInTheDocument;
        expect(screen.getByText("Отмена")).toBeInTheDocument;
        expect(screen.getByDisplayValue( /Газонокосилка GD40LM46SP/)).toBeInTheDocument;
        expect(screen.getByDisplayValue(/ GD40LM46SP — это мощная, универсальная/i)).toBeInTheDocument;
        fireEvent.click(screen.getByText("Отмена"))
        expect(screen.getByText("Газонокосилка GD40LM46SP")).toBeInTheDocument;
        expect(screen.getByText(/Она имеет переменную скорость/i)).toBeInTheDocument;
        expect(screen.getByText(/Осталось в наличии: 1 Шт/i)).toBeInTheDocument;
    });    
    it('edit mod is on -> save new data', function() {     
        mockedUseSelector.mockImplementation(cb => cb(storeData));
        const dispatch = jest.fn();
        mockedUseDispatch.mockReturnValue(dispatch);
        renderProduct();
        fireEvent.click(screen.getByText("Редактировать"))
        fireEvent.click(screen.getByText("Сохранить"));
        expect(dispatch).toHaveBeenCalled

    });  
    it('add to buscet button was clicked', function() {     
        mockedUseSelector.mockImplementation(cb => cb(storeData));
        const dispatch = jest.fn();
        mockedUseDispatch.mockReturnValue(dispatch);
        renderProduct();
        fireEvent.click(screen.getByText("Добавить в корзину"));
        expect(dispatch).toHaveBeenCalled;
    }); 
    it('order number was changed', function() {     
        mockedUseSelector.mockImplementation(cb => cb(storeData));
        renderProduct();
        fireEvent.change(screen.getByTestId("orderInput"), {target: {value:2 }});
        expect(screen.getByDisplayValue(2)).toBeInTheDocument;
    }); 
    it('limit was changed', function() {     
        mockedUseSelector.mockImplementation(cb => cb(storeData));
        renderProduct();
        fireEvent.click(screen.getByText("Редактировать"))
        fireEvent.change(screen.getByTestId("limitInput"), {target: {value:4 }});
        expect(screen.getByDisplayValue(4)).toBeInTheDocument;
    }); 
    it('name was changed', function() {     
        mockedUseSelector.mockImplementation(cb => cb(storeData));
        renderProduct();
        fireEvent.click(screen.getByText("Редактировать"))
        fireEvent.change(screen.getByTestId("nameInput"), {target: {value: "ewgwe" }});
        expect(screen.getByDisplayValue("ewgwe")).toBeInTheDocument;
    }); 
    it('description was changed', function() {     
        mockedUseSelector.mockImplementation(cb => cb(storeData));
        renderProduct();
        fireEvent.click(screen.getByText("Редактировать"))
        fireEvent.change(screen.getByTestId("descriptionInput"), {target: {value: "ewyrygwe" }});
        expect(screen.getByDisplayValue("ewyrygwe")).toBeInTheDocument;
    }); 
  });

function renderProduct() {
    return render(
        <Router>
            <Product/>
        </Router>  
    )
}