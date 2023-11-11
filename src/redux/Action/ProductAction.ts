import { IProduct } from "../Type";
import React from "react"
export const deleteProduct = (payload: string) => {
  return { type: "DELETE_PRODUCT", payload: payload };
};
export const addProduct = (payload: IProduct) => {
  return { type: "ADD_PRODUCT", payload: payload };
};
export const editProduct = (payload: IProduct | undefined) => {
  return { type: "EDIT_PRODUCT", payload: payload };
};
export const updateProduct = (payload: IProduct | undefined) => {
  return { type: "UPDATE_PRODUCT", payload: payload };
};
