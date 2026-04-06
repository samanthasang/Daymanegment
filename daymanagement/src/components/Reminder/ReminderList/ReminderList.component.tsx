"use client";
import ListContainer from "@/components/mainPage/ListContainer/ListContainer.component";
import ListTitle from "@/components/mainPage/ListContainer/ListTitle.component";
import useReminderList from "@/lib/Hooks/Lists/Reminder/UseReminderList.component";
import useMediaQueryValues from "@/lib/Hooks/useMediaQuery";
import { useState } from "react";
import SelectedReminderList from "../ReminderItem/SelectedReminderList.component";
import ReminderListCurrent from "./ReminderListCurrent.component";

function ReminderList() {
  const [forgot, setForgot] = useState(false);
  const { isSX, isSMMin } = useMediaQueryValues();

  const { ListReminderFiltered, ListReminderForgot, selectedReminder } =
    useReminderList();

  return (
    <div className="flex flex-row gap-x-3 flex-1 w-full mx-auto">
      {((isSX && !selectedReminder) || isSMMin) && (
        <ListContainer selectedID={!!selectedReminder}>
          <ListTitle
            forgot={forgot}
            setForgot={(f) => setForgot(f)}
            title="Reminder"
            listCount={
              ListReminderFiltered.length > 0
                ? ListReminderFiltered?.filter((item) => !item.isComplete)
                    .length
                : undefined
            }
            secListCount={
              ListReminderForgot.length > 0
                ? ListReminderForgot?.filter((item) => !item.isComplete).length
                : undefined
            }
          />
          {!forgot ? (
            <ReminderListCurrent
              ListReminder={ListReminderFiltered}
              selectedID={selectedReminder && selectedReminder.id}
            />
          ) : (
            <ReminderListCurrent
              ListReminder={ListReminderForgot}
              selectedID={selectedReminder && selectedReminder.id}
            />
          )}
        </ListContainer>
      )}
      {selectedReminder && <SelectedReminderList />}
    </div>
  );
}

export default ReminderList;
