import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import dayjs from 'dayjs';

const currentUnixTimestamp = dayjs().unix(); 
export type Thabbit = {
  id: string
  title: string
  score: number
  description: string,
  priority: string,
  lastUpdate: number
  completeUpdate: number
}

export interface InitialState {
  ListHabbit: Thabbit[];
  selectedhabbit: Thabbit | {}
}

export const habbitListSlice = createSlice({
  reducerPath: "habbitList",
  name: "@habbitList",
  initialState: {
    ListHabbit: [],
    selectedhabbit: {}
  },
  reducers: {
    setHabbitList: (state: InitialState, action: PayloadAction<{
      id: string,
      title:string,
      description: string,
      priority: string,
      score: number,
      lastUpdate: number,
      completeUpdate: number,
    }>) => {
      state.ListHabbit = state.ListHabbit ? [
        ...state.ListHabbit,
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
    delHabbitList: (state: InitialState, action: PayloadAction<string>) => {
      state.ListHabbit = state.ListHabbit.filter(
        (Habbit) => Habbit.id != action.payload
      );
    },
    completeHabbitList: (state: InitialState, action: PayloadAction<string>) => {
      state.ListHabbit = state.ListHabbit.map((Habbit) =>
        Habbit.id == action.payload
          ? {
            ...Habbit,
            score:
              dayjs(dayjs.unix(Number(currentUnixTimestamp))).format("DD")
              != dayjs(dayjs.unix(Number(Habbit.lastUpdate))).format("DD") || Habbit.score == 0 ?
              Habbit.score + 1 : Habbit.score,
            lastUpdate: currentUnixTimestamp
          }
          : Habbit
      );
    },
    updateHabbitList: (state: InitialState, action: PayloadAction<{
      id: any
      title: string
      description: string
      score: number
      priority: string
      lastUpdate: number
      completeUpdate: number 
    }>) => {
      state.ListHabbit = state.ListHabbit.map((Habbit) =>
        Habbit.id == action.payload.id
          ? {
            ...Habbit,
            title: action.payload.title,
            description: action.payload.description,
            score: action.payload.score || Habbit.score,
            priority: action.payload.priority,
            lastUpdate: action.payload.lastUpdate || Habbit.lastUpdate,
            completeUpdate: action.payload.completeUpdate || Habbit.completeUpdate,
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
  selectHabbitList
} =
habbitListSlice .actions;
