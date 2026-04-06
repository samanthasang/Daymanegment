"use client";
import ListContent from "@/components/mainPage/ListContainer/ListContent.component";
import ListMenuBottom from "@/components/mainPage/ListContainer/ListMenuBottom.component";
import ComplateFIlter from "@/lib/Hooks/ListFilter/ComplateFIlter.component";
import DateOrderFilter from "@/lib/Hooks/ListFilter/DateOrderFilter.component";
import FinishedFIlter from "@/lib/Hooks/Filters/FinishedFIlter.componen";
import PriorityFilter from "@/lib/Hooks/ListFilter/PriorityFilter.component";
import { TVisit } from "@/modules/visitsList/visit.slice";
import VisitsItem from "../VisitsItem/VisitsItem.component";

function VisitssListCurrent({
  ListVisit,
  selectedID,
}: {
  ListVisit: TVisit[];
  selectedID: string;
}) {
  const { dateOrderArray, dateOrderFilter } = DateOrderFilter(ListVisit);

  const { finishArray, finishFilter, setFinishFilter } = dateOrderFilter
    ? FinishedFIlter([...dateOrderArray] as any)
    : FinishedFIlter([...ListVisit] as any);

  const { priorityArray, priorityFilter, setPriorityFilter } =
    finishArray && finishFilter
      ? PriorityFilter([...finishArray] as any)
      : PriorityFilter([...dateOrderArray] as any);

  const { complateArray, complateFIlter, setcomplateFIlter } =
    priorityArray && priorityFilter
      ? ComplateFIlter([...priorityArray] as any)
      : ComplateFIlter([...finishArray] as any);

  return (
    <>
      <ListContent ListCount={complateArray.length}>
        {complateArray?.map((li: TVisit) => (
          <VisitsItem key={li.id} item={li} selectedID={selectedID} />
        ))}
      </ListContent>
      <ListMenuBottom
        listTitle="Visits"
        drawerType="VisitsList"
        formType="Add Visit"
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
        ListInfo={`${complateArray?.filter((item) => item.isComplete == true).length} / ${complateArray && complateArray.length}`}
      />
    </>
  );
}

export default VisitssListCurrent;
