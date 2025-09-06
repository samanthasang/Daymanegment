import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import dayjs from 'dayjs';

const currentUnixTimestamp = dayjs().unix(); 
export type Tinstallmentst = {
  id: string
  title: string
  score: number
  description: string,
  priority: string,
  lastUpdate: number
  completeUpdate: number
}

export interface InitialState {
  ListInstallmentst: Tinstallmentst[];
  selectedInstallmentst: Tinstallmentst | {}
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
      score: number,
      lastUpdate: number,
      completeUpdate: number,
    }>) => {
      state.ListInstallmentst = state.ListInstallmentst ? [
        ...state.ListInstallmentst,
        {
          id: nanoid(),
          title: action.payload.title,
          priority: action.payload.priority,
          description: action.payload.description,
          score: 0,
          lastUpdate: currentUnixTimestamp,
          completeUpdate: action.payload.completeUpdate,
        },
      ] : [
          {
            id: nanoid(),
            priority: action.payload.priority,
            description: action.payload.description,
            title: action.payload.title,
            score: 0 || action.payload.score,
            lastUpdate: currentUnixTimestamp,
            completeUpdate: action.payload.completeUpdate,
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
            score:
              dayjs(dayjs.unix(Number(currentUnixTimestamp))).format("DD")
              != dayjs(dayjs.unix(Number(installmentst.lastUpdate))).format("DD") || installmentst.score == 0 ?
              installmentst.score + 1 : installmentst.score,
            lastUpdate: currentUnixTimestamp,
            completeUpdate: currentUnixTimestamp
          }
          : installmentst
      );
    },
    updateInstallmentstList: (state: InitialState, action: PayloadAction<{
      id: any
      title: string
      description: string
      score: number
      priority: string
      lastUpdate: number
      completeUpdate: number 
    }>) => {
      state.ListInstallmentst = state.ListInstallmentst.map((installmentst) =>
        installmentst.id == action.payload.id
          ? {
            ...installmentst,
            title: action.payload.title,
            description: action.payload.description,
            score: action.payload.score || installmentst.score,
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
