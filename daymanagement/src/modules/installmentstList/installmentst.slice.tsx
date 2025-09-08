import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import dayjs from 'dayjs';

const currentUnixTimestamp = dayjs().unix(); 
export type TInstallmentst = {
  id: string
  title: string
  startDate: number
  description: string,
  priority: string,
  lastUpdate: number
  completeUpdate: number
  paymentNumber:string
  paymentCompleteValue:string
}

export interface InitialState {
  ListInstallmentst: TInstallmentst[];
  selectedInstallmentst: TInstallmentst | {}
}

export const installmentstListSlice = createSlice({
  reducerPath: "installmentstList",
  name: "@installmentstList",
  initialState: {
    ListInstallmentst: [],
    selectedInstallmentst: {}
  },
  reducers: {
    setInstallmentstList: (state: InitialState, action: PayloadAction<{
      id: string,
      title:string,
      description: string,
      priority: string,
      startDate: number,
      lastUpdate: number,
      completeUpdate: number,
      paymentNumber:string,
      paymentCompleteValue:string
    }>) => {
      state.ListInstallmentst = state.ListInstallmentst ? [
        ...state.ListInstallmentst,
        {
          id: nanoid(),
          title: action.payload.title,
          priority: action.payload.priority,
          description: action.payload.description,
          startDate: action.payload.startDate,
          lastUpdate: currentUnixTimestamp,
          completeUpdate: action.payload.completeUpdate,
          paymentNumber: action.payload.paymentNumber,
          paymentCompleteValue: action.payload.paymentCompleteValue
        },
      ] : [
          {
            id: nanoid(),
            priority: action.payload.priority,
            description: action.payload.description,
            title: action.payload.title,
            startDate:action.payload.startDate,
            lastUpdate: currentUnixTimestamp,
            completeUpdate: action.payload.completeUpdate,
            paymentNumber: action.payload.paymentNumber,
            paymentCompleteValue: action.payload.paymentCompleteValue
          },
      ];
    },
    delInstallmentstList: (state: InitialState, action: PayloadAction<string>) => {
      state.ListInstallmentst = state.ListInstallmentst.filter(
        (installmentst) => installmentst.id != action.payload
      );
    },
    completeInstallmentstList: (state: InitialState, action: PayloadAction<string>) => {
      state.ListInstallmentst = state.ListInstallmentst.map((installmentst) =>
        installmentst.id == action.payload
          ? {
            ...installmentst,
            startDate:
              dayjs(dayjs.unix(Number(currentUnixTimestamp))).format("DD")
              != dayjs(dayjs.unix(Number(installmentst.lastUpdate))).format("DD") || installmentst.startDate == 0 ?
              installmentst.startDate + 1 : installmentst.startDate,
            lastUpdate: currentUnixTimestamp,
            completeUpdate: currentUnixTimestamp
          }
          : installmentst
      );
    },
    updateInstallmentstList: (state: InitialState, action: PayloadAction<{
      id: any
      title:string,
      description: string,
      priority: string,
      startDate: number,
      lastUpdate: number,
      completeUpdate: number,
      paymentNumber:string,
      paymentCompleteValue:string
    }>) => {
      state.ListInstallmentst = state.ListInstallmentst.map((installmentst) =>
        installmentst.id == action.payload.id
          ? {
            ...installmentst,
            title: action.payload.title,
            description: action.payload.description,
            startDate: action.payload.startDate || installmentst.startDate,
            priority: action.payload.priority,
            lastUpdate: action.payload.lastUpdate || installmentst.lastUpdate,
            completeUpdate: action.payload.completeUpdate || installmentst.completeUpdate,
          }
          : installmentst
      );
    },
    selectInstallmentstList: (state: InitialState, action: PayloadAction<string>) => {
      state.selectedInstallmentst = state.ListInstallmentst.filter(
        (installmentst) => installmentst.id == action.payload
      )[0];
    },
  },
});

export const installmentstReducer = installmentstListSlice.reducer;
export const installmentstReducerPath = installmentstListSlice.reducerPath;

export const {
  completeInstallmentstList,
  setInstallmentstList,
  delInstallmentstList,
  updateInstallmentstList,
  selectInstallmentstList
} =
installmentstListSlice .actions;
