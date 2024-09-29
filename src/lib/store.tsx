import { combineReducers, configureStore } from "@reduxjs/toolkit";
import apiService from "./api.service";
import { ticketReducer } from "../modules/ticket/ticket.slice";
import { imageReducer } from "../modules/imageAvatar/avatar.slice";

export const reducers = combineReducers({
	ticket: ticketReducer	 ,
	avatar: imageReducer,
	[apiService.reducerPath]: apiService.reducer,
});

export const store = configureStore({
	reducer: reducers,
	middleware(getDefaultMiddleware) {
		return getDefaultMiddleware().concat(apiService.middleware);
	},
	devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
