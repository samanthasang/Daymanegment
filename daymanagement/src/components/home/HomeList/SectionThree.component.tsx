"use client";

import InstallmentsItem from "@/components/Installments/InstallmentsItem/Installments.component";
import EmptyList from "@/components/mainPage/List/EmptyList/EmptyList.component";
import ListTitle from "@/components/mainPage/List/ListContainer/ListTitle.component";
import ReminderItem from "@/components/Reminder/ReminderItem/ReminderItem.component";
import useInstallmentsList from "@/lib/Hooks/Lists/Installments/UseInstallmentsList.component";
import useReminderList from "@/lib/Hooks/Lists/Reminder/UseReminderList.component";
import { cn } from "@/lib/utils";
import { TInstallmentsts } from "@/modules/installmentstList/installmentst.slice";
import { TReminder } from "@/modules/reminderList/reminder.slice";
import { useState } from "react";

function SectionThree() {
  const [forgot, setForgot] = useState(false);

  const { ListInstallmentsFiltered } = useInstallmentsList();
  const { ListReminderFiltered } = useReminderList();

  return (
    <>
      <ListTitle
        forgot={forgot}
        setForgot={(f) => setForgot(f)}
        title="Installments"
        titleSec="Reminder"
        listCount={
          ListInstallmentsFiltered.length > 0
            ? ListInstallmentsFiltered?.filter((item) => !item.isComplete)
                .length
            : undefined
        }
        secListCount={
          ListReminderFiltered.length > 0
            ? ListReminderFiltered?.filter((item) => !item.isComplete).length
            : undefined
        }
      />
      {!forgot ? (
        <div
          className={cn(
            "flex flex-col h-full gap-y-2 ml-1",
            ListInstallmentsFiltered && ListInstallmentsFiltered.length > 6
              ? "scroll-m-0 overflow-y-scroll"
              : ""
          )}
        >
          {ListInstallmentsFiltered?.length == 0 ? (
            <EmptyList />
          ) : (
            ListInstallmentsFiltered?.map((li: TInstallmentsts) => (
              <InstallmentsItem key={li.id} item={li} />
            ))
          )}
        </div>
      ) : (
        <div
          className={cn(
            "flex flex-col h-full gap-y-2 ml-1",
            ListReminderFiltered && ListReminderFiltered.length > 6
              ? "scroll-m-0 overflow-y-scroll"
              : ""
          )}
        >
          {ListReminderFiltered?.length == 0 ? (
            <EmptyList />
          ) : (
            ListReminderFiltered?.map((li: TReminder) => (
              <ReminderItem key={li.id} item={li} />
            ))
          )}
        </div>
      )}
    </>
  );
}

export default SectionThree;
