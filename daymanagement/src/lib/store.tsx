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
  todoList: todoReducer,
  reminder: reminderReducer,
  habbitList: habbitReducer,
  TimerList: timerReducer,
  SpendsList: spendsReducer,
  CategoryList: CategoryReducer,
  TagList: TagReducer,
  PeopleList: PeopleReducer,
  InstallmentstList: installmentstReducer,
  visit: VisitReducer,
  Goals: goalReducer,
  ShareList: shareReducer,
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
  if (localStorage.getItem("applicationState") !== null) {
    return JSON.parse(localStorage.getItem("applicationState") as string); // re-hydrate the store
  }
};
export const store = configureStore({
  reducer: reducers,
  preloadedState: reHydrateStore(),
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware()
      // .concat(apiService.middleware)
      .concat(localStorageMiddleware);
  },
  // devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
