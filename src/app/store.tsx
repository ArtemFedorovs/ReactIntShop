import { configureStore } from '@reduxjs/toolkit';
import { AnyAction } from 'redux'

export type ProductInfoType = {scu: number,
  name: string,
  img: string,
  price: number
  currency: string,
  stock: number,
  units: string,
  description: string
}

export type ProductListStateType =  null | ProductInfoType[];

const productListReducer = (state: ProductListStateType = null, action: AnyAction): ProductListStateType => {    
  switch (action.type){
    case "FETCH_DATA_SUCCESS":  return state ? state : action.payload ; 
    case "SAVE_NEW_PRODUCT_DATA": return state && state.map(elem => {
                                                                      if(elem.scu === action.payload.scu) {
                                                                        return action.payload
                                                                      } else {
                                                                        return elem
                                                                      }
    }); 
    default: return state;
  } ;
};

type BusketStateType = {
  [key: number]: {amount: number,
                  total: number}
};

const busketReducer = (state: BusketStateType = {}, action: AnyAction): BusketStateType => {    
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

const autorizationReducer = (state: string = "admin", action: AnyAction): string => {    
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

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

