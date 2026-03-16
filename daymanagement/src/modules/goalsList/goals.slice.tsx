import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export type TGoals = {
  id: string;
  title: string;
  isComplete: boolean;
  date: string;
  score?: number;
  priority: string;
  category: string;
  tag: string;
};

export interface InitialState {
  ListTGoals: TGoals[];
  selectedGoal: TGoals | {};
}

export const goalsListSlice = createSlice({
  reducerPath: "goalsList",
  name: "@goalsList",
  initialState: {
    ListTGoals: [],
    selectedGoal: {},
  },
  reducers: {
    setGoalList: (
      state: InitialState,
      action: PayloadAction<{
        id: string;
        title: string;
        date: string;
        score: number;
        priority: string;
        category: string;
        tag: string;
      }>
    ) => {
      state.ListTGoals = state.ListTGoals
        ? [
            ...state.ListTGoals,
            {
              id: nanoid(),
              title: action.payload.title,
              priority: action.payload.priority,
              score: action.payload.score,
              category: action.payload.category,
              tag: action.payload.tag,
              date: action.payload.date,
              isComplete: false,
            },
          ]
        : [
            {
              id: nanoid(),
              priority: action.payload.priority,
              date: action.payload.date,
              title: action.payload.title,
              score: action.payload.score,
              category: action.payload.category,
              tag: action.payload.tag,
              isComplete: false,
            },
          ];
    },
    delGoalList: (state: InitialState, action: PayloadAction<string>) => {
      state.ListTGoals = state.ListTGoals.filter(
        (goal) => goal.id != action.payload
      );
    },
    completeGoalList: (
      state: InitialState,
      action: PayloadAction<{ id: any; score: number }>
    ) => {
      state.ListTGoals = state.ListTGoals.map((goal) =>
        goal.id == action.payload.id
          ? {
              ...goal,
              isComplete: !goal.isComplete,
              score: action.payload.score + 1,
            }
          : goal
      );
    },
    updateGoalList: (
      state: InitialState,
      action: PayloadAction<{
        id: any;
        title: string;
        date: string;
        score: number;
        priority: string;
        category: string;
        tag: string;
      }>
    ) => {
      state.ListTGoals = state.ListTGoals.map((goal) =>
        goal.id == action.payload.id
          ? {
              ...goal,
              title: action.payload.title,
              isComplete: goal.isComplete,
              priority: action.payload.priority,
              date: action.payload.date,
              score: action.payload.score,
              category: action.payload.category,
              tag: action.payload.tag,
            }
          : goal
      );
    },
    selectGoalList: (state: InitialState, action: PayloadAction<string>) => {
      state.selectedGoal = state.ListTGoals.filter(
        (goal) => goal.id == action.payload
      )[0];
    },
  },
});

export const goalReducer = goalsListSlice.reducer;
export const goalReducerPath = goalsListSlice.reducerPath;

export const {
  completeGoalList,
  setGoalList,
  delGoalList,
  updateGoalList,
  selectGoalList,
} = goalsListSlice.actions;
