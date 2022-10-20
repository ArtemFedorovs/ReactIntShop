import React from 'react';
import {render, screen} from "@testing-library/react";
import About from "../Components/About/About";


describe('About', function(): void {    
        it('renders', function() { 
            renderAbout();
            expect(screen.getByText("Этот интернет магазин создан в качестве домашнего задания для применения на практики технологий React+Redux+React router")).toBeInTheDocument;
    });
  });

  function renderAbout() {
    return render(
            <About/> 
    )
  }
