import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export type TInstallmentst = {
  doDate: number;
  payment: string;
  isComplete: boolean;
};
export type TInstallmentsts = {
  id: string;
  title: string;
  description: string;
  priority: string;
  startDate: number;
  lastUpdate: number;
  doDate: number;
  createDate: number;
  completeUpdate: number;
  isComplete: boolean;
  paymentNumber: string;
  numberOfPayment: string;
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
        description: string;
        priority: string;
        startDate: number;
        lastUpdate: number;
        doDate: number;
        createDate: number;
        completeUpdate: number;
        paymentNumber: string;
        numberOfPayment: string;
        paymentCompleteValue: string;
        category: string;
        tag: string;
        installmentstList: {
          doDate: number;
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
              doDate: action.payload.doDate,
              createDate: action.payload.createDate,
              completeUpdate: action.payload.completeUpdate,
              paymentNumber: action.payload.paymentNumber,
              numberOfPayment: action.payload.numberOfPayment,
              paymentCompleteValue: action.payload.paymentCompleteValue,
              category: action.payload.category,
              tag: action.payload.tag,
              installmentstList: action.payload.installmentstList,
              isComplete: false,
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
              doDate: action.payload.doDate,
              createDate: action.payload.createDate,
              completeUpdate: action.payload.completeUpdate,
              paymentNumber: action.payload.paymentNumber,
              numberOfPayment: action.payload.numberOfPayment,
              paymentCompleteValue: action.payload.paymentCompleteValue,
              category: action.payload.category,
              tag: action.payload.tag,
              installmentstList: action.payload.installmentstList,
              isComplete: false,
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
    completeInstallmentst: (
      state: InitialState,
      action: PayloadAction<string>
    ) => {
      state.ListInstallmentst = state.ListInstallmentst.map((installment) =>
        installment.id == action.payload
          ? {
              ...installment,
              isComplete: !installment.isComplete,
            }
          : installment
      );
    },
    completeInstallmentstList: (
      state: InitialState,
      action: PayloadAction<{
        id: string;
        lastUpdate: number;
        doDate: number;
      }>
    ) => {
      state.ListInstallmentst = state.ListInstallmentst.map((installmentst) =>
        installmentst.id == action.payload.id
          ? {
              ...installmentst,
              lastUpdate: action.payload.lastUpdate,
              doDate: action.payload.doDate,
              installmentstList:
                installmentst.installmentstList &&
                installmentst.installmentstList.map((ins) =>
                  ins.doDate == action.payload.lastUpdate
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
        description: string;
        priority: string;
        startDate: number;
        lastUpdate: number;
        doDate: number;
        createDate: number;
        completeUpdate: number;
        paymentNumber: string;
        numberOfPayment: string;
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
              doDate: action.payload.doDate,
              createDate: action.payload.createDate,
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
  completeInstallmentst,
  setInstallmentstList,
  delInstallmentstList,
  updateInstallmentstList,
  selectInstallmentstList,
} = installmentstListSlice.actions;
