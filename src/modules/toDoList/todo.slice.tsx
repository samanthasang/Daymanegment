import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  toDoList: { id: string; title: string; isComplete: boolean }[];
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
        { id: nanoid(), title: action.payload, isComplete: false },
      ];
    },
    delToDoList: (state: InitialState, action: PayloadAction<string>) => {
      state.toDoList = state.toDoList.filter(
        (todo) => todo.id != action.payload
      );
    },
    updateToDoList: (state: InitialState, action: PayloadAction<string>) => {
      state.toDoList = state.toDoList.map((todo) =>
        todo.id == action.payload
          ? { ...todo, isComplete: !todo.isComplete }
          : todo
      );
    },
  },
});

export const todoReducer = todoListSlice.reducer;
export const todoReducerPath = todoListSlice.reducerPath;

export const { setToDoList, delToDoList, updateToDoList } =
  todoListSlice.actions;
