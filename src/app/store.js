import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import TableSlice from "../features/TableSlice";
import thunk from "redux-thunk";
export const store = configureStore({
  reducer: {
    result: TableSlice,
  },
});
