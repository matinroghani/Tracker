import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Transaction } from "../types";

interface TransactionsState {
  transactionsList: Transaction[];
}

const initialState: TransactionsState = {
  transactionsList: [],
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactionsList.unshift(action.payload);
    }
  },
});

export const { addTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
