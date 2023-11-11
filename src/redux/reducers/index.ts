import { combineReducers } from "redux";
import { ProductReducer } from "./ProductReducer";
import { CartReducer } from "./CartReducer";
import { searchReducer } from "./searchReducer";
import { tabReducer} from "./tabReducer";
import {paginationReducer} from "./PaginationReducer";

export const rootReducer = combineReducers({
  products: ProductReducer,
  cart: CartReducer,
  search: searchReducer,
 tab: tabReducer,
 pagination: paginationReducer,

});
