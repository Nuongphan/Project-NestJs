import React from "react"
export const filterProducts= (payload: any) => {
  return { type: "FILTER_PRODUCT", payload: payload };
};