import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export type TToDo = {
  id: string
  title: string
  isComplete: boolean
  date: string,
  priority: string
}

export interface InitialState {
  ListToDo: TToDo[];
  selectedToDo: TToDo | {}
}

export const todoListSlice = createSlice({
  reducerPath: "todoList",
  name: "@todoList",
  initialState: {
    ListToDo: [],
    selectedToDo: {}
  },
  reducers: {
    setToDoList: (state: InitialState, action: PayloadAction<{
      id: string,
      title:string,
      date: string,
      priority: string
    }>) => {
      state.ListToDo = state.ListToDo ? [
        ...state.ListToDo,
        {
          id: nanoid(),
          title: action.payload.title,
          priority: action.payload.priority,
          date: action.payload.date,
          isComplete: false
        },
      ] : [
          {
            id: nanoid(),
            priority: action.payload.priority,
            date: action.payload.date,
            title: action.payload.title,
            isComplete: false
          },
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
    updateToDoList: (state: InitialState, action: PayloadAction<{
      id: any
      title: string
      date: string
      priority: string
    }>) => {
      state.ListToDo = state.ListToDo.map((todo) =>
        todo.id == action.payload.id
          ? {
            ...todo,
            title: action.payload.title,
            isComplete: todo.isComplete,
            priority: action.payload.priority,
            date: action.payload.date,
          }
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

export const {
  completeToDoList,
  setToDoList,
  delToDoList,
  updateToDoList,
  selectToDoList
} =
  todoListSlice.actions;
