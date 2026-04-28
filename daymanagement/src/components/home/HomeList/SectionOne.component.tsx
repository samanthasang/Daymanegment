"use client";
import EmptyList from "@/components/mainPage/ListSection/EmptyList/EmptyList.component";
import ListTitle from "@/components/mainPage/ListSection/ListContainer/ListTitle.component";
import ListSection from "@/components/mainPage/ListSection/ListSection.component";
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
      <ListSection
        ListFilteredTilte="Timers"
        ListForgotTilte="Visits"
        ListFilteredCount={ListTimerFiltered.length}
        ListForgotCount={ListVisitFiltered.length}
        ListFiltered={ListTimerFiltered as []}
        ListForgot={ListVisitFiltered as []}
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
