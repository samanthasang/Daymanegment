"use client";
import EmptyList from "@/components/mainPage/EmptyList/EmptyList.component";
import ListMenuBottom from "@/components/mainPage/ListContainer/ListMenuBottom.component";
import ComplateFIlter from "@/lib/Hooks/ComplateFIlter.component";
import DateOrderFilter from "@/lib/Hooks/DateOrderFilter.component";
import FinishedFIlter from "@/lib/Hooks/FinishedFIlter.componen";
import PriorityFilter from "@/lib/Hooks/PriorityFilter.component";
import { cn } from "@/lib/utils";
import { TReminder } from "@/modules/reminderList/reminder.slice";
import ReminderItem from "../ReminderItem/Reminder.component";

function ReminderListCurrent({
  ListReminder,
  selectedID,
}: {
  ListReminder: TReminder[];
  selectedID: string;
}) {
  const { dateOrderArray, dateOrderFilter } = DateOrderFilter(ListReminder);

  const { finishArray, finishFIlter, setFinishFIlter } = dateOrderFilter
    ? FinishedFIlter([...dateOrderArray] as any)
    : ([...ListReminder] as any);

  const { priorityArray, priorityFilter, setPriorityFilter } =
    finishArray && finishFIlter
      ? PriorityFilter([...finishArray] as any)
      : PriorityFilter([...dateOrderArray] as any);

  const { complateArray, complateFIlter, setcomplateFIlter } =
    priorityArray && priorityFilter
      ? ComplateFIlter([...priorityArray] as any)
      : ComplateFIlter([...finishArray] as any);

  return (
    <>
      <div
        className={cn(
          "flex flex-col h-full gap-y-2",
          (complateArray && complateArray.length !== 0) || false
            ? "scroll-m-0 overflow-y-scroll"
            : ""
        )}
      >
        {complateArray?.length == 0 ? (
          <EmptyList />
        ) : (
          complateArray?.map((li: TReminder) => (
            <ReminderItem key={li.id} item={li} selectedID={selectedID} />
          ))
        )}
      </div>
      <ListMenuBottom
        listTitle="Reminders"
        drawerType="ReminderList"
        formType="Add Reminder"
        selectedID={!!selectedID}
        priorityFilter={priorityFilter}
        complateFIlter={complateFIlter}
        dateFIlter={!finishFIlter}
        withpriority
        withcomplate
        withdate
        ChangeComplate={() => setcomplateFIlter(!complateFIlter)}
        ChangePriority={() => setPriorityFilter(!priorityFilter)}
        ChangeDate={() => setFinishFIlter(!finishFIlter)}
        ListInfo={`${complateArray?.filter((todo) => todo.isComplete == true).length} / ${complateArray?.length}`}
      />
    </>
  );
}

export default ReminderListCurrent;
