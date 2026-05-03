import { currentUnixTimestamp } from "@/lib/Hooks/UseDayJS";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export type TGoals = {
  id: string;
  title: string;
  isComplete: boolean;
  doDate: number;
  createDate: number;
  completeUpdate?: number;
  score: number;
  priority: string;
  category: string;
  tag: string;
  description: string;
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
        doDate: number;
        createDate: number;
        score: number;
        priority: string;
        description: string;
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
              description: action.payload.description,
              category: action.payload.category,
              tag: action.payload.tag,
              doDate: action.payload.doDate,
              createDate: action.payload.createDate,
              isComplete: false,
            },
          ]
        : [
            {
              id: nanoid(),
              priority: action.payload.priority,
              doDate: action.payload.doDate,
              createDate: action.payload.createDate,
              title: action.payload.title,
              score: action.payload.score,
              description: action.payload.description,
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
              score: action.payload.score,
              completeUpdate: currentUnixTimestamp,
            }
          : goal
      );
    },
    updateGoalList: (
      state: InitialState,
      action: PayloadAction<{
        id: any;
        title: string;
        doDate: number;
        createDate: number;
        score: number;
        priority: string;
        description: string;
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
              doDate: action.payload.doDate,
              createDate: action.payload.createDate,
              description: action.payload.description,
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
