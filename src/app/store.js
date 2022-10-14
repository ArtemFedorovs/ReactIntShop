import { configureStore } from '@reduxjs/toolkit';

const productListReducer = (state = {List: null}, action)=>{    
  switch (action.type){
    case "FETCH_DATA_SUCCESS":  return state.List ? state : action.payload ; 
    case "SAVE_NEW_PRODUCT_DATA":  
        return {List: state.List.map((elem) =>  {
                                                  if(elem.scu === action.payload.scu) {
                                                    return action.payload
                                                  } else {
                                                    return elem
                                                  }
                                                })
                };  
    default: return state;
  } ;
};

const busketReducer = (state = {}, action)=>{    
  switch (action.type){

    case "ADD_TO_BUSCET": {
      let newState = {...state};
      if ((newState[action.payload.id]?.amount || 0) + action.payload.amount <= action.payload.limit) {
        newState[action.payload.id] = newState[action.payload.id] ? 
            {amount: newState[action.payload.id].amount + action.payload.amount, total: newState[action.payload.id].total + action.payload.price * action.payload.amount} : 
            {amount: action.payload.amount, total: action.payload.price * action.payload.amount};
      }
      return newState;
    }; 

    case "DELETE_FROM_BUSCET": {
      let newState = {...state};
      delete newState[action.payload];
      return newState;
    };

    default: return state;
  } ;
};

const autorizationReducer = (state = null, action)=>{    
  switch (action.type){
    case "CHANGE_USER": return action.payload;   
    default: return state;
  } ;
};

export const store = configureStore({
  reducer: {
    productList: productListReducer,
    busket: busketReducer,
    autorization: autorizationReducer,
  },
});


