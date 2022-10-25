import React from 'react';
import {render, screen, fireEvent} from "@testing-library/react";
import Header from "../Components/Header/Header";
import * as reduxHooks from "react-redux"
import {BrowserRouter as Router,} from "react-router-dom";
import storeData from "./TestStoreData.js";
import {fakeApiResults} from "../Components/Modal/fakeApiResults";

jest.mock("react-redux")
const mockedUseDispatch = jest.spyOn(reduxHooks, 'useDispatch');
const mockedUseSelector = jest.spyOn(reduxHooks, 'useSelector')

describe('Fake api results function tests', function(): void {
        expect(fakeApiResults("admin", "admin")).toBe("admin");
        expect(fakeApiResults("user", "user")).toBe("user");
        expect(fakeApiResults("sdgr", "sgn")).toBe(null);
})

describe('Header', function(): void {
        it('header renders', function() {  
            mockedUseSelector.mockImplementation(cb => cb(storeData))
            renderHeader();
            expect(screen.getByText("Главная")).toBeInTheDocument;
            expect(screen.getByText("О магазине")).toBeInTheDocument;
            expect(screen.getByText("Выйти")).toBeInTheDocument;
        }); 
        it('button sing out works', function() {  
            mockedUseSelector.mockImplementation(cb => cb(storeData))
            const dispatch = jest.fn();
            mockedUseDispatch.mockReturnValue(dispatch);
            renderHeader();
            fireEvent.click(screen.getByText("Выйти"));
            expect(dispatch).toHaveBeenCalled;           
        }); 
        it('button sing in works, then button cancel is works', function() {  
            mockedUseSelector.mockImplementation(cb => cb({"autorization": ""} ))
            renderHeader();
            fireEvent.click(screen.getByText("Войти"));
            expect(screen.getByTestId("modal")).toBeInTheDocument;
            expect(screen.getByText("Отмена")).toBeInTheDocument;
            fireEvent.click(screen.getByText("Отмена"));
            expect(screen.queryByTestId("modal")).not.toBeInTheDocument;        
        }); 
        it('button sing in works, then button "x" is works', function() {  
            mockedUseSelector.mockImplementation(cb => cb({"autorization": ""} ))
            renderHeader();
            fireEvent.click(screen.getByText("Войти"));
            expect(screen.getByTestId("modal")).toBeInTheDocument;
            expect(screen.getByText("Отмена")).toBeInTheDocument;
            fireEvent.click(screen.getByText("X"));
            expect(screen.queryByTestId("modal")).not.toBeInTheDocument;        
        }); 
        describe('Operations inside modal', () => {
            it('failed authentication attempt', function() {  
                mockedUseSelector.mockImplementation(cb => cb({"autorization": ""} ))
                renderHeader();
                fireEvent.click(screen.getByText("Войти"));
                expect(screen.getByTestId("modal")).toBeInTheDocument;
                fireEvent.click(screen.getByTestId("modalLogOnButton"));
                expect(screen.getByText("Проверка")).toBeInTheDocument;
                const findPromise = screen.findByText("Неверные логин и/или пароль!").then((Elem)=>{expect(Elem).toBeInTheDocument});     
            });
            it('successful authentication attempt', function() {  
                mockedUseSelector.mockImplementation(cb => cb({"autorization": ""} ))
                const dispatch = jest.fn();
                mockedUseDispatch.mockReturnValue(dispatch);
                renderHeader();
                fireEvent.click(screen.getByText("Войти"));
                expect(screen.getByTestId("modal")).toBeInTheDocument;
                fireEvent.change(screen.getByTestId("loginInput"), {target: {value: "admin" }});
                fireEvent.change(screen.getByTestId("passwordInput"), {target: {value: "admin" }});
                fireEvent.click(screen.getByTestId("modalLogOnButton"));
                expect(screen.getByText("Проверка")).toBeInTheDocument;
                const findPromise = screen.findByTestId("headerLogOnButton")
                    .then((Elem)=>{expect(Elem).toBeInTheDocument})
                    .then(()=>{expect(dispatch).toHaveBeenCalled}) 
                    .then(()=>{expect(screen.findByText("Неверные логин и/или пароль!")).not.toBeInTheDocument});    
            });
        });
  });

  function renderHeader() {
    return render(
        <Router>
            <Header/>
        </Router>  
    )
  }

