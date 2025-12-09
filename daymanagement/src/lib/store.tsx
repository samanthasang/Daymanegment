import { combineReducers, configureStore, Middleware } from "@reduxjs/toolkit";
import apiService from "./api.service";
import { ticketReducer } from "../modules/ticket/ticket.slice";
import { todoReducer } from "../modules/toDoList/todo.slice";
import { habbitReducer } from "@/modules/habbitList/habbit.slice";
import { MyHaBBITReducer } from "@/modules/myHabbitList/myHabbit.slice";
import { timerReducer } from "@/modules/timerList/timer.slice";
import { installmentstReducer } from "@/modules/installmentstList/installmentst.slice";
import { CategoryReducer } from "@/modules/category/categoryList.slice";

export const reducers = combineReducers({
  timer: ticketReducer,
  todoList: todoReducer,
  habbitList: habbitReducer,
  MYhabbitList: MyHaBBITReducer,
  TimerList: timerReducer,
  CategoryList: CategoryReducer,
  InstallmentstList: installmentstReducer,
  [apiService.reducerPath]: apiService.reducer,
});

const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
    // Run the action first to update the state
    const result = next(action);
    
    // Get the current state after the action
    const state = store.getState();
    
    try {
        localStorage.setItem("applicationState", JSON.stringify(state));
    } catch (error) {
        console.warn("Failed to persist state to localStorage:", error);
    }
    
    return result;
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
