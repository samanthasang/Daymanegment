import { combineReducers, configureStore } from "@reduxjs/toolkit";
import apiService from "./api.service";
import { ticketReducer } from "../modules/ticket/ticket.slice";
import { todoReducer } from "../modules/toDoList/todo.slice";
import { habbitReducer } from "@/modules/habbitList/habbit.slice";
import { MyHaBBITReducer } from "@/modules/myHabbitList/myHabbit.slice";
import { timerReducer } from "@/modules/timerList/timer.slice";

export const reducers = combineReducers({
  timer: ticketReducer,
  todoList: todoReducer,
  habbitList: habbitReducer,
  MYhabbitList: MyHaBBITReducer,
  TimerList: timerReducer,
  [apiService.reducerPath]: apiService.reducer,
});

const localStorageMiddleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    localStorage.setItem("applicationState", JSON.stringify(getState()));
    return result;
  };
};

const reHydrateStore = () => {
  if (localStorage.getItem("applicationState") !== null) {
    return JSON.parse(localStorage.getItem("applicationState") as string); // re-hydrate the store
  }
};
export const store = configureStore({
  reducer: reducers,
  preloadedState: reHydrateStore(),
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware()
      .concat(apiService.middleware)
      .concat(localStorageMiddleware);
  },
  // devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
