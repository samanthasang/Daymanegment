"use client"
import useReminderList from "@/lib/Hooks/Lists/UseReminderList.component";
import { cn } from "@/lib/utils";
import { TReminder } from "@/modules/reminderList/reminder.slice";
import ReminderItem from "../ReminderItem/Reminder.component";

function ReminderList() {

  const ListReminder = useReminderList()
   
  return (
    <div className={cn("flex flex-col gap-4 px-3 col-span-2 h-auto", 
                ListReminder && ListReminder.length !== 0 ? "scroll-m-0 overflow-y-scroll" : "")}>
      <div className={cn("flex flex-col gap-4 px-3 col-span-2 h-auto")}>
          {ListReminder?.length == 0 ? 
              <div className="flex items-center justify-center rounded-2xl h-full">
                <span>
                  There is nothing to show
                </span>
              </div>
            : ListReminder?.map((li: TReminder) => (
              <ReminderItem
                key={li.id}
                item={li}
              />
            )
          )
        }
      </div>
    </div>
  );
}

export default ReminderList;
