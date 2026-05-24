import { createSlice } from "@reduxjs/toolkit";

export type InitialState = {
  OpenMenu: boolean;
  OpenFilter: boolean;
  lang: string;
};

export const MenuSlice = createSlice({
  reducerPath: "MenuOptions",
  name: "@menuOptions",
  initialState: {
    OpenMenu: true,
    OpenFilter: true,
    lang: "en",
  },
  reducers: {
    changeFilterStatuse: (state: InitialState) => {
      state.OpenFilter = !state.OpenFilter;
    },
    changeMenuStatuse: (state: InitialState) => {
      state.OpenMenu = !state.OpenMenu;
    },
    changeLang: (state: InitialState) => {
      state.lang = state.lang == "en" ? "fa" : "en";
    },
  },
});

export const MenuReducer = MenuSlice.reducer;
export const MenuReducerPath = MenuSlice.reducerPath;

export const { changeFilterStatuse, changeMenuStatuse, changeLang } =
  MenuSlice.actions;
