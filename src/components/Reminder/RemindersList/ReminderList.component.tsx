"use client";
import ListSection from "@/components/mainPage/ListSection/ListSection.component";
import FinishedArray from "@/lib/Hooks/ListInfo/FinishedArray.componen";
import ReminderListActivities from "@/lib/Hooks/Lists/Reminder/ReminderListActivities.component";
import useReminderList from "@/lib/Hooks/Lists/Reminder/UseReminderList.component";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";
import dynamic from "next/dynamic";

const SelectedSection = dynamic(
  () =>
    import("@/components/mainPage/SelectedSection/SelectedSection.component"),
  { ssr: false }
);

function ReminderList() {
  const { ListReminderFiltered, ListReminderForgot, selectedReminder } =
    useReminderList();
  const { CompleteItem, DelItem, SelectItem, PauseItem, UndoItem } =
    ReminderListActivities();
  const t: any = UseLangComponent("Reminders");

  return (
    <>
      <ListSection
        drawerType="Reminders"
        formType="Add"
        drawerTitle={t.single}
        selectedID={selectedReminder && !!selectedReminder.id}
        ListFilteredTilte={t.title}
        ListForgotTilte={t.forgotTilte}
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
        drawerTitle={t.single}
        isComplete={(selectedReminder && selectedReminder.isComplete) || false}
        PauseItem={() => PauseItem(selectedReminder.id, selectedReminder.title)}
        CompleteItem={() =>
          CompleteItem(selectedReminder.id, selectedReminder.title)
        }
        UndoneItem={() => UndoItem(selectedReminder)}
        DelItem={() => DelItem(selectedReminder.id, selectedReminder.title)}
        SelectItem={() => SelectItem()}
        selected={selectedReminder}
      />
    </>
  );
}

export default ReminderList;
