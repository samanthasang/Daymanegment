import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export type TSpends = {
  id?: string
  title: string
  income: boolean
  date: string,
  incomeAmount?: string
  numberOfProduct?: string
  priceOfProduct?: string
  category: string
  tag: string
}

export interface InitialState {
  ListSpends: TSpends[];
  selectedSpends: TSpends | {}
}

export const spendsListSlice = createSlice({
  reducerPath: "spendsList",
  name: "@spendsList",
  initialState: {
    ListSpends: [],
    selectedSpends: {}
  },
  reducers: {
    setSpendsList: (state: InitialState, action: PayloadAction<{
      id: string,
      title: string,
      income: boolean,
      date: string,
      numberOfProduct: string,
      priceOfProduct: string,
      incomeAmount: string,
      category: string,
      tag: string
    }>) => {
      state.ListSpends = state.ListSpends ? [
        ...state.ListSpends,
        {
          id: nanoid(),
          title: action.payload.title,
          numberOfProduct: action.payload.numberOfProduct,
          priceOfProduct: action.payload.priceOfProduct,
          incomeAmount: action.payload.incomeAmount,
          category: action.payload.category,
          tag: action.payload.tag,
          date: action.payload.date,
          income: action.payload.income
        },
      ] : [
          {
            id: nanoid(),
            numberOfProduct: action.payload.numberOfProduct,
            priceOfProduct: action.payload.priceOfProduct,
            date: action.payload.date,
            title: action.payload.title,
            incomeAmount: action.payload.incomeAmount,
            category: action.payload.category,
            tag: action.payload.tag,
            income: action.payload.income
          },
      ];
    },
    delSpendsList: (state: InitialState, action: PayloadAction<string>) => {
      state.ListSpends = state.ListSpends.filter(
        (spends) => spends.id != action.payload
      );
    },
    updateSpendsList: (state: InitialState, action: PayloadAction<{
      id: any
      title: string
      income: boolean
      date: string
      numberOfProduct: string
      priceOfProduct: string
      incomeAmount: string
      category: string
      tag: string
    }>) => {
      state.ListSpends = state.ListSpends.map((spends) =>
        spends.id == action.payload.id
          ? {
            ...spends,
            title: action.payload.title,
            income: action.payload.income,
            numberOfProduct: action.payload.numberOfProduct,
            priceOfProduct: action.payload.priceOfProduct,
            incomeAmount: action.payload.incomeAmount,
            date: action.payload.date,
            category: action.payload.category,
            tag: action.payload.tag,
          }
          : spends
      );
    },
    selectSpendsList: (state: InitialState, action: PayloadAction<string>) => {
      state.selectedSpends = state.ListSpends.filter(
        (spends) => spends.id == action.payload
      )[0];
    },
  },
});

export const spendsReducer = spendsListSlice.reducer;
export const spendsReducerPath = spendsListSlice.reducerPath;

export const {
  setSpendsList,
  delSpendsList,
  updateSpendsList,
  selectSpendsList
} =
  spendsListSlice.actions;
