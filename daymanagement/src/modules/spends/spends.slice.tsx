import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { TShare } from "../share/share.slice";
import { currentUnixTimestamp } from "@/lib/Hooks/UseDayJS";

export type TSpends = {
  id: string;
  title: string;
  income: boolean;
  doDate: number;
  createDate: number;
  lastUpdate: number;
  incomeAmount?: string;
  shareList: string[];
  numberOfProduct?: string;
  priceOfProduct?: string;
  category: string;
  tag: string;
  description: string;
  dType: string;
};

export interface InitialState {
  ListSpends: TSpends[];
  selectedSpends: TSpends | {};
}

export const spendsListSlice = createSlice({
  reducerPath: "Spends",
  name: "@Spends",
  initialState: {
    ListSpends: [],
    selectedSpends: {},
  },
  reducers: {
    setSpendsList: (
      state: InitialState,
      action: PayloadAction<{
        id: string;
        title: string;
        income: boolean;
        doDate: number;
        shareList: string[];
        numberOfProduct: string;
        priceOfProduct: string;
        incomeAmount: string;
        category: string;
        tag: string;
        description: string;
      }>
    ) => {
      state.ListSpends = state.ListSpends
        ? [
            ...state.ListSpends,
            {
              id: nanoid(),
              title: action.payload.title,
              numberOfProduct: action.payload.numberOfProduct,
              priceOfProduct: action.payload.priceOfProduct,
              doDate: action.payload.doDate,
              createDate: currentUnixTimestamp,
              lastUpdate: currentUnixTimestamp,
              incomeAmount: action.payload.incomeAmount,
              shareList: action.payload.shareList,
              category: action.payload.category,
              tag: action.payload.tag,
              income: action.payload.income,
              description: action.payload.description,
              dType: "Spend",
            },
          ]
        : [
            {
              id: nanoid(),
              numberOfProduct: action.payload.numberOfProduct,
              priceOfProduct: action.payload.priceOfProduct,
              doDate: action.payload.doDate,
              createDate: currentUnixTimestamp,
              lastUpdate: currentUnixTimestamp,
              title: action.payload.title,
              shareList: action.payload.shareList,
              incomeAmount: action.payload.incomeAmount,
              category: action.payload.category,
              tag: action.payload.tag,
              income: action.payload.income,
              description: action.payload.description,
              dType: "Spend",
            },
          ];
    },
    delSpendsList: (state: InitialState, action: PayloadAction<string>) => {
      state.ListSpends = state.ListSpends.filter(
        (spends) => spends.id != action.payload
      );
    },
    updateSpendsList: (
      state: InitialState,
      action: PayloadAction<{
        id: any;
        title: string;
        income: boolean;
        doDate: number;
        shareList: string[];
        numberOfProduct: string;
        priceOfProduct: string;
        incomeAmount: string;
        category: string;
        tag: string;
        description: string;
      }>
    ) => {
      state.ListSpends = state.ListSpends.map((spends) =>
        spends.id == action.payload.id
          ? {
              ...spends,
              title: action.payload.title,
              income: action.payload.income,
              doDate: action.payload.doDate,
              lastUpdate: currentUnixTimestamp,
              numberOfProduct: action.payload.numberOfProduct,
              priceOfProduct: action.payload.priceOfProduct,
              incomeAmount: action.payload.incomeAmount,
              shareList: action.payload.shareList,
              category: action.payload.category,
              tag: action.payload.tag,
              description: action.payload.description,
              dType: "Spend",
            }
          : spends
      );
    },
    // updateSpendsListShare: (
    //   state: InitialState,
    //   action: PayloadAction<{
    //     id: string;
    //     peopleId: string;
    //     income: boolean;
    //     doDate: number;
    //     createDate: number;
    //     incomeAmount?: string;
    //     outcomeAmount?: string;
    //     shareId?: string;
    //     spendsId?: string;
    //     category: string;
    //     tag: string;
    //   }>
    // ) => {
    //   state.ListSpends = state.ListSpends.map((spends) =>
    //     spends.id == action.payload.spendsId
    //       ? {
    //           ...spends,
    //           shareList: spends.shareList.map((share) =>
    //             share == action.payload.id
    //               ? {
    //                   share,
    //                 }
    //               : share
    //           ),
    //         }
    //       : spends
    //   );
    // },
    delSpendsListShare: (
      state: InitialState,
      action: PayloadAction<{
        id: string;
        spendsId?: string;
      }>
    ) => {
      state.ListSpends = state.ListSpends.map((spends) =>
        spends.id == action.payload.spendsId
          ? {
              ...spends,
              shareList: spends.shareList.filter(
                (share) => share == action.payload.id
              ),
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
  // updateSpendsListShare,
  updateSpendsList,
  delSpendsListShare,
  selectSpendsList,
} = spendsListSlice.actions;
