import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const currentUnixTimestamp = dayjs().unix();
export type TMyHabbit = {
  id: string;
  title: string;
  score: number;
  description: string;
  priority: string;
  lastUpdate: string;
  completeUpdate: string;
  category: string;
  tag: string;
};

export interface InitialState {
  ListMyHabbit: TMyHabbit[];
  selectedMyHabbit: TMyHabbit | {};
}

export const MyHabbitListSlice = createSlice({
  reducerPath: "MyHabbitList",
  name: "@MyHabbitList",
  initialState: {
    ListMyHabbit: [],
    selectedMyHabbit: {},
  },
  reducers: {
    setMyHabbitList: (
      state: InitialState,
      action: PayloadAction<{
        id: string;
        title: string;
        description: string;
        priority: string;
        score?: number;
        lastUpdate?: string;
        completeUpdate?: string;
        category: string;
        tag: string;
      }>
    ) => {
      state.ListMyHabbit = state.ListMyHabbit
        ? [
            ...state.ListMyHabbit,
            {
              id: action.payload.id,
              title: action.payload.title,
              priority: action.payload.priority,
              description: action.payload.description,
              score: action.payload.score || 10,
              lastUpdate:
                action.payload.lastUpdate ||
                Math.floor(new Date(currentUnixTimestamp).getTime()).toString(),
              completeUpdate:
                action.payload.completeUpdate ||
                Math.floor(new Date(currentUnixTimestamp).getTime()).toString(),
              category: action.payload.category,
              tag: action.payload.tag,
            },
          ]
        : [
            {
              id: action.payload.id,
              priority: action.payload.priority,
              description: action.payload.description,
              title: action.payload.title,
              score: action.payload.score || 10,
              lastUpdate:
                action.payload.lastUpdate ||
                Math.floor(new Date(currentUnixTimestamp).getTime()).toString(),
              completeUpdate:
                action.payload.completeUpdate ||
                Math.floor(new Date(currentUnixTimestamp).getTime()).toString(),
              category: action.payload.category,
              tag: action.payload.tag,
            },
          ];
    },
    delMyHabbitList: (state: InitialState, action: PayloadAction<string>) => {
      state.ListMyHabbit = state.ListMyHabbit.filter(
        (MyHabbit) => MyHabbit.id != action.payload
      );
    },
    completeMyHabbitList: (
      state: InitialState,
      action: PayloadAction<string>
    ) => {
      state.ListMyHabbit = state.ListMyHabbit.map((MyHabbit) =>
        MyHabbit.id == action.payload
          ? {
              ...MyHabbit,
              score:
                dayjs(dayjs.unix(Number(currentUnixTimestamp))).format("DD") !=
                  dayjs(dayjs.unix(Number(MyHabbit.lastUpdate))).format("DD") ||
                MyHabbit.score == 0
                  ? MyHabbit.score + 1
                  : MyHabbit.score,
              lastUpdate: Math.floor(
                new Date(currentUnixTimestamp).getTime()
              ).toString(),
              completeUpdate: Math.floor(
                new Date(currentUnixTimestamp).getTime()
              ).toString(),
            }
          : MyHabbit
      );
    },
    updateMyHabbitList: (
      state: InitialState,
      action: PayloadAction<{
        id: any;
        title: string;
        description: string;
        score: number;
        priority: string;
        lastUpdate: string;
        completeUpdate: string;
        category: string;
        tag: string;
      }>
    ) => {
      state.ListMyHabbit = state.ListMyHabbit.map((MyHabbit) =>
        MyHabbit.id == action.payload.id
          ? {
              ...MyHabbit,
              title: action.payload.title,
              description: action.payload.description,
              score: action.payload.score || MyHabbit.score,
              priority: action.payload.priority,
              lastUpdate: action.payload.lastUpdate || MyHabbit.lastUpdate,
              completeUpdate:
                action.payload.completeUpdate || MyHabbit.completeUpdate,
              category: action.payload.category,
              tag: action.payload.tag,
            }
          : MyHabbit
      );
    },
    selectMyHabbitList: (
      state: InitialState,
      action: PayloadAction<string>
    ) => {
      state.selectedMyHabbit = state.ListMyHabbit.filter(
        (MyHabbit) => MyHabbit.id == action.payload
      )[0];
    },
  },
});

export const MyHabbitReducer = MyHabbitListSlice.reducer;
export const MyHabbitReducerPath = MyHabbitListSlice.reducerPath;

export const {
  completeMyHabbitList,
  setMyHabbitList,
  delMyHabbitList,
  updateMyHabbitList,
  selectMyHabbitList,
} = MyHabbitListSlice.actions;
