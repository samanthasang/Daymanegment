import { currentUnixTimestamp } from "@/lib/Hooks/UseDayJS";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export type TPeople = {
  id: string;
  title: string;
  firstName?: string;
  lastName?: string;
  shareList: string[];
  phoneNumber: string;
  birthDate: number;
  createDate: number;
  lastUpdate: number;
  description: string;
};

export interface InitialState {
  ListPeople: TPeople[];
  selectedPeople: TPeople | {};
}

export const PeopleListSlice = createSlice({
  reducerPath: "Friends",
  name: "@Friends",
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
        firstName: string;
        lastName: string;
        phoneNumber: string;
        birthDate: number;
        description: string;
      }>
    ) => {
      state.ListPeople = state.ListPeople
        ? [
            ...state.ListPeople,
            {
              id: nanoid(),
              title: action.payload.title,
              firstName: action.payload.firstName,
              lastName: action.payload.lastName,
              phoneNumber: action.payload.phoneNumber,
              birthDate: action.payload.birthDate,
              createDate: currentUnixTimestamp,
              lastUpdate: currentUnixTimestamp,
              description: action.payload.description,
              shareList: [],
            },
          ]
        : [
            {
              id: nanoid(),
              title: action.payload.title,
              firstName: action.payload.firstName,
              lastName: action.payload.lastName,
              phoneNumber: action.payload.phoneNumber,
              birthDate: action.payload.birthDate,
              createDate: currentUnixTimestamp,
              lastUpdate: currentUnixTimestamp,
              description: action.payload.description,
              shareList: [],
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
        firstName: string;
        lastName: string;
        phoneNumber: string;
        birthDate: number;
        description: string;
      }>
    ) => {
      state.ListPeople = state.ListPeople.map((people) =>
        people.id == action.payload.id
          ? {
              ...people,
              title: action.payload.title,
              firstName: action.payload.firstName,
              lastName: action.payload.lastName,
              phoneNumber: action.payload.phoneNumber,
              birthDate: action.payload.birthDate,
              lastUpdate: currentUnixTimestamp,
              description: action.payload.description,
            }
          : people
      );
    },
    addFriendsListShare: (
      state: InitialState,
      action: PayloadAction<{
        id: string;
        peopleId?: string;
      }>
    ) => {
      state.ListPeople = state.ListPeople.map((people) =>
        people.id == action.payload.peopleId
          ? {
              ...people,
              lastUpdate: currentUnixTimestamp,
              shareList: people.shareList
                ? !people.shareList.includes(action.payload.id)
                  ? [...people.shareList, action.payload.id]
                  : [...people.shareList]
                : [action.payload.id],
            }
          : people
      );
    },
    delFriendsListShare: (
      state: InitialState,
      action: PayloadAction<{
        id: string;
        peopleId?: string;
      }>
    ) => {
      state.ListPeople = state.ListPeople.map((people) =>
        people.id == action.payload.peopleId
          ? {
              ...people,
              shareList: people.shareList.filter(
                (share) => share == action.payload.id
              ),
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
  addFriendsListShare,
  delFriendsListShare,
} = PeopleListSlice.actions;
