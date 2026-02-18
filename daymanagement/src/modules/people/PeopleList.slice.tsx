import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export type TPeople = {
  id: string;
  title: string;
};

export interface InitialState {
  ListPeople: TPeople[];
  selectedPeople: TPeople | {};
}

export const PeopleListSlice = createSlice({
  reducerPath: "peopleList",
  name: "@peopleList",
  initialState: {
    ListPeople: [],
    selectedPeople: {},
  },
  reducers: {
    setPeopleList: (
      state: InitialState,
      action: PayloadAction<{
        id: string;
        title: string;
      }>
    ) => {
      state.ListPeople = state.ListPeople
        ? [
            ...state.ListPeople,
            {
              id: nanoid(),
              title: action.payload.title,
            },
          ]
        : [
            {
              id: nanoid(),
              title: action.payload.title,
            },
          ];
    },
    delPeopleList: (state: InitialState, action: PayloadAction<string>) => {
      state.ListPeople = state.ListPeople.filter(
        (people) => people.id != action.payload
      );
    },
    updatePeopleList: (
      state: InitialState,
      action: PayloadAction<{
        id: any;
        title: string;
      }>
    ) => {
      state.ListPeople = state.ListPeople.map((people) =>
        people.id == action.payload.id
          ? {
              ...people,
              title: action.payload.title,
            }
          : people
      );
    },
    selectPeopleList: (state: InitialState, action: PayloadAction<string>) => {
      state.selectedPeople = state.ListPeople.filter(
        (people) => people.id == action.payload
      )[0];
    },
  },
});

export const PeopleReducer = PeopleListSlice.reducer;
export const PeopleReducerPath = PeopleListSlice.reducerPath;

export const {
  setPeopleList,
  delPeopleList,
  updatePeopleList,
  selectPeopleList,
} = PeopleListSlice.actions;
