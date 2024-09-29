import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ImageState {
	imageId: number;
}

export const imageSlice = createSlice({
	reducerPath: "avatar",
	name: "@avatar",
	initialState: {
		imageId: 0,
	},
	reducers: {
		setImageId: (state: ImageState, action: PayloadAction<number>) => {
			state.imageId = action.payload;
		},
	},
});

export const imageReducer = imageSlice.reducer;
export const imageReducerPath = imageSlice.reducerPath;

export const { setImageId } = imageSlice.actions;
