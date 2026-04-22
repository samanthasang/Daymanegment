"use client";
import FinishedFilter from "@/lib/Hooks/Filters/FinishedFilter.componen";
import ComplateFIlter from "@/lib/Hooks/ListFilter/ComplateFIlter.component";
import PriorityFilter from "@/lib/Hooks/ListFilter/PriorityFilter.component";
import NotFinishedArray from "@/lib/Hooks/ListInfo/NotFinishedArray.componen";
import { Suspense } from "react";
import ListContent from "./ListContainer/ListContent.component";
import ListDetails from "./ListDetails.component";
import ListMenuBottom from "./ListMenu/ListMenuBottom.component";

function CurrentList({
  List,
  listTitle,
  drawerType,
  formType,
}: {
  List: [];
  listTitle: string;
  drawerType: string;
  formType: string;
}) {
  const { finishArray, finishFilter, setFinishFilter } = FinishedFilter([
    ...List,
  ]);

  const { priorityArray, priorityFilter, setPriorityFilter } = PriorityFilter([
    ...finishArray,
  ]);

  const { complateArray, complateFIlter, setcomplateFIlter } = ComplateFIlter([
    ...priorityArray,
  ]);
  const FinishedArrayList = NotFinishedArray(complateArray);

  return (
    <>
      <ListContent ListCount={complateArray.length}>
        <Suspense>
          <ListDetails List={complateArray as []} drawerType={drawerType} />
        </Suspense>
      </ListContent>
      <ListMenuBottom
        listTitle={listTitle}
        drawerType={drawerType}
        formType={formType}
        priorityFilter={priorityFilter}
        complateFIlter={complateFIlter}
        dateFIlter={finishFilter}
        withpriority
        withcomplate
        withdate
        ChangeComplate={() => setcomplateFIlter(!complateFIlter)}
        ChangePriority={() => setPriorityFilter(!priorityFilter)}
        ChangeDate={() => setFinishFilter(!finishFilter)}
        ListInfo={
          drawerType == "PeopleList"
            ? `${complateArray?.length}`
            : `${FinishedArrayList.length} / ${complateArray?.length}`
        }
      />
    </>
  );
}

export default CurrentList;
