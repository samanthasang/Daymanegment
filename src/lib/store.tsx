// store.ts
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
import { VisitReducer } from "@/modules/visitsList/visit.slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "../modules/toDoList/todo.slice";

// Combine all reducers with CORRECT keys
const rootReducer = combineReducers({
  Todos: todoReducer,
  Reminders: reminderReducer,
  Habits: habitReducer, // ✅ Changed from "Habbits" to "Habits"
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

// Load state from localStorage with migration
const migrateState = (persistedState: any) => {
  if (!persistedState) return undefined;

  const migratedState = { ...persistedState };
  let hasChanges = false;

  // Migrate old "Habbits" key to "Habits" if it exists
  if (persistedState.Habbits && !persistedState.Habits) {
    migratedState.Habits = persistedState.Habbits;
    delete migratedState.Habbits;
    hasChanges = true;
    console.log("✅ Migrated: Habbits → Habits");
  }

  // Remove any other unknown keys
  const knownKeys = [
    "Todos",
    "Reminders",
    "Habits",
    "Timers",
    "Spends",
    "CategoryList",
    "TagList",
    "Friends",
    "Installments",
    "Visits",
    "Goals",
    "Shares",
    "Menu",
  ];

  Object.keys(migratedState).forEach((key) => {
    if (!knownKeys.includes(key) && key !== "_persist") {
      console.warn(`⚠️ Removing unknown key: ${key}`);
      delete migratedState[key];
      hasChanges = true;
    }
  });

  // Save migrated state back to localStorage
  if (hasChanges && typeof window !== "undefined") {
    try {
      const serialized = JSON.stringify(migratedState);
      localStorage.setItem("mountains-state", serialized);
      console.log("💾 Migrated state saved");
    } catch (err) {
      console.error("Failed to save migrated state:", err);
    }
  }

  return migratedState;
};

// Load state from localStorage
const loadState = () => {
  if (typeof window === "undefined") return undefined;

  try {
    const serializedState = localStorage.getItem("mountains-state");
    if (serializedState === null) return undefined;

    const parsed = JSON.parse(serializedState);
    const migratedState = migrateState(parsed);

    return migratedState;
  } catch (err) {
    console.error("Failed to load state:", err);
    return undefined;
  }
};

// Create the store
export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState(),
  devTools: process.env.NODE_ENV !== "production",
});

// Persistence
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
  console.log("🗑️ Storage cleared");
  window.location.reload();
};
