import { currentUnixTimestamp, DayUnixAdd } from "@/lib/Hooks/UseDayJS";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { ManipulateType } from "dayjs";

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
  isFinish: boolean;
  paymentNumber: string;
  numberOfPayment: string;
  paymentCompleteValue: string;
  category: string;
  tag: string;
  dType: string;
  installmentstList: TInstallmentst[];
};

export interface InitialState {
  ListInstallmentst: TInstallmentsts[];
  selectedInstallmentst: TInstallmentsts | {};
}

export const installmentstListSlice = createSlice({
  reducerPath: "Installments",
  name: "@Installments",
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
        doDate: number;
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
              lastUpdate: currentUnixTimestamp,
              doDate: action.payload.doDate,
              createDate: currentUnixTimestamp,
              completeUpdate: action.payload.completeUpdate,
              paymentNumber: action.payload.paymentNumber,
              numberOfPayment: action.payload.numberOfPayment,
              paymentCompleteValue: action.payload.paymentCompleteValue,
              category: action.payload.category,
              tag: action.payload.tag,
              installmentstList: action.payload.installmentstList,
              isComplete: false,
              isFinish: false,
              dType: "Installmentst",
            },
          ]
        : [
            {
              id: nanoid(),
              title: action.payload.title,
              priority: action.payload.priority,
              startDate: action.payload.startDate,
              description: action.payload.description,
              lastUpdate: currentUnixTimestamp,
              doDate: action.payload.doDate,
              createDate: currentUnixTimestamp,
              completeUpdate: action.payload.completeUpdate,
              paymentNumber: action.payload.paymentNumber,
              numberOfPayment: action.payload.numberOfPayment,
              paymentCompleteValue: action.payload.paymentCompleteValue,
              category: action.payload.category,
              tag: action.payload.tag,
              installmentstList: action.payload.installmentstList,
              isComplete: false,
              isFinish: false,
              dType: "Installmentst",
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
              isComplete: true,
              isFinish:
                installment.doDate == installment.completeUpdate ? true : false,
              doDate:
                installment.doDate == installment.completeUpdate
                  ? installment.doDate
                  : DayUnixAdd(
                      +installment.doDate,
                      installment.paymentNumber as ManipulateType,
                      1
                    ),
              installmentstList:
                installment.installmentstList &&
                installment.installmentstList.map((ins) =>
                  ins.doDate == installment.doDate
                    ? {
                        ...ins,
                        isComplete: true,
                      }
                    : ins
                ),
            }
          : installment
      );
    },
    unCompleteInstallmentst: (
      state: InitialState,
      action: PayloadAction<string>
    ) => {
      state.ListInstallmentst = state.ListInstallmentst.map((installment) =>
        installment.id == action.payload
          ? {
              ...installment,
              isComplete: false,
              doDate: DayUnixAdd(
                +installment.doDate,
                installment.paymentNumber as ManipulateType,
                -1
              ),
              installmentstList:
                installment.installmentstList &&
                installment.installmentstList.map((ins) =>
                  ins.doDate ==
                  DayUnixAdd(
                    +installment.doDate,
                    installment.paymentNumber as ManipulateType,
                    -1
                  )
                    ? {
                        ...ins,
                        isComplete: false,
                      }
                    : ins
                ),
            }
          : installment
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
        doDate: number;
        completeUpdate: number;
        paymentNumber: string;
        numberOfPayment: string;
        paymentCompleteValue: string;
        category: string;
        tag: string;
        isComplete?: boolean;
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
              lastUpdate: currentUnixTimestamp,
              doDate: action.payload.doDate,
              completeUpdate: action.payload.completeUpdate,
              paymentNumber: action.payload.paymentNumber,
              numberOfPayment: action.payload.numberOfPayment,
              paymentCompleteValue: action.payload.paymentCompleteValue,
              category: action.payload.category,
              tag: action.payload.tag,
              isComplete: action.payload.isComplete ?? installmentst.isComplete,
              installmentstList: action.payload.installmentstList,
              dType: "Installmentst",
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
  completeInstallmentst,
  unCompleteInstallmentst,
  setInstallmentstList,
  delInstallmentstList,
  updateInstallmentstList,
  selectInstallmentstList,
} = installmentstListSlice.actions;
