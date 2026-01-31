import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export type TInstallmentst = {
    date: string
    payment: string
    isComplete: boolean
}
export type TInstallmentsts = {
  id: string;
  title: string;
  startDate: string;
  description: string;
  priority: string;
  lastUpdate: string;
  completeUpdate: string;
  paymentNumber: string;
  numberOfPayment?: string;
  paymentCompleteValue: string;
  category: string;
  tag: string;
  installmentstList: TInstallmentst[];
};

export interface InitialState {
  ListInstallmentst: TInstallmentsts[];
  selectedInstallmentst: TInstallmentsts | {};
}

export const installmentstListSlice = createSlice({
  reducerPath: "installmentstList",
  name: "@installmentstList",
  initialState: {
    ListInstallmentst: [],
    selectedInstallmentst: {},
  },
  reducers: {
    setInstallmentstList: (
      state: InitialState,
      action: PayloadAction<{
        id: string;
        title: string;
        startDate: string;
        description: string;
        priority: string;
        lastUpdate: string;
        completeUpdate: string;
        paymentNumber: string;
        numberOfPayment?: string;
        paymentCompleteValue: string;
        category: string;
        tag: string;
        installmentstList: {
          date: string;
          payment: string;
          isComplete: boolean;
        }[];
      }>
    ) => {
      state.ListInstallmentst = state.ListInstallmentst
        ? [
            ...state.ListInstallmentst,
            {
              id: nanoid(),
              title: action.payload.title,
              priority: action.payload.priority,
              startDate: action.payload.startDate,
              description: action.payload.description,
              lastUpdate: action.payload.lastUpdate,
              completeUpdate: action.payload.completeUpdate,
              paymentNumber: action.payload.paymentNumber,
              numberOfPayment: action.payload.numberOfPayment,
              paymentCompleteValue: action.payload.paymentCompleteValue,
              category: action.payload.category,
              tag: action.payload.tag,
              installmentstList: action.payload.installmentstList,
            },
          ]
        : [
            {
              id: nanoid(),
              title: action.payload.title,
              priority: action.payload.priority,
              startDate: action.payload.startDate,
              description: action.payload.description,
              lastUpdate: action.payload.lastUpdate,
              completeUpdate: action.payload.completeUpdate,
              paymentNumber: action.payload.paymentNumber,
              numberOfPayment: action.payload.numberOfPayment,
              paymentCompleteValue: action.payload.paymentCompleteValue,
              category: action.payload.category,
              tag: action.payload.tag,
              installmentstList: action.payload.installmentstList,
            },
          ];
    },
    delInstallmentstList: (
      state: InitialState,
      action: PayloadAction<string>
    ) => {
      state.ListInstallmentst = state.ListInstallmentst.filter(
        (installmentst) => installmentst.id != action.payload
      );
    },
    completeInstallmentstList: (
      state: InitialState,
      action: PayloadAction<{
        id: string;
        lastUpdate: string;
      }>
    ) => {
      state.ListInstallmentst = state.ListInstallmentst.map((installmentst) =>
        installmentst.id == action.payload.id
          ? {
              ...installmentst,
              lastUpdate: action.payload.lastUpdate,
              installmentstList:
                installmentst.installmentstList &&
                installmentst.installmentstList.map((ins) =>
                  ins.date == action.payload.lastUpdate
                    ? {
                        ...ins,
                        isComplete: !ins.isComplete,
                      }
                    : ins
                ),
            }
          : installmentst
      );
    },
    updateInstallmentstList: (
      state: InitialState,
      action: PayloadAction<{
        id: any;
        title: string;
        startDate: string;
        description: string;
        priority: string;
        lastUpdate: string;
        completeUpdate: string;
        paymentNumber: string;
        numberOfPayment?: string;
        paymentCompleteValue: string;
        category: string;
        tag: string;
        installmentstList: TInstallmentst[];
      }>
    ) => {
      state.ListInstallmentst = state.ListInstallmentst.map((installmentst) =>
        installmentst.id == action.payload.id
          ? {
              ...installmentst,
              title: action.payload.title,
              priority: action.payload.priority,
              startDate: action.payload.startDate,
              description: action.payload.description,
              lastUpdate: action.payload.lastUpdate,
              completeUpdate: action.payload.completeUpdate,
              paymentNumber: action.payload.paymentNumber,
              numberOfPayment: action.payload.numberOfPayment,
              paymentCompleteValue: action.payload.paymentCompleteValue,
              category: action.payload.category,
              tag: action.payload.tag,
              installmentstList: action.payload.installmentstList,
            }
          : installmentst
      );
    },
    selectInstallmentstList: (
      state: InitialState,
      action: PayloadAction<string>
    ) => {
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
  selectInstallmentstList,
} = installmentstListSlice.actions;
