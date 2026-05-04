import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export type TTimer = {
  id: string;
  title: string;
  isComplete: boolean;
  startDate: number;
  endDate: number;
  createDate: number;
  category: string;
  tag: string;
  description: string;
};

export interface InitialState {
  ListTimer: TTimer[];
  selectedTimer: TTimer | {};
}

export const timerListSlice = createSlice({
  reducerPath: "Timers",
  name: "@Timers",
  initialState: {
    ListTimer: [],
    selectedTimer: {},
  },
  reducers: {
    setTimerList: (
      state: InitialState,
      action: PayloadAction<{
        id: string;
        title: string;
        startDate: number;
        endDate: number;
        createDate: number;
        isComplete: boolean;
        category: string;
        tag: string;
        description: string;
      }>
    ) => {
      state.ListTimer = state.ListTimer
        ? [
            ...state.ListTimer,
            {
              id: nanoid(),
              title: action.payload.title,
              startDate: action.payload.startDate,
              endDate: action.payload.endDate,
              createDate: action.payload.createDate,
              description: action.payload.description,
              category: action.payload.category,
              tag: action.payload.tag,
              isComplete: false,
            },
          ]
        : [
            {
              id: nanoid(),
              startDate: action.payload.startDate,
              endDate: action.payload.startDate,
              createDate: action.payload.createDate,
              title: action.payload.title,
              description: action.payload.description,
              category: action.payload.category,
              tag: action.payload.tag,
              isComplete: false,
            },
          ];
    },
    delTimerList: (state: InitialState, action: PayloadAction<string>) => {
      state.ListTimer = state.ListTimer.filter(
        (timer) => timer.id != action.payload
      );
    },
    completeTimerList: (
      state: InitialState,
      action: PayloadAction<{
        id: string;
        endDate: number;
      }>
    ) => {
      state.ListTimer = state.ListTimer.map((timer) =>
        timer.id == action.payload.id
          ? {
              ...timer,
              isComplete: !timer.isComplete,
              endDate: action.payload.endDate,
            }
          : timer
      );
    },
    updateTimerList: (
      state: InitialState,
      action: PayloadAction<{
        id: any;
        title: string;
        startDate: number;
        endDate: number;
        createDate: number;
        isComplete: boolean;
        description: string;
        category: string;
        tag: string;
      }>
    ) => {
      state.ListTimer = state.ListTimer.map((timer) =>
        timer.id == action.payload.id
          ? {
              ...timer,
              title: action.payload.title,
              isComplete: action.payload.isComplete,
              startDate: action.payload.startDate,
              createDate: action.payload.createDate,
              endDate: action.payload.endDate,
              description: action.payload.description,
              category: action.payload.category,
              tag: action.payload.tag,
            }
          : timer
      );
    },
    selectTimerList: (state: InitialState, action: PayloadAction<string>) => {
      state.selectedTimer = state.ListTimer.filter(
        (timer) => timer.id == action.payload
      )[0];
    },
  },
});

export const timerReducer = timerListSlice.reducer;
export const timerReducerPath = timerListSlice.reducerPath;

export const {
  completeTimerList,
  setTimerList,
  delTimerList,
  updateTimerList,
  selectTimerList,
} = timerListSlice.actions;
