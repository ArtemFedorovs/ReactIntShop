//package.json  =>  ”test”: “jest”
//npm install --save-dev @testing-library/dom
//npm install --save-dev react-test-renderer

//npm install --save-dev babel-jest @babel/core @babel/preset-env
//  фикс оштбки чтения jsx https://uproger.com/dobavlenie-testirovaniya-v-proekt-react-typescript-s-pomoshhyu-jest-za-4-prostyh-shaga/
// фикс импортов jest https://stackoverflow.com/questions/35756479/does-jest-support-es6-import-export
// css module fix https://www.npmjs.com/package/jest-css-modules
// svg import fix https://www.npmjs.com/package/jest-transform-stub

import React from 'react';
import {render, screen} from "@testing-library/react";
import SideBarBasket from "../Components/SideBarBasket/SideBarBasket";
import * as reduxHooks from "react-redux"
import {BrowserRouter as Router,} from "react-router-dom";
import storeData from "./TestStoreData.js";

jest.mock("react-redux")
const mockedUseSelector = jest.spyOn(reduxHooks, 'useSelector')

describe('SideBarBasket', function(): void {
    describe('render data right when', function(): void {
        it('one product in busket', function() { 
            mockedUseSelector.mockImplementation(fn => fn(storeData))
            renderideBarBasket();
            expect(screen.getByRole('link', {name: "В корзине товаров: 1 шт. На сумму 3455 рублей"})).toBeInTheDocument;

        });
    });
});

  function renderideBarBasket() {
    return render(
        <Router>
            <SideBarBasket/>
        </Router>  
    )
  }
