"use client";
import ListContainer from "@/components/mainPage/ListContainer/ListContainer.component";
import ListTitle from "@/components/mainPage/ListContainer/ListTitle.component";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import useReminderList from "@/lib/Hooks/Lists/Reminder/UseReminderList.component";
import {
  selectReminderList,
  TReminder,
} from "@/modules/reminderList/reminder.slice";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useEffect, useState } from "react";
import SelectedReminderList from "../ReminderItem/SelectedReminderList.component";
import ReminderListCurrent from "./ReminderListCurrent.component";
dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

const currentUnixTimestamp = dayjs().unix();

function ReminderList() {
  const dispatch = useAppDispatch();
  const [forgot, setForgot] = useState(false);

  const Reminder = useAppSelector((state) => state.reminder);

  const selectedReminder = Reminder?.selectedReminder as TReminder;

  const ListReminder = useReminderList();
  const ListReminderAll = Reminder?.ListReminder as TReminder[];
  const ListReminderForgot = ListReminderAll.filter(
    (a) =>
      dayjs(dayjs.unix(Number(a.date))) <
      dayjs(dayjs.unix(Number(currentUnixTimestamp)))
  );

  useEffect(() => {
    ListReminder.length == 0 && dispatch(selectReminderList(""));
  }, [ListReminder]);

  return (
    <div className="flex flex-row gap-x-3 flex-1 w-full mx-auto">
      <ListContainer selectedID={!!selectedReminder}>
        <ListTitle
          forgot={forgot}
          setForgot={(f) => setForgot(f)}
          title="Reminder"
        />
        {!forgot ? (
          <ReminderListCurrent
            ListReminder={ListReminder}
            selectedID={selectedReminder && selectedReminder.id}
          />
        ) : (
          <ReminderListCurrent
            ListReminder={ListReminderForgot}
            selectedID={selectedReminder && selectedReminder.id}
          />
        )}
      </ListContainer>
      {selectedReminder && <SelectedReminderList />}
    </div>
  );
}

export default ReminderList;
