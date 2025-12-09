import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export type TCategory= {
  id: string
  title: string
}

export interface InitialState {
  ListCategory: TCategory[];
  selectedCategory: TCategory | {}
}

export const CategoryListSlice = createSlice({
  reducerPath: "categoryList",
  name: "@categoryList",
  initialState: {
    ListCategory: [],
    selectedCategory: {}
  },
  reducers: {
    setCategoryList: (state: InitialState, action: PayloadAction<{
      id: string,
      title:string,
    }>) => {
      state.ListCategory = state.ListCategory ? [
        ...state.ListCategory,
        {
          id: nanoid(),
          title: action.payload.title,
        },
      ] : [
          {
            id: nanoid(),
            title: action.payload.title,
          },
      ];
    },
    delCategoryList: (state: InitialState, action: PayloadAction<string>) => {
      state.ListCategory = state.ListCategory.filter(
        (category) => category.id != action.payload
      );
    },
    updateCategoryList: (state: InitialState, action: PayloadAction<{
      id: any
      title: string
    }>) => {
      state.ListCategory = state.ListCategory.map((category) =>
        category.id == action.payload.id
          ? {
            ...category,
            title: action.payload.title,
          }
          : category
      );
    },
    selectCategoryList: (state: InitialState, action: PayloadAction<string>) => {
      state.selectedCategory = state.ListCategory.filter(
        (category) => category.id == action.payload
      )[0];
    },
  },
});

export const CategoryReducer = CategoryListSlice.reducer;
export const CategoryReducerPath = CategoryListSlice.reducerPath;

export const {
  setCategoryList,
  delCategoryList,
  updateCategoryList,
  selectCategoryList
} =
  CategoryListSlice.actions;
