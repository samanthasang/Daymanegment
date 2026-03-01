"use client";
import EmptyList from "@/components/mainPage/EmptyList/EmptyList.component";
import ListContainer from "@/components/mainPage/ListContainer/ListContainer.component";
import useReminderList from "@/lib/Hooks/Lists/UseReminderList.component";
import { TReminder } from "@/modules/reminderList/reminder.slice";
import ReminderItem from "../ReminderItem/Reminder.component";

function ReminderList() {
  const ListReminder = useReminderList();

  return (
    <ListContainer
      listTitle="ReminderList"
      ListInfo={`${ListReminder?.filter((todo) => todo.isComplete == true).length} / ${ListReminder?.length}`}
      scrollOn={(ListReminder && ListReminder.length !== 0) || false}
    >
      {ListReminder?.length == 0 ? (
        <EmptyList />
      ) : (
        ListReminder?.map((li: TReminder) => (
          <ReminderItem key={li.id} item={li} />
        ))
      )}
    </ListContainer>
  );
}

export default ReminderList;
