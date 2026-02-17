import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export type TVisit = {
  id: string;
  title: string;
  income: boolean;
  date: string;
  description: string;
  otherPayment: string;
  advancePayment?: string;
  paymentCompleteValue: string;
  category: string;
  tag: string;
};

export interface InitialState {
  ListVisit: TVisit[];
  selectedVisit: TVisit | {};
}

export const visitSlice = createSlice({
  reducerPath: "installmentstList",
  name: "@installmentstList",
  initialState: {
    ListVisit: [],
    selectedVisit: {},
  },
  reducers: {
    setVisitList: (
      state: InitialState,
      action: PayloadAction<{
        id: string;
        title: string;
        income: boolean;
        date: string;
        description: string;
        otherPayment: string;
        advancePayment?: string;
        paymentCompleteValue: string;
        category: string;
        tag: string;
      }>
    ) => {
      state.ListVisit = state.ListVisit
        ? [
            ...state.ListVisit,
            {
              id: nanoid(),
              title: action.payload.title,
              income: action.payload.income,
              date: action.payload.date,
              description: action.payload.description,
              otherPayment: action.payload.otherPayment,
              advancePayment: action.payload.advancePayment,
              paymentCompleteValue: action.payload.paymentCompleteValue,
              category: action.payload.category,
              tag: action.payload.tag,
            },
          ]
        : [
            {
              id: nanoid(),
              title: action.payload.title,
              income: action.payload.income,
              date: action.payload.date,
              description: action.payload.description,
              otherPayment: action.payload.otherPayment,
              advancePayment: action.payload.advancePayment,
              paymentCompleteValue: action.payload.paymentCompleteValue,
              category: action.payload.category,
              tag: action.payload.tag,
            },
          ];
    },
    delVisitList: (state: InitialState, action: PayloadAction<string>) => {
      state.ListVisit = state.ListVisit.filter(
        (installmentst) => installmentst.id != action.payload
      );
    },
    completeVisitList: (
      state: InitialState,
      action: PayloadAction<{
        id: string;
        lastUpdate: string;
      }>
    ) => {
      state.ListVisit = state.ListVisit.map((installmentst) =>
        installmentst.id == action.payload.id
          ? {
              ...installmentst,
              lastUpdate: action.payload.lastUpdate,
            }
          : installmentst
      );
    },
    updateVisitList: (
      state: InitialState,
      action: PayloadAction<{
        id: string;
        title: string;
        income: boolean;
        date: string;
        description: string;
        otherPayment: string;
        advancePayment?: string;
        paymentCompleteValue: string;
        category: string;
        tag: string;
      }>
    ) => {
      state.ListVisit = state.ListVisit.map((installmentst) =>
        installmentst.id == action.payload.id
          ? {
              ...installmentst,
              title: action.payload.title,
              date: action.payload.date,
              income: action.payload.income,
              description: action.payload.description,
              otherPayment: action.payload.otherPayment,
              advancePayment: action.payload.advancePayment,
              paymentCompleteValue: action.payload.paymentCompleteValue,
              category: action.payload.category,
              tag: action.payload.tag,
            }
          : installmentst
      );
    },
    selectVisitList: (state: InitialState, action: PayloadAction<string>) => {
      state.selectedVisit = state.ListVisit.filter(
        (installmentst) => installmentst.id == action.payload
      )[0];
    },
  },
});

export const VisitReducer = visitSlice.reducer;
export const VisitReducerPath = visitSlice.reducerPath;

export const {
  completeVisitList,
  setVisitList,
  delVisitList,
  updateVisitList,
  selectVisitList,
} = visitSlice.actions;
