// store.tsx - Type-safe, no middleware typing issues
import { CategoryReducer } from "@/modules/category/categoryList.slice";
import { goalReducer } from "@/modules/goalsList/goals.slice";
import { habitReducer } from "@/modules/habbitList/habbit.slice";
import { installmentstReducer } from "@/modules/installmentstList/installmentst.slice";
import { MenuReducer } from "@/modules/menu/menu.slice";
import { PeopleReducer } from "@/modules/people/PeopleList.slice";
import { reminderReducer } from "@/modules/reminderList/reminder.slice";
import { shareReducer } from "@/modules/share/share.slice";
import { spendsReducer } from "@/modules/spends/spends.slice";
import { TagReducer } from "@/modules/tag/TagList.slice";
import { timerReducer } from "@/modules/timerList/timer.slice";
import { todoReducer } from "@/modules/toDoList/todo.slice";
import { VisitReducer } from "@/modules/visitsList/visit.slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

// Combine reducers
const rootReducer = combineReducers({
  Todos: todoReducer,
  Reminders: reminderReducer,
  Habits: habitReducer,
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
});

// Load state from localStorage
const loadState = () => {
  if (typeof window === "undefined") return undefined;
  try {
    const serializedState = localStorage.getItem("mountains-state");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Failed to load state:", err);
    return undefined;
  }
};

// Create store
export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState(),
});

// Simple persistence - no middleware needed
let saveTimeout: ReturnType<typeof setTimeout> | null = null;
store.subscribe(() => {
  if (saveTimeout) clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    if (typeof window !== "undefined") {
      try {
        const state = store.getState();
        const serializedState = JSON.stringify(state);
        localStorage.setItem("mountains-state", serializedState);
      } catch (err) {
        console.error("Failed to save state:", err);
      }
    }
  }, 100);
});

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Helper functions
export const clearPersistedState = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("mountains-state");
  console.log("Storage cleared");
};

// Optional: Get current state snapshot
export const getCurrentState = () => store.getState();
