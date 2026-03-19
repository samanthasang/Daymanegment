"use client";
import EmptyList from "@/components/mainPage/EmptyList/EmptyList.component";
import ListMenuBottom from "@/components/mainPage/ListContainer/ListMenuBottom.component";
import ComplateFIlter from "@/lib/Hooks/ComplateFIlter.component";
import StartDateOrderFilter from "@/lib/Hooks/StartDateOrderFilter.component";
import FinishedFIlter from "@/lib/Hooks/FinishedFIlter.componen";
import { cn } from "@/lib/utils";
import { TTimer } from "@/modules/timerList/timer.slice";
import { Timeritem } from "../TimerItem/TimerItem.component";

function TimerListCurrent({
  ListTimer,
  selectedID,
}: {
  ListTimer: TTimer[];
  selectedID: string;
}) {
  const { startDateOrderArray, startDateOrderFilter } =
    StartDateOrderFilter(ListTimer);

  const { finishArray, finishFIlter, setFinishFIlter } = startDateOrderFilter
    ? FinishedFIlter([...startDateOrderArray] as any)
    : ([...ListTimer] as any);

  const { complateArray, complateFIlter, setcomplateFIlter } =
    finishArray && finishFIlter
      ? ComplateFIlter([...finishArray] as any)
      : ComplateFIlter([...ListTimer] as any);

  return (
    <>
      <div
        className={cn(
          "flex flex-col h-full gap-y-2 ml-1",
          complateArray && complateArray.length > 5
            ? "scroll-m-0 overflow-y-scroll"
            : ""
        )}
      >
        {ListTimer?.length == 0 ? (
          <EmptyList />
        ) : (
          complateArray?.map((li: TTimer) => (
            <Timeritem key={li.id} item={li} />
          ))
        )}
      </div>
      <ListMenuBottom
        listTitle="Timer"
        drawerType="TimerList"
        formType="Edit Timer"
        selectedID={!!selectedID}
        complateFIlter={complateFIlter}
        dateFIlter={!finishFIlter}
        withcomplate
        withdate
        ChangeComplate={() => setcomplateFIlter(!complateFIlter)}
        ChangeDate={() => setFinishFIlter(!finishFIlter)}
        ListInfo={`${ListTimer?.filter((todo) => todo.isComplete == true).length} / ${ListTimer?.length}`}
      />
    </>
  );
}

export default TimerListCurrent;
