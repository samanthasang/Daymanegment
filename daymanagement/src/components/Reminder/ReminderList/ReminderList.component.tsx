"use client";
import ListSection from "@/components/mainPage/ListSection/ListSection.component";
import FinishedArray from "@/lib/Hooks/ListInfo/FinishedArray.componen";
import ReminderListActivities from "@/lib/Hooks/Lists/Reminder/ReminderListActivities.component";
import useReminderList from "@/lib/Hooks/Lists/Reminder/UseReminderList.component";
import dynamic from "next/dynamic";

const SelectedSection = dynamic(
  () =>
    import("@/components/mainPage/SelectedSection/SelectedSection.component"),
  { ssr: false }
);

function ReminderList() {
  const { ListReminderFiltered, ListReminderForgot, selectedReminder } =
    useReminderList();
  const { CompleteItem, DelItem, SelectItem, FinishItem } =
    ReminderListActivities();

  return (
    <>
      <ListSection
        drawerType="Reminders"
        formType="Add"
        drawerTitle="Reminder"
        selectedID={selectedReminder && !!selectedReminder.id}
        ListFilteredTilte="Reminders"
        ListForgotTilte="Old Reminders"
        ListFilteredCount={FinishedArray(ListReminderFiltered).length}
        ListForgotCount={FinishedArray(ListReminderForgot).length}
        ListFiltered={ListReminderFiltered as []}
        ListForgot={ListReminderForgot as []}
        withpriority
        withFinish
        withComplateSort
      />
      <SelectedSection
        drawerType="Reminders"
        formType="Edit"
        drawerTitle={selectedReminder.title}
        isComplete={(selectedReminder && selectedReminder.isComplete) || false}
        FinishItem={() =>
          FinishItem(selectedReminder.id, selectedReminder.title)
        }
        CompleteItem={() =>
          CompleteItem(selectedReminder.id, selectedReminder.title)
        }
        DuplicateItem
        DelItem={() => DelItem()}
        SelectItem={() => SelectItem()}
        selected={selectedReminder}
      />
    </>
  );
}

export default ReminderList;
