"use client";
import ListContent from "@/components/mainPage/ListContainer/ListContent.component";
import ListMenuBottom from "@/components/mainPage/ListContainer/ListMenuBottom.component";
import ComplateFIlter from "@/lib/Hooks/ListFilter/ComplateFIlter.component";
import FinishedFIlter from "@/lib/Hooks/Filters/FinishedFIlter.componen";
import StartDateOrderFilter from "@/lib/Hooks/ListFilter/StartDateOrderFilter.component";
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

  const { finishArray, finishFilter, setFinishFilter } = startDateOrderFilter
    ? FinishedFIlter([...startDateOrderArray] as any)
    : FinishedFIlter([...ListTimer] as any);

  const { complateArray, complateFIlter, setcomplateFIlter } =
    finishArray && finishFilter
      ? ComplateFIlter([...finishArray] as any)
      : ComplateFIlter([...ListTimer] as any);

  return (
    <>
      <ListContent ListCount={complateArray.length}>
        {complateArray?.map((li: TTimer) => (
          <Timeritem key={li.id} item={li} />
        ))}
      </ListContent>
      <ListMenuBottom
        listTitle="Timer"
        drawerType="TimerList"
        formType="Edit Timer"
        selectedID={!!selectedID}
        complateFIlter={complateFIlter}
        dateFIlter={!finishFilter}
        withcomplate
        withdate
        ChangeComplate={() => setcomplateFIlter(!complateFIlter)}
        ChangeDate={() => setFinishFilter(!finishFilter)}
        ListInfo={`${ListTimer?.filter((todo) => todo.isComplete == true).length} / ${ListTimer?.length}`}
      />
    </>
  );
}

export default TimerListCurrent;
