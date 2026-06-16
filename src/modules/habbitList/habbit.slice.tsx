import { currentUnixTimestamp, DayUnixAdd } from "@/lib/Hooks/UseDayJS";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ManipulateType } from "dayjs";

export type Thabit = {
  id: string;
  title: string;
  score: number;
  highest: number;
  description: string;
  priority: string;
  createDate: number;
  lastUpdate: number;
  doDate: number;
  isComplete: boolean;
  isPause: boolean;
  category: string;
  tag: string;
  dType: string;
  everyDay: boolean;
  customDays: string;
};

export interface InitialState {
  ListHabit: Thabit[];
  selectedhabit: Thabit | {};
}

export const habitListSlice = createSlice({
  reducerPath: "Habits",
  name: "@Habits",
  initialState: {
    ListHabit: [],
    selectedhabit: {},
  },
  reducers: {
    setHabitList: (
      state: InitialState,
      action: PayloadAction<{
        id: string;
        title: string;
        description: string;
        priority: string;
        score: number;
        doDate: number;
        isComplete: boolean;
        category: string;
        tag: string;
        everyDay: boolean;
        customDays: string;
      }>
    ) => {
      state.ListHabit = state.ListHabit
        ? [
            ...state.ListHabit.filter((Habit) => Habit.id != action.payload.id),
            {
              id: action.payload.id,
              title: action.payload.title,
              priority: action.payload.priority,
              description: action.payload.description,
              category: action.payload.category,
              tag: action.payload.tag,
              score: action.payload.score || 1,
              highest: action.payload.score || 1,
              createDate: currentUnixTimestamp,
              lastUpdate: currentUnixTimestamp,
              doDate: action.payload.doDate,
              isComplete: false,
              isPause: false,
              everyDay: action.payload.everyDay,
              customDays: action.payload.customDays,
              dType: "Habit",
            },
          ]
        : [
            {
              id: action.payload.id,
              priority: action.payload.priority,
              description: action.payload.description,
              title: action.payload.title,
              category: action.payload.category,
              tag: action.payload.tag,
              score: action.payload.score || 1,
              highest: action.payload.score || 1,
              createDate: currentUnixTimestamp,
              lastUpdate: currentUnixTimestamp,
              doDate: action.payload.doDate,
              isComplete: false,
              isPause: false,
              everyDay: action.payload.everyDay,
              customDays: action.payload.customDays,
              dType: "Habit",
            },
          ];
    },
    delHabitList: (state: InitialState, action: PayloadAction<string>) => {
      state.ListHabit = state.ListHabit.filter(
        (Habit) => Habit.id != action.payload
      );
    },
    completeHabitList: (state: InitialState, action: PayloadAction<string>) => {
      state.ListHabit = state.ListHabit.map((Habit) =>
        Habit.id == action.payload
          ? {
              ...Habit,
              score: !Habit.isComplete ? Habit.score + 1 : Habit.score - 1,
              highest:
                Habit.highest >= Habit.score ? Habit.highest : Habit.score,
              lastUpdate: currentUnixTimestamp,
              isComplete: !Habit.isComplete,
              doDate: DayUnixAdd(
                +Habit.doDate,
                "day" as ManipulateType,
                Habit.everyDay ? 1 : +(Habit.customDays ?? 1)
              ),
            }
          : Habit
      );
    },
    PauseHabitList: (state: InitialState, action: PayloadAction<string>) => {
      state.ListHabit = state.ListHabit.map((Habit) =>
        Habit.id == action.payload
          ? {
              ...Habit,
              lastUpdate: currentUnixTimestamp,
              isPause: !Habit.isPause,
            }
          : Habit
      );
    },
    updateHabitList: (
      state: InitialState,
      action: PayloadAction<{
        id: any;
        title: string;
        description: string;
        score: number;
        priority: string;
        doDate: number;
        category: string;
        tag: string;
        isComplete?: boolean;
        everyDay: boolean;
        customDays: string;
      }>
    ) => {
      state.ListHabit = state.ListHabit.map((Habit) =>
        Habit.id == action.payload.id
          ? {
              ...Habit,
              title: action.payload.title,
              description: action.payload.description,
              score: action.payload.score || Habit.score,
              highest:
                Habit.highest > Habit.score ? Habit.highest : Habit.score,
              priority: action.payload.priority,
              category: action.payload.category,
              tag: action.payload.tag,
              lastUpdate: currentUnixTimestamp,
              doDate: action.payload.doDate,
              isComplete:
                action.payload.isComplete != undefined
                  ? action.payload.isComplete
                  : Habit.isComplete,
              dType: "Habit",
              everyDay: action.payload.everyDay,
              customDays: action.payload.customDays,
            }
          : Habit
      );
    },
    selectHabitList: (state: InitialState, action: PayloadAction<string>) => {
      state.selectedhabit = state.ListHabit.filter(
        (Habit) => Habit.id == action.payload
      )[0];
    },
  },
});

export const habitReducer = habitListSlice.reducer;
export const habitReducerPath = habitListSlice.reducerPath;

export const {
  completeHabitList,
  setHabitList,
  delHabitList,
  updateHabitList,
  selectHabitList,
  PauseHabitList,
} = habitListSlice.actions;
