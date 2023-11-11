import axios from "axios";
import { IProduct } from "../Type";
import BaseAxios from "../../api/axiosClient";
import React, { useState } from "react"
export interface IState {
  productList: any[];
  productEdit: any;
  type: string;
  responses: any
}
const initialState: IState = {
  productList: [],
  productEdit: {
    name: "",
    quantity: 0,
    price: 0,
    description: "",
    categoryId: 0,
    stock: 0,
  },
  type: "",
  responses: ""
};
export const ProductReducer = (state: IState = initialState, action: any) => {
  const deleteProductAPI = async (id: string) => {
    await BaseAxios({ url: `/products/${id}`, method: "DELETE" }).then((response) => {
      console.log(response);
    }
    ).catch(err => console.log(err))

  };

  switch (action.type) {    
    case "DELETE_PRODUCT": {
      deleteProductAPI(action.payload);
      // const updateProductsAPI = state.productList.filter(
      //   (item) => item.id !== action.payload
      // );
      return {
        ...state
        // ,
        // productList: updateProductsAPI,
      };
    }
    case "ADD_PRODUCT":
      // addProductAPI(action.payload);
      return {
        ...state,
        productList: [...state.productList, action.payload],
        type: "Add",
      };
    case "EDIT_PRODUCT":
      return {
        ...state,
        editProduct: action.payload,
        type: "Edit",
      };
    default:
      return state;
  }
};
