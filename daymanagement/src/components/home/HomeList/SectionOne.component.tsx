"use client";

import EmptyList from "@/components/mainPage/EmptyList/EmptyList.component";
import ListTitle from "@/components/mainPage/ListContainer/ListTitle.component";
import Timeritem from "@/components/Timer/TimerItem/TimerItem.component";
import VisitsItem from "@/components/Visits/VisitsItem/VisitsItem.component";
import useTimerList from "@/lib/Hooks/Lists/Timer/UseTimerList.component";
import useVisitList from "@/lib/Hooks/Lists/Visit/UseVisitList.component";
import { cn } from "@/lib/utils";
import { TTimer } from "@/modules/timerList/timer.slice";
import { TVisit } from "@/modules/visitsList/visit.slice";
import { useState } from "react";

function SectionOne() {
  const [forgot, setForgot] = useState(false);
  const { ListTimerFiltered } = useTimerList();
  const { ListVisitFiltered } = useVisitList();

  return (
    <>
      <ListTitle
        forgot={forgot}
        setForgot={(f) => setForgot(f)}
        title="Timers"
        titleSec="Visits"
        listCount={
          ListTimerFiltered.length > 0
            ? ListTimerFiltered?.filter((item) => !item.isComplete).length
            : undefined
        }
        secListCount={
          ListVisitFiltered.length > 0
            ? ListVisitFiltered?.filter((item) => !item.isComplete).length
            : undefined
        }
      />
      {!forgot ? (
        <div
          className={cn(
            "flex flex-col h-full gap-y-2 ml-1 max-h-[50vh]",
            ListTimerFiltered && ListTimerFiltered.length > 3
              ? "scroll-m-0 overflow-y-scroll"
              : ""
          )}
        >
          {ListTimerFiltered?.length == 0 ? (
            <EmptyList />
          ) : (
            ListTimerFiltered?.map((li: TTimer) => (
              <Timeritem key={li.id} item={li} />
            ))
          )}
        </div>
      ) : (
        <div
          className={cn(
            "flex flex-col h-full gap-y-2 ml-1 max-h-[50vh]",
            ListTimerFiltered && ListTimerFiltered.length > 3
              ? "scroll-m-0 overflow-y-scroll"
              : ""
          )}
        >
          {ListTimerFiltered?.length == 0 ? (
            <EmptyList />
          ) : (
            ListVisitFiltered?.map((li: TVisit) => (
              <VisitsItem key={li.id} item={li} />
            ))
          )}
        </div>
      )}
    </>
  );
}

export default SectionOne;
