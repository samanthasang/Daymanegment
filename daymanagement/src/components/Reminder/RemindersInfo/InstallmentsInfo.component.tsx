"use client";
import ListTitle from "@/components/mainPage/ListSection/ListContainer/ListTitle.component";
import ListTitleContainer from "@/components/mainPage/ListSection/ListContainer/ListTitleContainer.component";
import FinishedArray from "@/lib/Hooks/ListInfo/FinishedArray.componen";
import NotFinishedArray from "@/lib/Hooks/ListInfo/NotFinishedArray.componen";
import useReminderList from "@/lib/Hooks/Lists/Reminder/UseReminderList.component";
import { currentUnixTimestampZero, DayUnixAdd } from "@/lib/Hooks/UseDayJS";
import { useState } from "react";

function RemindersInfo() {
  const [forgot, setForgot] = useState(false);
  const { ListReminderFiltered, ListReminderForgot, ListReminderAll } =
    useReminderList();

  const RemindersLenght = ListReminderFiltered.length;
  const RemindersFinishLenght = NotFinishedArray(ListReminderFiltered).length;
  const RemindersNotFinishLenght = FinishedArray(ListReminderFiltered).length;
  const RemindersTodayLenght = ListReminderAll.filter(
    (item) =>
      item.doDate >= currentUnixTimestampZero &&
      item.doDate <= DayUnixAdd(currentUnixTimestampZero, "day", 1)
  );
  const RemindersTenDayLenght = ListReminderAll.filter(
    (item) =>
      item.doDate >= currentUnixTimestampZero &&
      item.doDate <= DayUnixAdd(currentUnixTimestampZero, "day", 10)
  ).length;

  const TodayRemindersFinishLenght =
    NotFinishedArray(RemindersTodayLenght).length;
  const TodayRemindersNotFinishLenght =
    FinishedArray(RemindersTodayLenght).length;

  const OldRemindersLenght = ListReminderForgot.length;
  const OldRemindersFinishLenght = NotFinishedArray(ListReminderForgot).length;
  const OldRemindersNotFinishLenght = FinishedArray(ListReminderForgot).length;

  return (
    <div className="w-full min-w-96 flex flex-col gap-y-2">
      <ListTitleContainer>
        <ListTitle
          forgot={!forgot}
          setForgot={() => setForgot(false)}
          title={"Reminders"}
        />
        <ListTitle
          forgot={forgot}
          setForgot={() => setForgot(true)}
          title={"Old Reminders"}
        />
      </ListTitleContainer>
      <div className="flex justify-between items-center bg-primary py-1 px-3 rounded-3xl">
        <span>All Reminders :</span>
        {!forgot ? RemindersLenght : OldRemindersLenght}
      </div>
      <div className="flex justify-between items-center text-blue-500 bg-primary py-1 px-3 rounded-3xl">
        <span>Done Status :</span>
        <div className="flex justify-center items-center w-fit h-2 text-blue-500 bg-primary py-1 gap-x-0.5">
          <span className="text-successGreen border-r-[1px] pr-1 border-blue-500">
            {!forgot ? RemindersFinishLenght : OldRemindersFinishLenght}
          </span>
          <span className="text-errorRed">
            {!forgot ? RemindersNotFinishLenght : OldRemindersNotFinishLenght}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center bg-primary py-1 px-3 rounded-3xl">
        <span>In 10 days Reminders :</span>
        {RemindersTenDayLenght}
      </div>
      <div className="flex justify-between items-center text-blue-500 bg-primary py-1 px-3 rounded-3xl">
        <span>Today Reminders :</span>
        <div className="flex justify-center items-center w-fit h-2 text-blue-500 bg-primary py-1 gap-x-0.5">
          <span className="text-successGreen border-r-[1px] pr-1 border-blue-500">
            {TodayRemindersFinishLenght}
          </span>
          <span className="text-errorRed">{TodayRemindersNotFinishLenght}</span>
        </div>
      </div>
    </div>
  );
}

export default RemindersInfo;
