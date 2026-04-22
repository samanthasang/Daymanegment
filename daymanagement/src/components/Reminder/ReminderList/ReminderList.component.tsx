"use client";
import ListSection from "@/components/mainPage/ListSection/ListSection.component";
import FinishedArray from "@/lib/Hooks/ListInfo/FinishedArray.componen";
import ReminderListActivities from "@/lib/Hooks/Lists/Reminder/ReminderListActivities.component";
import useReminderList from "@/lib/Hooks/Lists/Reminder/UseReminderList.component";
import { DayUnixFormat, DayUnixFormatNow } from "@/lib/Hooks/UseDayJS";
import dynamic from "next/dynamic";

const SelectedSection = dynamic(
  () =>
    import("@/components/mainPage/SelectedSection/SelectedSection.component"),
  { ssr: false }
);

function ReminderList() {
  const { ListReminderFiltered, ListReminderForgot, selectedReminder } =
    useReminderList();
  const { CompleteItem, DelItem, SelectItem, UpdateTimeReminderList } =
    ReminderListActivities();

  return (
    <>
      <ListSection
        drawerType="ReminderList"
        formType="Add Reminder"
        selectedID={selectedReminder && !!selectedReminder.id}
        ListFilteredTilte="Reminder"
        ListForgotTilte="Old Reminder"
        ListFilteredCount={FinishedArray(ListReminderFiltered).length}
        ListForgotCount={FinishedArray(ListReminderForgot).length}
        ListFiltered={ListReminderFiltered as []}
        ListForgot={ListReminderForgot as []}
      />
      <SelectedSection
        drawerType="ReminderList"
        formType="Edit Reminder"
        selectedIsComplete={
          (selectedReminder && selectedReminder.isComplete) || false
        }
        FinishItem={() =>
          UpdateTimeReminderList(selectedReminder.id, selectedReminder.title)
        }
        CompleteItem={() =>
          CompleteItem(selectedReminder.id, selectedReminder.title)
        }
        isfinished={(selectedReminder && selectedReminder.isComplete) || false}
        isComplete={
          selectedReminder &&
          !!selectedReminder.doDate &&
          DayUnixFormat(+selectedReminder.doDate, "YYYY-MM-DD") >
            DayUnixFormatNow("YYYY-MM-DD")
        }
        DelItem={() => DelItem()}
        SelectItem={() => SelectItem()}
        selected={selectedReminder}
      />
    </>
  );
}

export default ReminderList;
