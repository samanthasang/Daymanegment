import { combineReducers, configureStore } from "@reduxjs/toolkit";
import apiService from "./api.service";
import { ticketReducer } from "../modules/ticket/ticket.slice";
import { todoReducer } from "../modules/toDoList/todo.slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const reducers = combineReducers({
  timer: ticketReducer,
  todoList: todoReducer,
  [apiService.reducerPath]: apiService.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    })
      .concat(apiService.middleware);
  },
  devTools: true,
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
