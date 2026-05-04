import { CategoryReducer } from "@/modules/category/categoryList.slice";
import { goalReducer } from "@/modules/goalsList/goals.slice";
import { habbitReducer } from "@/modules/habbitList/habbit.slice";
import { installmentstReducer } from "@/modules/installmentstList/installmentst.slice";
import { MenuReducer } from "@/modules/menu/menu.slice";
import { PeopleReducer } from "@/modules/people/PeopleList.slice";
import { reminderReducer } from "@/modules/reminderList/reminder.slice";
import { shareReducer } from "@/modules/share/share.slice";
import { spendsReducer } from "@/modules/spends/spends.slice";
import { TagReducer } from "@/modules/tag/TagList.slice";
import { timerReducer } from "@/modules/timerList/timer.slice";
import { VisitReducer } from "@/modules/visitsList/visit.slice";
import { combineReducers, configureStore, Middleware } from "@reduxjs/toolkit";
import { todoReducer } from "../modules/toDoList/todo.slice";
// import apiService from "./api.service";

export const reducers = combineReducers({
  Todos: todoReducer,
  Reminders: reminderReducer,
  Habbits: habbitReducer,
  Timers: timerReducer,
  Spends: spendsReducer,
  CategoryList: CategoryReducer,
  TagList: TagReducer,
  Friends: PeopleReducer,
  Installments: installmentstReducer,
  Visits: VisitReducer,
  Goals: goalReducer,
  Shares: shareReducer,
  Menu: MenuReducer,
  // [apiService.reducerPath]: apiService.reducer,
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
  try {
    const persistedState = localStorage.getItem("applicationState");
    if (persistedState) {
      return JSON.parse(persistedState);
    }
  } catch (error) {
    console.warn("Failed to rehydrate state from localStorage:", error);
  }
  return undefined;
};
export const store = configureStore({
  reducer: reducers,
  preloadedState: reHydrateStore(),
  middleware(getDefaultMiddleware) {
    return (
      getDefaultMiddleware()
        // .concat(apiService.middleware)
        .concat(localStorageMiddleware)
    );
  },
  // devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
