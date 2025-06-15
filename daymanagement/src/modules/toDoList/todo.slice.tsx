import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export type ToDo = { id: string; title: string; isComplete: boolean }

export interface InitialState {
  ListToDo: ToDo[];
  selectedToDo: ToDo | {}
}

export const todoListSlice = createSlice({
  reducerPath: "todoList",
  name: "@todoList",
  initialState: {
    ListToDo: [],
    selectedToDo: {}
  },
  reducers: {
    setToDoList: (state: InitialState, action: PayloadAction<string>) => {
      state.ListToDo = state.ListToDo ? [
        ...state.ListToDo,
        { id: nanoid(), title: action.payload, isComplete: false },
      ] : [
        { id: nanoid(), title: action.payload, isComplete: false },
      ];
    },
    delToDoList: (state: InitialState, action: PayloadAction<string>) => {
      state.ListToDo = state.ListToDo.filter(
        (todo) => todo.id != action.payload
      );
    },
    completeToDoList: (state: InitialState, action: PayloadAction<string>) => {
      state.ListToDo = state.ListToDo.map((todo) =>
        todo.id == action.payload
          ? { ...todo, isComplete: !todo.isComplete }
          : todo
      );
    },
    updateToDoList: (state: InitialState, action: PayloadAction<{ id: any; title: string; }>) => {
      state.ListToDo = state.ListToDo.map((todo) =>
        todo.id == action.payload.id
          ? { ...todo, title: action.payload.title, isComplete: todo.isComplete }
          : todo
      );
    },
    selectToDoList: (state: InitialState, action: PayloadAction<string>) => {
      state.selectedToDo = state.ListToDo.filter(
        (todo) => todo.id == action.payload
      )[0];
    },
  },
});

export const todoReducer = todoListSlice.reducer;
export const todoReducerPath = todoListSlice.reducerPath;

export const { completeToDoList, setToDoList, delToDoList, updateToDoList, selectToDoList } =
  todoListSlice.actions;
