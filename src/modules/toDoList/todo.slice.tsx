import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  toDoList: { id: string; title: string }[];
}

export const todoListSlice = createSlice({
  reducerPath: "todoList",
  name: "@todoList",
  initialState: {
    toDoList: [],
  },
  reducers: {
    setToDoList: (state: InitialState, action: PayloadAction<string>) => {
      state.toDoList = [
        ...state.toDoList,
        { id: nanoid(), title: action.payload },
      ];
    },
  },
});

export const todoReducer = todoListSlice.reducer;
export const todoReducerPath = todoListSlice.reducerPath;

export const { setToDoList } = todoListSlice.actions;
