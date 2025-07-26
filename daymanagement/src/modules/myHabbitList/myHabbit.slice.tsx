import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";


const currentUnixTimestamp = dayjs().unix(); 
export type TMyHaBBIT = {
  id: string
  title: string
  score: number
  description: string,
  priority: string,
  lastUpdate: number
}

export interface InitialState {
  ListMyHaBBIT: TMyHaBBIT[];
  selectedMyHaBBIT: TMyHaBBIT | {}
}

export const MyHaBBITListSlice = createSlice({
  reducerPath: "MyHaBBITList",
  name: "@MyHaBBITList",
  initialState: {
    ListMyHaBBIT: [],
    selectedMyHaBBIT: {}
  },
  reducers: {
    setMyHaBBITList: (state: InitialState, action: PayloadAction<{
      id: string,
      title:string,
      description: string,
      priority: string,
      score?: number,
      lastUpdate?: number
    }>) => {
      state.ListMyHaBBIT = state.ListMyHaBBIT ? [
        ...state.ListMyHaBBIT,
        {
          id: nanoid(),
          title: action.payload.title,
          priority: action.payload.priority,
          description: action.payload.description,
          score: action.payload.score || 0,
          lastUpdate: action.payload.lastUpdate || 0
        },
      ] : [
          {
            id: nanoid(),
            priority: action.payload.priority,
            description: action.payload.description,
            title: action.payload.title,
            score: action.payload.score || 0,
            lastUpdate: action.payload.lastUpdate || 0
          },
      ];
    },
    delMyHaBBITList: (state: InitialState, action: PayloadAction<string>) => {
      state.ListMyHaBBIT = state.ListMyHaBBIT.filter(
        (MyHaBBIT) => MyHaBBIT.id != action.payload
      );
    },
    completeMyHaBBITList: (state: InitialState, action: PayloadAction<string>) => {
      state.ListMyHaBBIT = state.ListMyHaBBIT.map((MyHaBBIT) =>
        MyHaBBIT.id == action.payload
          ? {
            ...MyHaBBIT,
            score:
              dayjs(dayjs.unix(Number(currentUnixTimestamp))).format("DD")
              != dayjs(dayjs.unix(Number(MyHaBBIT.lastUpdate))).format("DD") || MyHaBBIT.score == 0?
              MyHaBBIT.score + 1 : MyHaBBIT.score,
            lastUpdate: currentUnixTimestamp
          }
          : MyHaBBIT
      );
    },
    updateMyHaBBITList: (state: InitialState, action: PayloadAction<{
      id: any
      title: string
      description: string
      priority: string
    }>) => {
      state.ListMyHaBBIT = state.ListMyHaBBIT.map((MyHaBBIT) =>
        MyHaBBIT.id == action.payload.id
          ? {
            ...MyHaBBIT,
            title: action.payload.title,
            score: MyHaBBIT.score,
            priority: action.payload.priority,
            description: action.payload.description,
          }
          : MyHaBBIT
      );
    },
    selectMyHaBBITList: (state: InitialState, action: PayloadAction<string>) => {
      state.selectedMyHaBBIT = state.ListMyHaBBIT.filter(
        (MyHaBBIT) => MyHaBBIT.id == action.payload
      )[0];
    },
  },
});

export const MyHaBBITReducer = MyHaBBITListSlice.reducer;
export const MyHaBBITReducerPath = MyHaBBITListSlice.reducerPath;

export const {
  completeMyHaBBITList,
  setMyHaBBITList,
  delMyHaBBITList,
  updateMyHaBBITList,
  selectMyHaBBITList
} =
MyHaBBITListSlice .actions;
