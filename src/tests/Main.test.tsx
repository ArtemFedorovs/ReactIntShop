import React from 'react';
import {render, screen} from "@testing-library/react";
import Main from "../Components/Main/Main";
import * as reduxHooks from "react-redux";
import storeData from "./TestStoreData.js";
import {BrowserRouter as Router,} from "react-router-dom";

jest.mock("react-redux")
const mockedUseDispatch = jest.spyOn(reduxHooks, 'useDispatch');
const mockedUseSelector = jest.spyOn(reduxHooks, 'useSelector')

describe('WrongUrl', function(): void {    
    it('renders with product list', function() { 
        mockedUseSelector.mockImplementation(cb => cb(storeData))
        const dispatch = jest.fn();
        mockedUseDispatch.mockReturnValue(dispatch);
        renderMain();
        expect(dispatch).toHaveBeenCalled
        expect(screen.getAllByTestId("productTile")).toBeInTheDocument;
    });
    it('renders without product list', function() { 
        mockedUseSelector.mockImplementation(cb => cb({"productList": null}))
        const dispatch = jest.fn();
        mockedUseDispatch.mockReturnValue(dispatch);
        renderMain();
        expect(dispatch).toHaveBeenCalled
        expect(screen.queryAllByTestId("productTile")).not.toBeInTheDocument;
    });
});

  function renderMain() {
    return render(
        <Router>
            <Main/> 
        </Router> 
    )
  }

  