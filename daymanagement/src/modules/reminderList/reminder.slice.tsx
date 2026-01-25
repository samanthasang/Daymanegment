import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import dayjs, { ManipulateType } from "dayjs";

export type TReminder = {
  id?: string
  title: string
  isComplete: boolean
  date: string,
  timeDiff: string,
  priodDiff: string,
  priority: string
  category: string
  tag: string
}

export interface InitialState {
  ListReminder: TReminder[];
  selectedReminder: TReminder | {}
}

export const reminderListSlice = createSlice({
  reducerPath: "reminderList",
  name: "@reminderList",
  initialState: {
    ListReminder: [],
    selectedReminder: {}
  },
  reducers: {
    setReminderList: (state: InitialState, action: PayloadAction<{
      id: string,
      title:string,
      date: string,
      timeDiff: string,
      priodDiff: string,
      priority: string,
      category: string,
      tag: string
    }>) => {
      state.ListReminder = state.ListReminder ? [
        ...state.ListReminder,
        {
          id: nanoid(),
          title: action.payload.title,
          priority: action.payload.priority,
          category: action.payload.category,
          tag: action.payload.tag,
          date: action.payload.date,
          timeDiff: action.payload.timeDiff,
          priodDiff: action.payload.priodDiff,
          isComplete: false
        },
      ] : [
          {
            id: nanoid(),
            priority: action.payload.priority,
            date: action.payload.date,
            timeDiff: action.payload.timeDiff,
            priodDiff: action.payload.priodDiff,
            title: action.payload.title,
            category: action.payload.category,
            tag: action.payload.tag,
            isComplete: false
          },
      ];
    },
    delReminderList: (state: InitialState, action: PayloadAction<string>) => {
      state.ListReminder = state.ListReminder.filter(
        (reminder) => reminder.id != action.payload
      );
    },
    completeReminderList: (state: InitialState, action: PayloadAction<string>) => {
      state.ListReminder = state.ListReminder.map((reminder) =>
        reminder.id == action.payload
          ? {
            ...reminder,
            isComplete: !reminder.isComplete
          }
          : reminder
      );
    },
    updateTimeReminderList: (state: InitialState, action: PayloadAction<string>) => {
      state.ListReminder = state.ListReminder.map((reminder) =>
        reminder.id == action.payload
          ? {
            ...reminder,
            date: dayjs(dayjs.unix(+reminder.date).add(+reminder.timeDiff, reminder.priodDiff as ManipulateType)).unix().toString()
          }
          : reminder
      );
    },
    updateReminderList: (state: InitialState, action: PayloadAction<{
      id: any
      title: string
      date: string
      timeDiff: string
      priodDiff: string
      priority: string
      category: string
      tag: string
    }>) => {
      state.ListReminder = state.ListReminder.map((reminder) =>
        reminder.id == action.payload.id
          ? {
            ...reminder,
            title: action.payload.title,
            isComplete: reminder.isComplete,
            priority: action.payload.priority,
            timeDiff: action.payload.timeDiff,
            priodDiff: action.payload.priodDiff,
            date: action.payload.date,
            category: action.payload.category,
            tag: action.payload.tag,
          }
          : reminder
      );
    },
    selectReminderList: (state: InitialState, action: PayloadAction<string>) => {
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
  updateTimeReminderList
} =
  reminderListSlice.actions;
