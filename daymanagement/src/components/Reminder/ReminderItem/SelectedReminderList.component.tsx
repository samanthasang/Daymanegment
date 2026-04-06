"use client";
import SelectedContainer from "@/components/mainPage/selectedItem/SelectedContainer.component";
import SelectedItem from "@/components/mainPage/selectedItem/SelectedItem.component";
import SelectedMenuBottom from "@/components/mainPage/selectedItem/SelectedMenuBottom.component";
import ReminderListActivities from "@/lib/Hooks/Lists/Reminder/ReminderListActivities.component";
import useReminderList from "@/lib/Hooks/Lists/Reminder/UseReminderList.component";

function SelectedReminderList() {
  const { CompleteItemt, DelItem, SelectItem } = ReminderListActivities();

  const { selectedReminder } = useReminderList();

  return (
    <SelectedContainer>
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
    </SelectedContainer>
  );
}

export default SelectedReminderList;
