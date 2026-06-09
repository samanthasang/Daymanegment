import { currentUnixTimestamp, DayUnixAdd } from "@/lib/Hooks/UseDayJS";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { ManipulateType } from "dayjs";

export type TReminder = {
  id: string;
  title: string;
  isComplete: boolean;
  isPause: boolean;
  doDate: number;
  createDate: number;
  lastUpdate: number;
  startDate: number;
  timeDiff: string;
  priodDiff: string;
  priority: string;
  category: string;
  tag: string;
  description: string;
  dType: string;
};

export interface InitialState {
  ListReminder: TReminder[];
  selectedReminder: TReminder | {};
}

export const reminderListSlice = createSlice({
  reducerPath: "Reminders",
  name: "@Reminders",
  initialState: {
    ListReminder: [],
    selectedReminder: {},
  },
  reducers: {
    setReminderList: (
      state: InitialState,
      action: PayloadAction<{
        id: string;
        title: string;
        doDate: number;
        timeDiff: string;
        priodDiff: string;
        priority: string;
        category: string;
        tag: string;
        description: string;
      }>
    ) => {
      state.ListReminder = state.ListReminder
        ? [
            ...state.ListReminder,
            {
              id: nanoid(),
              title: action.payload.title,
              priority: action.payload.priority,
              category: action.payload.category,
              tag: action.payload.tag,
              doDate: action.payload.doDate,
              createDate: currentUnixTimestamp,
              lastUpdate: currentUnixTimestamp,
              startDate: action.payload.doDate,
              timeDiff: action.payload.timeDiff,
              priodDiff: action.payload.priodDiff,
              description: action.payload.description,
              isComplete: false,
              isPause: false,
              dType: "Reminder",
            },
          ]
        : [
            {
              id: nanoid(),
              priority: action.payload.priority,
              doDate: action.payload.doDate,
              createDate: currentUnixTimestamp,
              lastUpdate: currentUnixTimestamp,
              startDate: action.payload.doDate,
              timeDiff: action.payload.timeDiff,
              priodDiff: action.payload.priodDiff,
              title: action.payload.title,
              category: action.payload.category,
              tag: action.payload.tag,
              description: action.payload.description,
              isComplete: false,
              isPause: false,
              dType: "Reminder",
            },
          ];
    },
    delReminderList: (state: InitialState, action: PayloadAction<string>) => {
      state.ListReminder = state.ListReminder.filter(
        (reminder) => reminder.id != action.payload
      );
    },
    completeReminderList: (
      state: InitialState,
      action: PayloadAction<string>
    ) => {
      state.ListReminder = state.ListReminder.map((reminder) =>
        reminder.id == action.payload
          ? {
              ...reminder,
              isComplete: !reminder.isComplete,
              doDate: DayUnixAdd(
                +reminder.doDate,
                reminder.priodDiff as ManipulateType,
                +reminder.timeDiff
              ),
              lastUpdate: currentUnixTimestamp,
            }
          : reminder
      );
    },
    pauseReminderList: (state: InitialState, action: PayloadAction<string>) => {
      state.ListReminder = state.ListReminder.map((reminder) =>
        reminder.id == action.payload
          ? {
              ...reminder,
              isPause: !reminder.isPause,
            }
          : reminder
      );
    },
    unFinishReminderList: (
      state: InitialState,
      action: PayloadAction<string>
    ) => {
      state.ListReminder = state.ListReminder.map((reminder) =>
        reminder.id == action.payload
          ? {
              ...reminder,
              isComplete: false,
            }
          : reminder
      );
    },
    updateReminderList: (
      state: InitialState,
      action: PayloadAction<{
        id: any;
        title: string;
        doDate: number;
        isComplete?: boolean;
        timeDiff: string;
        priodDiff: string;
        priority: string;
        category: string;
        description: string;
        tag: string;
      }>
    ) => {
      state.ListReminder = state.ListReminder.map((reminder) =>
        reminder.id == action.payload.id
          ? {
              ...reminder,
              title: action.payload.title,
              isComplete: action.payload.isComplete ?? reminder.isComplete,
              priority: action.payload.priority,
              timeDiff: action.payload.timeDiff,
              priodDiff: action.payload.priodDiff,
              doDate: action.payload.doDate,
              lastUpdate: currentUnixTimestamp,
              category: action.payload.category,
              description: action.payload.description,
              tag: action.payload.tag,
              dType: "Reminder",
            }
          : reminder
      );
    },
    selectReminderList: (
      state: InitialState,
      action: PayloadAction<string>
    ) => {
      state.selectedReminder = state.ListReminder.filter(
        (reminder) => reminder.id == action.payload
      )[0];
    },
  },
});

export const reminderReducer = reminderListSlice.reducer;
export const reminderReducerPath = reminderListSlice.reducerPath;

export const {
  completeReminderList,
  setReminderList,
  delReminderList,
  updateReminderList,
  selectReminderList,
  unFinishReminderList,
  pauseReminderList,
} = reminderListSlice.actions;
