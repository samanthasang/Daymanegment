import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TShare = {
  id: string;
  peopleId: string;
  income: boolean;
  doDate: number;
  createDate?: number;
  incomeAmount?: string;
  outcomeAmount?: string;
  spendsId?: string;
  visitId?: string;
  category: string;
  tag: string;
};

export interface InitialState {
  ListShare: TShare[];
  selectedShare: TShare | {};
}

export const shareListSlice = createSlice({
  reducerPath: "shareList",
  name: "@shareList",
  initialState: {
    ListShare: [],
    selectedShare: {},
  },
  reducers: {
    setShareList: (
      state: InitialState,
      action: PayloadAction<{
        id: string;
        peopleId: string;
        income: boolean;
        doDate: number;
        createDate: number;
        incomeAmount?: string;
        outcomeAmount?: string;
        spendsId?: string;
        visitId?: string;
        category: string;
        tag: string;
      }>
    ) => {
      state.ListShare = state.ListShare
        ? [
            ...state.ListShare,
            {
              id: action.payload.id,
              peopleId: action.payload.peopleId,
              outcomeAmount: action.payload.outcomeAmount,
              spendsId: action.payload.spendsId,
              incomeAmount: action.payload.incomeAmount,
              visitId: action.payload.visitId,
              category: action.payload.category,
              tag: action.payload.tag,
              doDate: action.payload.doDate,
              createDate: action.payload.createDate,
              income: action.payload.income,
            },
          ]
        : [
            {
              id: action.payload.id,
              peopleId: action.payload.peopleId,
              outcomeAmount: action.payload.outcomeAmount,
              spendsId: action.payload.spendsId,
              incomeAmount: action.payload.incomeAmount,
              visitId: action.payload.visitId,
              category: action.payload.category,
              tag: action.payload.tag,
              doDate: action.payload.doDate,
              createDate: action.payload.createDate,
              income: action.payload.income,
            },
          ];
    },
    delShareList: (state: InitialState, action: PayloadAction<string>) => {
      state.ListShare = state.ListShare.filter(
        (share) => share.id != action.payload
      );
    },
    delVisitShareList: (
      state: InitialState,
      action: PayloadAction<{
        id: string;
        visitId?: string;
      }>
    ) => {
      state.ListShare = state.ListShare.filter((share) =>
        share.id != action.payload.id
          ? {
              ...share,
              shareList: { ...share, visitId: "" },
            }
          : share
      );
    },
    delSpendsShareList: (
      state: InitialState,
      action: PayloadAction<{
        id: string;
        spendsId?: string;
      }>
    ) => {
      state.ListShare = state.ListShare.filter((share) =>
        share.id != action.payload.id
          ? {
              ...share,
              shareList: { ...share, spendsId: "" },
            }
          : share
      );
    },
    updateShareList: (
      state: InitialState,
      action: PayloadAction<{
        id: string;
        peopleId: string;
        income: boolean;
        doDate: number;
        createDate: number;
        incomeAmount?: string;
        outcomeAmount?: string;
        spendsId?: string;
        visitId?: string;
        category: string;
        tag: string;
      }>
    ) => {
      state.ListShare = state.ListShare.map((share) =>
        share.id == action.payload.id
          ? {
              ...share,
              peopleId: action.payload.peopleId,
              outcomeAmount: action.payload.outcomeAmount,
              spendsId: action.payload.spendsId,
              incomeAmount: action.payload.incomeAmount,
              visitId: action.payload.visitId,
              category: action.payload.category,
              tag: action.payload.tag,
              doDate: action.payload.doDate,
              createDate: action.payload.createDate,
              income: action.payload.income,
            }
          : share
      );
    },
    selectShareList: (state: InitialState, action: PayloadAction<string>) => {
      state.selectedShare = state.ListShare.filter(
        (share) => share.id == action.payload
      )[0];
    },
  },
});

export const shareReducer = shareListSlice.reducer;
export const shareReducerPath = shareListSlice.reducerPath;

export const {
  setShareList,
  delShareList,
  updateShareList,
  selectShareList,
  delVisitShareList,
  delSpendsShareList,
} = shareListSlice.actions;
