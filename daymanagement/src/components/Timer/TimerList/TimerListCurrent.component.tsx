"use client";
import ListContent from "@/components/mainPage/List/ListContainer/ListContent.component";
import ListMenuBottom from "@/components/mainPage/List/ListMenu/ListMenuBottom.component";
import FinishedFIlter from "@/lib/Hooks/Filters/FinishedFilter.componen";
import ComplateFIlter from "@/lib/Hooks/ListFilter/ComplateFIlter.component";
import { TTimer } from "@/modules/timerList/timer.slice";
import { Timeritem } from "../TimerItem/TimerItem.component";

function TimerListCurrent({ ListTimer }: { ListTimer: TTimer[] }) {
  const { finishArray, finishFilter, setFinishFilter } = FinishedFIlter([
    ...ListTimer,
  ] as any);
  const { complateArray, complateFIlter, setcomplateFIlter } = ComplateFIlter([
    ...finishArray,
  ] as any);

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
        complateFIlter={complateFIlter}
        dateFIlter={finishFilter}
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
