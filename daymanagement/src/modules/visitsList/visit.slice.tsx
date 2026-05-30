import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TShare } from "../share/share.slice";

export type TVisit = {
  id: string;
  title: string;
  income: boolean;
  isComplete: boolean;
  doDate: number;
  createDate: number;
  description: string;
  shareList: string[];
  advancePayment?: string;
  paymentCompleteValue: string;
  category: string;
  tag: string;
  dType: string;
};

export interface InitialState {
  ListVisit: TVisit[];
  selectedVisit: TVisit | {};
}

export const visitSlice = createSlice({
  reducerPath: "Visits",
  name: "@Visits",
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
        doDate: number;
        createDate: number;
        description: string;
        shareList: string[];
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
              id: action.payload.id,
              title: action.payload.title,
              income: action.payload.income,
              doDate: action.payload.doDate,
              createDate: action.payload.createDate,
              description: action.payload.description,
              shareList: action.payload.shareList,
              advancePayment: action.payload.advancePayment,
              paymentCompleteValue: action.payload.paymentCompleteValue,
              category: action.payload.category,
              tag: action.payload.tag,
              isComplete: false,
              dType: "Visit",
            },
          ]
        : [
            {
              id: action.payload.id,
              title: action.payload.title,
              income: action.payload.income,
              doDate: action.payload.doDate,
              createDate: action.payload.createDate,
              description: action.payload.description,
              shareList: action.payload.shareList,
              advancePayment: action.payload.advancePayment,
              paymentCompleteValue: action.payload.paymentCompleteValue,
              category: action.payload.category,
              tag: action.payload.tag,
              isComplete: false,
              dType: "Visit",
            },
          ];
    },
    delVisitList: (state: InitialState, action: PayloadAction<string>) => {
      state.ListVisit = state.ListVisit.filter(
        (visit) => visit.id != action.payload
      );
    },
    completeVisitList: (state: InitialState, action: PayloadAction<string>) => {
      state.ListVisit = state.ListVisit.map((visit) =>
        visit.id == action.payload
          ? {
              ...visit,
              isComplete: !visit.isComplete,
            }
          : visit
      );
    },
    updateVisitList: (
      state: InitialState,
      action: PayloadAction<{
        id: string;
        title: string;
        income: boolean;
        doDate: number;
        createDate: number;
        description: string;
        shareList: string[];
        advancePayment?: string;
        paymentCompleteValue: string;
        category: string;
        tag: string;
      }>
    ) => {
      state.ListVisit = state.ListVisit.map((visit) =>
        visit.id == action.payload.id
          ? {
              ...visit,
              title: action.payload.title,
              doDate: action.payload.doDate,
              createDate: action.payload.createDate,
              income: action.payload.income,
              description: action.payload.description,
              shareList: action.payload.shareList,
              advancePayment: action.payload.advancePayment,
              paymentCompleteValue: action.payload.paymentCompleteValue,
              category: action.payload.category,
              tag: action.payload.tag,
              isComplete: visit.isComplete,
              dType: "Visit",
            }
          : visit
      );
    },
    // updateVisitListShare: (
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
    //     visitId?: string;
    //     category: string;
    //     tag: string;
    //   }>
    // ) => {
    //   state.ListVisit = state.ListVisit.map((visit) =>
    //     visit.id == action.payload.visitId
    //       ? {
    //           ...visit,
    //           shareList: visit.shareList.map((share) =>
    //             share.id == action.payload.id
    //               ? {
    //                   ...share,
    //                   peopleId: action.payload.peopleId,
    //                   outcomeAmount: action.payload.outcomeAmount,
    //                   shareId: action.payload.shareId,
    //                   incomeAmount: action.payload.incomeAmount,
    //                   visitId: action.payload.visitId,
    //                   category: action.payload.category,
    //                   tag: action.payload.tag,
    //                   doDate: action.payload.doDate,
    //                   createDate: action.payload.createDate,
    //                   income: action.payload.income,
    //                 }
    //               : share
    //           ),
    //         }
    //       : visit
    //   );
    // },
    delVisitListShare: (
      state: InitialState,
      action: PayloadAction<{
        id: string;
        visitId?: string;
      }>
    ) => {
      state.ListVisit = state.ListVisit.map((visit) =>
        visit.id == action.payload.visitId
          ? {
              ...visit,
              shareList: visit.shareList.filter(
                (share) => share == action.payload.id
              ),
            }
          : visit
      );
    },
    selectVisitList: (state: InitialState, action: PayloadAction<string>) => {
      state.selectedVisit = state.ListVisit.filter(
        (visit) => visit.id == action.payload
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
  delVisitListShare,
  updateVisitList,
  // updateVisitListShare,
  selectVisitList,
} = visitSlice.actions;
