import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export type TToDoList= {
    id: string; 
    name: string;
    priority: string;
    dob: Date;
    isComplete: boolean

  }

interface InitialState {
  toDoList: {
    id: string; 
    name: string;
    priority: string;
    dob: Date;
    isComplete: boolean
  }[];
}

export const todoListSlice = createSlice({
  reducerPath: "todoList",
  name: "@todoList",
  initialState: {
    toDoList: [] as TToDoList[],
  },
  reducers: {
    addToDoList: (state: InitialState, action: PayloadAction<string>) => {
      const {name,priority,dob} = JSON.parse(action.payload)
      state.toDoList = [
        ...state.toDoList,
        { id: nanoid(),  name, priority, dob, isComplete: false },
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

export const { addToDoList, delToDoList, updateToDoList } =
  todoListSlice.actions;
