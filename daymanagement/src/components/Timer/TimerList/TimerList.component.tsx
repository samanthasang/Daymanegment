"use client";
import ListContainer from "@/components/mainPage/ListContainer/ListContainer.component";
import ListTitle from "@/components/mainPage/ListContainer/ListTitle.component";
import useTimerList from "@/lib/Hooks/Lists/Timer/UseTimerList.component";
import useMediaQueryValues from "@/lib/Hooks/useMediaQuery";
import { useState } from "react";
import SelectedTimerList from "../TimerItem/SelectedTimerList.component";
import TimerListCurrent from "./TimerListCurrent.component";

function TimerList() {
  const [forgot, setForgot] = useState(false);
  const { isSX, isSMMin } = useMediaQueryValues();

  const { ListTimerFiltered, ListTimerForgot, selectedTimer } = useTimerList();

  return (
    <div className="flex flex-row gap-x-3 flex-1 w-full mx-auto">
      {((isSX && !selectedTimer) || isSMMin) && (
        <ListContainer selectedID={!!selectedTimer}>
          <ListTitle
            forgot={forgot}
            setForgot={(f) => setForgot(f)}
            title="Timers"
            listCount={
              ListTimerFiltered.length > 0
                ? ListTimerFiltered?.filter((item) => !item.isComplete).length
                : undefined
            }
            secListCount={
              ListTimerForgot.length > 0
                ? ListTimerForgot?.filter((item) => !item.isComplete).length
                : undefined
            }
          />
          {!forgot ? (
            <TimerListCurrent
              ListTimer={ListTimerFiltered}
              selectedID={selectedTimer && selectedTimer.id}
            />
          ) : (
            <TimerListCurrent
              ListTimer={ListTimerForgot}
              selectedID={selectedTimer && selectedTimer.id}
            />
          )}
        </ListContainer>
      )}
      {selectedTimer && <SelectedTimerList />}
    </div>
  );
}

export default TimerList;
