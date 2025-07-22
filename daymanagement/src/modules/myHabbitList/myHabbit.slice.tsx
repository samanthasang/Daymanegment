import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

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
      lastUpdate: string
    }>) => {
      state.ListMyHaBBIT = state.ListMyHaBBIT ? [
        ...state.ListMyHaBBIT,
        {
          id: nanoid(),
          title: action.payload.title,
          priority: action.payload.priority,
          description: action.payload.description,
          score: 0,
          lastUpdate: 0
        },
      ] : [
          {
            id: nanoid(),
            priority: action.payload.priority,
            description: action.payload.description,
            title: action.payload.title,
            score: 0,
            lastUpdate: 0
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
          ? { ...MyHaBBIT, score: MyHaBBIT.score + 1 }
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
