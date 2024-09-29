import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TicketState {
	ticketId: string;
}

export const ticketSlice = createSlice({
	reducerPath: "ticket",
	name: "@ticket",
	initialState: {
		ticketId: "",
	},
	reducers: {
		setTicketId: (state: TicketState, action: PayloadAction<string>) => {
			console.log(action.payload);

			state.ticketId = action.payload;
		},
	},
});

export const ticketReducer = ticketSlice.reducer;
export const ticketReducerPath = ticketSlice.reducerPath;

export const { setTicketId } = ticketSlice.actions;
