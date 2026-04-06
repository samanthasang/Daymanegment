"use client";
import ListMenuBottom from "@/components/mainPage/ListContainer/ListMenuBottom.component";
import ComplateFIlter from "@/lib/Hooks/ListFilter/ComplateFIlter.component";
import FinishedFilter from "@/lib/Hooks/Filters/FinishedFIlter.componen";
import PriorityFilter from "@/lib/Hooks/ListFilter/PriorityFilter.component";
import ScoreFIlter from "@/lib/Hooks/Filters/ScoreFIlter.componet";
import { DayUnixFormat, DayUnixFormatNow } from "@/lib/Hooks/UseDayJS";
import { Thabbit } from "@/modules/habbitList/habbit.slice";
import ListContent from "../../mainPage/ListContainer/ListContent.component";
import HabbitItem from "../HabbitItem/HabbitItem.componen";

function HabbitListCurrent({
  ListHabbit,
  selectedID,
}: {
  ListHabbit: Thabbit[];
  selectedID: string;
}) {
  const { scoreArray, scoreFilter } = ScoreFIlter(ListHabbit);

  const { finishArray, finishFilter, setFinishFilter } = scoreFilter
    ? FinishedFilter([...scoreArray] as any)
    : FinishedFilter([...ListHabbit] as any);

  const { priorityArray, priorityFilter, setPriorityFilter } =
    finishArray && finishFilter
      ? PriorityFilter([...finishArray] as any)
      : PriorityFilter([...scoreArray] as any);

  const { complateArray, complateFIlter, setcomplateFIlter } =
    priorityArray && priorityFilter
      ? ComplateFIlter([...priorityArray] as any)
      : ComplateFIlter([...finishArray] as any);

  return (
    <>
      <ListContent ListCount={complateArray.length}>
        {ListHabbit?.map((li: Thabbit) => (
          <HabbitItem key={li.id} item={li} selectedID={selectedID} />
        ))}
      </ListContent>
      <ListMenuBottom
        listTitle="Habbits"
        drawerType="HabbitList"
        formType="Add Habbit"
        selectedID={!!selectedID}
        priorityFilter={priorityFilter}
        complateFIlter={complateFIlter}
        dateFIlter={!finishFilter}
        withpriority
        withcomplate
        withdate
        ChangeComplate={() => setcomplateFIlter(!complateFIlter)}
        ChangePriority={() => setPriorityFilter(!priorityFilter)}
        ChangeDate={() => setFinishFilter(!finishFilter)}
        ListInfo={`${
          ListHabbit?.filter(
            (todo) =>
              DayUnixFormat(+todo.completeUpdate, "DD") ==
              DayUnixFormatNow("DD")
          ).length
        } / ${ListHabbit?.length}`}
      />
    </>
  );
}

export default HabbitListCurrent;
