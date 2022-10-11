import { configureStore } from '@reduxjs/toolkit';

const productListReducer = (state = {}, action)=>{    
  switch (action.type){

    case "FETCH_DATA_SUCCESS": {
      return action.payload ;
    };   
    default: return state;
  } ;
};

const busketReducer = (state = {}, action)=>{    
  switch (action.type){

    case "ADD_TO_BUSCET": {
      let newState = {...state};
      newState[action.payload.id] = newState[action.payload.id] ? 
          {amount: newState[action.payload.id].amount + action.payload.amount, total: newState[action.payload.id].total + action.payload.price * action.payload.amount} : 
          {amount: action.payload.amount, total: action.payload.price * action.payload.amount};
      return newState;
    };   
    default: return state;
  } ;
};


export const store = configureStore({
  reducer: {
    productList: productListReducer,
    busket: busketReducer,
  },
});


