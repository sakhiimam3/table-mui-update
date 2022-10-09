import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  hasErrors: false,
  tableList: [],
};

// A slice for recipes with our three reducers
const TableSlice = createSlice({
  name: "tableList",
  initialState,
  reducers: {
    getTable: (state) => {
      state.loading = true;
    },
    getTableSuccess: (state, { payload }) => {
      console.log(payload);
      state.tableList = payload;
      state.loading = false;
      state.hasErrors = false;
    },

    getTableFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

// Three actions generated from the slice
export const { getTable, getTableSuccess, getTableFailure } =
  TableSlice.actions;

// A selector
export const TableSelector = (state) => state.result;

// The reducer
export default TableSlice.reducer;

// Asynchronous thunk action
export function TableallData() {
  return async (dispatch) => {
    dispatch(getTable());

    try {
      const response = await fetch("http://localhost:3004/table");
      const data = await response.json();

      dispatch(getTableSuccess(data));
    } catch (error) {
      dispatch(getTableFailure());
    }
  };
}

// add todo

export function addTables(inputField) {
  console.log(inputField, "<<");
  return async (dispatch) => {
    try {
      await fetch("http://localhost:3004/table", {
        method: "POST",
        body: JSON.stringify(inputField),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())

        .then((json) => dispatch(TableallData()));
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateTable(id, newRow) {
  console.log(id, "id", newRow);
  return async (dispatch) => {
    try {
      await fetch(`http://localhost:3004/table/${id}`, {
        method: "PUT",
        body: JSON.stringify(newRow),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => dispatch(TableallData()));
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteTable(index) {
  console.log(index);
  return async (dispatch) => {
    try {
      await fetch(` http://localhost:3004/table/${index}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => dispatch(TableallData()));
    } catch (error) {
      console.log(error);
    }
  };
}
