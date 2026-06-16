import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export type TTag= {
  id: string
  title: string
}

export interface InitialState {
  ListTag: TTag[];
  selectedTag: TTag | {}
}

export const TagListSlice = createSlice({
  reducerPath: "tagList",
  name: "@tagList",
  initialState: {
    ListTag: [],
    selectedTag: {}
  },
  reducers: {
    setTagList: (state: InitialState, action: PayloadAction<{
      id: string,
      title:string,
    }>) => {
      state.ListTag = state.ListTag ? [
        ...state.ListTag,
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
    delTagList: (state: InitialState, action: PayloadAction<string>) => {
      state.ListTag = state.ListTag.filter(
        (tag) => tag.id != action.payload
      );
    },
    updateTagList: (state: InitialState, action: PayloadAction<{
      id: any
      title: string
    }>) => {
      state.ListTag = state.ListTag.map((tag) =>
        tag.id == action.payload.id
          ? {
            ...tag,
            title: action.payload.title,
          }
          : tag
      );
    },
    selectTagList: (state: InitialState, action: PayloadAction<string>) => {
      state.selectedTag = state.ListTag.filter(
        (tag) => tag.id == action.payload
      )[0];
    },
  },
});

export const TagReducer = TagListSlice.reducer;
export const TagReducerPath = TagListSlice.reducerPath;

export const {
  setTagList,
  delTagList,
  updateTagList,
  selectTagList
} =
  TagListSlice.actions;
