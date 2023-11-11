import React from "react"
interface countCart {
    count: number;
  }
  const initialState: countCart = {
    count: 0,
  };
  export const CartReducer = (state: countCart = initialState, action: any) => {
    switch (action.type) {
      case "INCREASE":
        return { ...state, count: state.count + 1 };
      case "DECREASE":
        return { ...state, count: 0 };
      default:
        return state;
    }
  };
  