"use client";

import ListSection from "@/components/mainPage/ListSection/ListSection.component";
import useInstallmentsList from "@/lib/Hooks/Lists/Installments/UseInstallmentsList.component";
import useReminderList from "@/lib/Hooks/Lists/Reminder/UseReminderList.component";

function SectionThree() {
  const { ListInstallmentsFiltered } = useInstallmentsList();
  const { ListReminderFiltered } = useReminderList();

  return (
    <ListSection
      drawerType="Installments"
      formType="Add"
      drawerTitle="Installment"
      selectedID={false}
      ListFilteredTilte="Installments"
      ListForgotTilte="Reminders"
      ListFilteredCount={ListInstallmentsFiltered.length}
      ListForgotCount={ListReminderFiltered.length}
      ListFiltered={ListInstallmentsFiltered as []}
      ListForgot={ListReminderFiltered as []}
    />
  );
}

export default SectionThree;
