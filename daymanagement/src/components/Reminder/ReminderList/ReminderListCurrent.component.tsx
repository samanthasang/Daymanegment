"use client";
import ListContent from "@/components/mainPage/ListContainer/ListContent.component";
import ListMenuBottom from "@/components/mainPage/ListContainer/ListMenuBottom.component";
import ComplateFIlter from "@/lib/Hooks/ListFilter/ComplateFIlter.component";
import DateOrderFilter from "@/lib/Hooks/ListFilter/DateOrderFilter.component";
import FinishedFIlter from "@/lib/Hooks/Filters/FinishedFIlter.componen";
import PriorityFilter from "@/lib/Hooks/ListFilter/PriorityFilter.component";
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

  const { finishArray, finishFilter, setFinishFilter } = dateOrderFilter
    ? FinishedFIlter([...dateOrderArray] as any)
    : FinishedFIlter([...ListReminder] as any);

  const { priorityArray, priorityFilter, setPriorityFilter } =
    finishArray && finishFilter
      ? PriorityFilter([...finishArray] as any)
      : PriorityFilter([...dateOrderArray] as any);

  const { complateArray, complateFIlter, setcomplateFIlter } =
    priorityArray && priorityFilter
      ? ComplateFIlter([...priorityArray] as any)
      : ComplateFIlter([...finishArray] as any);

  return (
    <>
      <ListContent ListCount={complateArray.length}>
        {complateArray?.map((li: TReminder) => (
          <ReminderItem key={li.id} item={li} selectedID={selectedID} />
        ))}
      </ListContent>
      <ListMenuBottom
        listTitle="Reminders"
        drawerType="ReminderList"
        formType="Add Reminder"
        selectedID={!!selectedID}
        priorityFilter={priorityFilter}
        complateFIlter={complateFIlter}
        dateFIlter={!finishFilter}
        withpriority
        withcomplate
        withdate
        ChangeComplate={() => setcomplateFIlter(!complateFIlter)}
        ChangePriority={() => setPriorityFilter(!priorityFilter)}
        ChangeDate={() => setFinishFilter(!finishFilter)}
        ListInfo={`${complateArray?.filter((todo) => todo.isComplete == true).length} / ${complateArray?.length}`}
      />
    </>
  );
}

export default ReminderListCurrent;
