"use client";
import useTimerList from "@/lib/Hooks/Lists/UseTimerList.component";
import { cn } from "@/lib/utils";
import { Timeritem } from "../TimerItem/TimerItem.component";
import { TTimer } from "@/modules/timerList/timer.slice";
import ListContainer from "@/components/mainPage/ListContainer/ListContainer.component";
import EmptyList from "@/components/mainPage/EmptyList/EmptyList.component";

function TimerList() {
  const ListTimer = useTimerList();

  return (
    <ListContainer
      listTitle="Timer"
      ListInfo={`${ListTimer?.filter((todo) => todo.isComplete == true).length} / ${ListTimer?.length}`}
      scrollOn={(ListTimer && ListTimer.length !== 0) || false}
    >
      {ListTimer?.length == 0 ? (
        <EmptyList />
      ) : (
        ListTimer?.map((li: TTimer) => <Timeritem key={li.id} item={li} />)
      )}
    </ListContainer>
  );
}

export default TimerList;
