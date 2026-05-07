import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const currentUnixTimestamp = dayjs().unix();
export type Thabbit = {
  id: string;
  title: string;
  score: number;
  highest: number;
  description: string;
  priority: string;
  createDate: number;
  lastUpdate: number;
  isComplete: boolean;
  category: string;
  tag: string;
};

export interface InitialState {
  ListHabbit: Thabbit[];
  selectedhabbit: Thabbit | {};
}

export const habbitListSlice = createSlice({
  reducerPath: "Habbits",
  name: "@Habbits",
  initialState: {
    ListHabbit: [],
    selectedhabbit: {},
  },
  reducers: {
    setHabbitList: (
      state: InitialState,
      action: PayloadAction<{
        id: string;
        title: string;
        description: string;
        priority: string;
        score: number;
        createDate: number;
        lastUpdate: number;
        isComplete: boolean;
        category: string;
        tag: string;
      }>
    ) => {
      state.ListHabbit = state.ListHabbit
        ? [
            ...state.ListHabbit.filter(
              (Habbit) => Habbit.id != action.payload.id
            ),
            {
              id: action.payload.id,
              title: action.payload.title,
              priority: action.payload.priority,
              description: action.payload.description,
              category: action.payload.category,
              tag: action.payload.tag,
              score: action.payload.score || 1,
              highest: action.payload.score || 1,
              createDate: action.payload.createDate,
              lastUpdate: action.payload.lastUpdate,
              isComplete: action.payload.isComplete,
            },
          ]
        : [
            {
              id: action.payload.id,
              priority: action.payload.priority,
              description: action.payload.description,
              title: action.payload.title,
              category: action.payload.category,
              tag: action.payload.tag,
              score: action.payload.score || 1,
              highest: action.payload.score || 1,
              createDate: action.payload.createDate,
              lastUpdate: action.payload.lastUpdate,
              isComplete: action.payload.isComplete,
            },
          ];
    },
    delHabbitList: (state: InitialState, action: PayloadAction<string>) => {
      state.ListHabbit = state.ListHabbit.filter(
        (Habbit) => Habbit.id != action.payload
      );
    },
    completeHabbitList: (
      state: InitialState,
      action: PayloadAction<string>
    ) => {
      state.ListHabbit = state.ListHabbit.map((Habbit) =>
        Habbit.id == action.payload
          ? {
              ...Habbit,
              score: !Habbit.isComplete ? Habbit.score + 1 : Habbit.score - 1,
              highest:
                Habbit.highest > Habbit.score ? Habbit.highest : Habbit.score,
              lastUpdate: currentUnixTimestamp,
              isComplete: !Habbit.isComplete,
            }
          : Habbit
      );
    },
    updateHabbitList: (
      state: InitialState,
      action: PayloadAction<{
        id: any;
        title: string;
        description: string;
        score: number;
        priority: string;
        createDate: number;
        lastUpdate: number;
        category: string;
        tag: string;
        isComplete?: boolean;
      }>
    ) => {
      state.ListHabbit = state.ListHabbit.map((Habbit) =>
        Habbit.id == action.payload.id
          ? {
              ...Habbit,
              title: action.payload.title,
              description: action.payload.description,
              score: action.payload.score || Habbit.score,
              highest:
                Habbit.highest > Habbit.score ? Habbit.highest : Habbit.score,
              priority: action.payload.priority,
              category: action.payload.category,
              tag: action.payload.tag,
              createDate: action.payload.createDate,
              lastUpdate: action.payload.lastUpdate,
              isComplete: !!action.payload.isComplete ? action.payload.isComplete : Habbit.isComplete,
            }
          : Habbit
      );
    },
    selectHabbitList: (state: InitialState, action: PayloadAction<string>) => {
      state.selectedhabbit = state.ListHabbit.filter(
        (Habbit) => Habbit.id == action.payload
      )[0];
    },
  },
});

export const habbitReducer = habbitListSlice.reducer;
export const habbitReducerPath = habbitListSlice.reducerPath;

export const {
  completeHabbitList,
  setHabbitList,
  delHabbitList,
  updateHabbitList,
  selectHabbitList,
} = habbitListSlice.actions;
