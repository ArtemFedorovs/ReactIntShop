import React from 'react';
import {render, screen} from "@testing-library/react";
import WrongUrl from "../Components/WrongUrl/WrongUrl";


describe('WrongUrl', function(): void {    
        it('renders', function() { 
            renderideWrongUrl();
            expect(screen.getByText("Что-то пошло не так. Данной страницы не существует")).toBeInTheDocument;
    });
});

function renderideWrongUrl() {
    return render(
            <WrongUrl/> 
    )
}
