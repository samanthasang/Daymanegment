"use client";
import EmptyList from "@/components/mainPage/EmptyList/EmptyList.component";
import ListContainer from "@/components/mainPage/ListContainer/ListContainer.component";
import ListMenuBottom from "@/components/mainPage/ListContainer/ListMenuBottom.component";
import SelectedItem from "@/components/mainPage/selectedItem/SelectedItem.component";
import SelectedMenuBottom from "@/components/mainPage/selectedItem/SelectedMenuBottom.component";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import DateFIlter from "@/lib/Hooks/ComplateReminderFIlter.component";
import FinishedFIlter from "@/lib/Hooks/FinishedFIlter.componen";
import ReminderListActivities from "@/lib/Hooks/Lists/Reminder/ReminderListActivities.component";
import useReminderList from "@/lib/Hooks/Lists/Reminder/UseReminderList.component";
import PriorityFilter from "@/lib/Hooks/PriorityFilter.component";
import { cn } from "@/lib/utils";
import {
  selectReminderList,
  TReminder,
} from "@/modules/reminderList/reminder.slice";
import { useEffect } from "react";
import ReminderItem from "../ReminderItem/Reminder.component";

function ReminderList() {
  const dispatch = useAppDispatch();

  const ListReminder = useReminderList();
  const Reminder = useAppSelector((state) => state.reminder);

  const { CompleteItemt, DelItem, SelectItem, SelectWithId } =
    ReminderListActivities();

  const selectedReminder = Reminder?.selectedReminder as TReminder;

  const { priorityArray, priorityFilter, setPriorityFilter } = PriorityFilter(
    ListReminder as any
  );

  const { dateArray, dateFIlter, setDateFIlter } =
    priorityArray && priorityFilter
      ? DateFIlter([...priorityArray] as any)
      : DateFIlter([...ListReminder] as any);

  const { finishArray, finishFIlter, setFinishFIlter } =
    priorityArray && priorityFilter
      ? FinishedFIlter([...dateArray] as any)
      : FinishedFIlter([...ListReminder] as any);

  useEffect(() => {
    ListReminder.length == 0 && dispatch(selectReminderList(""));
  }, [ListReminder]);

  return (
    <div className="flex flex-row gap-x-3 flex-1 w-full mx-auto">
      <ListContainer listTitle="ReminderList" selectedID={!!selectedReminder}>
        <div
          className={cn(
            "flex flex-col h-full gap-y-2",
            (ListReminder && ListReminder.length !== 0) || false
              ? "scroll-m-0 overflow-y-scroll"
              : ""
          )}
        >
          {ListReminder?.length == 0 ? (
            <EmptyList />
          ) : (
            finishArray?.map((li: TReminder) => (
              <ReminderItem
                key={li.id}
                item={li}
                selectedID={selectedReminder && selectedReminder.id}
              />
            ))
          )}
        </div>
        <ListMenuBottom
          listTitle="Reminders"
          drawerType="ReminderList"
          formType="Add Reminder"
          selectedID={!!selectedReminder}
          withpriority
          withcomplate
          withdate
          priorityFilter={priorityFilter}
          dateFIlter={!finishFIlter}
          complateFIlter={dateFIlter}
          ChangeDate={() => setFinishFIlter(!finishFIlter)}
          ChangeComplate={() => setDateFIlter(!dateFIlter)}
          ChangePriority={() => setPriorityFilter(!priorityFilter)}
          ListInfo={`${ListReminder?.filter((todo) => todo.isComplete == true).length} / ${ListReminder?.length}`}
        />
      </ListContainer>
      {selectedReminder && (
        <div className="flex flex-col w-full flex-1 bg-secondary rounded-2xl relative">
          <SelectedItem
            drawerType="ReminderList"
            CompleteItemt={() =>
              CompleteItemt(selectedReminder.id, selectedReminder.title)
            }
            {...selectedReminder}
          />
          <SelectedMenuBottom
            CompleteItemt={() =>
              CompleteItemt(selectedReminder.id, selectedReminder.title)
            }
            DelItem={DelItem}
            SelectItem={SelectItem}
            drawerType="ReminderList"
            formType="Edit Reminder"
            selectedIsComplete={selectedReminder.isComplete}
          />
        </div>
      )}
    </div>
  );
}

export default ReminderList;
