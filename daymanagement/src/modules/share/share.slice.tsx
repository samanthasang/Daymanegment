import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export type TShare = {
  id: string;
  title: string;
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
  description: string;
  dType: string;
};

export interface InitialState {
  ListShare: TShare[];
  selectedShare: TShare | {};
}

export const shareListSlice = createSlice({
  reducerPath: "Shares",
  name: "@Shares",
  initialState: {
    ListShare: [],
    selectedShare: {},
  },
  reducers: {
    setShareList: (
      state: InitialState,
      action: PayloadAction<{
        id: string;
        title: string;
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
        description: string;
      }>
    ) => {
      state.ListShare = state.ListShare
        ? [
            ...state.ListShare,
            {
              id: nanoid(),
              title: action.payload.title,
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
              description: action.payload.description,
              dType: "Share",
            },
          ]
        : [
            {
              id: nanoid(),
              title: action.payload.title,
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
              description: action.payload.description,
              dType: "Share",
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
        title: string;
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
        description: string;
      }>
    ) => {
      state.ListShare = state.ListShare.map((share) =>
        share.id == action.payload.id
          ? {
              ...share,
              peopleId: action.payload.peopleId,
              title: action.payload.title,
              outcomeAmount: action.payload.outcomeAmount,
              spendsId: action.payload.spendsId,
              incomeAmount: action.payload.incomeAmount,
              visitId: action.payload.visitId,
              category: action.payload.category,
              tag: action.payload.tag,
              doDate: action.payload.doDate,
              createDate: action.payload.createDate,
              income: action.payload.income,
              description: action.payload.description,
              dType: "Share",
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
