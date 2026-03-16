import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export type InitialState = {
  OpenMenu: boolean;
  OpenFilter: boolean;
};

export const MenuSlice = createSlice({
  reducerPath: "MenuOptions",
  name: "@menuOptions",
  initialState: {
    OpenMenu: true,
    OpenFilter: true,
  },
  reducers: {
    changeFilterStatuse: (state: InitialState) => {
      state.OpenFilter = !state.OpenFilter;
    },
    changeMenuStatuse: (state: InitialState) => {
      state.OpenMenu = !state.OpenMenu;
    },
  },
});

export const MenuReducer = MenuSlice.reducer;
export const MenuReducerPath = MenuSlice.reducerPath;

export const { changeFilterStatuse, changeMenuStatuse } = MenuSlice.actions;
