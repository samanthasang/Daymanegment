import { currentUnixTimestamp } from "@/lib/Hooks/UseDayJS";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export type TTimer = {
  id: string;
  title: string;
  isComplete: boolean;
  startDate: number;
  endDate: number;
  createDate: number;
  lastUpdate: number;
  category: string;
  tag: string;
  description: string;
  dType: string;
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
              createDate: currentUnixTimestamp,
              lastUpdate: currentUnixTimestamp,
              description: action.payload.description,
              category: action.payload.category,
              tag: action.payload.tag,
              isComplete: false,
              dType: "Timer",
            },
          ]
        : [
            {
              id: nanoid(),
              startDate: action.payload.startDate,
              endDate: action.payload.startDate,
              createDate: currentUnixTimestamp,
              lastUpdate: currentUnixTimestamp,
              title: action.payload.title,
              description: action.payload.description,
              category: action.payload.category,
              tag: action.payload.tag,
              isComplete: false,
              dType: "Timer",
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
              lastUpdate: currentUnixTimestamp,
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
              lastUpdate: currentUnixTimestamp,
              endDate: action.payload.endDate,
              description: action.payload.description,
              category: action.payload.category,
              tag: action.payload.tag,
              dType: "Timer",
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
