"use client";
import FinishedFilter from "@/lib/Hooks/Filters/FinishedFilter.componen";
import ComplateFIlter from "@/lib/Hooks/ListFilter/ComplateFIlter.component";
import PriorityFilter from "@/lib/Hooks/ListFilter/PriorityFilter.component";
import NotFinishedArray from "@/lib/Hooks/ListInfo/NotFinishedArray.componen";
import { Suspense } from "react";
import ListContent from "./ListContainer/ListContent.component";
import ListDetails from "./ListDetails.component";
import ListMenuBottom from "./ListMenu/ListMenuBottom.component";
import IncomeFilter from "@/lib/Hooks/Filters/IncomeFilter.componen";
import IncomeMFilter from "@/lib/Hooks/Filters/IncomeMFilter.componen";
import IncomeArray from "@/lib/Hooks/ListInfo/IncomeArray.componen";
import OutcomeArray from "@/lib/Hooks/ListInfo/outcomeArray.componet";
import { TSpends } from "@/modules/spends/spends.slice";

function CurrentList({
  List,
  listTitle,
  drawerType,
  formType,
  withShop,
  withBalance,
  withpriority,
  withFinish,
  withComplateSort,
}: {
  List: [];
  listTitle: string;
  drawerType: string;
  formType: string;
  withpriority?: boolean;
  withShop?: boolean;
  withBalance?: boolean;
  withFinish?: boolean;
  withComplateSort?: boolean;
}) {
  const { finishArray, finishFilter, setFinishFilter } = FinishedFilter([
    ...List,
  ]);

  const { priorityArray, priorityFilter, setPriorityFilter } = withFinish
    ? PriorityFilter([...finishArray])
    : PriorityFilter([...List]);

  const { complateArray, complateFIlter, setcomplateFIlter } = withpriority
    ? ComplateFIlter([...priorityArray])
    : ComplateFIlter([...List]);

  const FinishedArrayList = NotFinishedArray(complateArray);

  const incomeArrayList: TSpends[] = IncomeArray(List);
  const outcomeArrayList: TSpends[] = OutcomeArray(List);
  const { incomeArray, incomeFilter, setIncomeFilter } = IncomeFilter([
    ...List,
  ]);

  const { incomeMArray, incomeMFIlter, setIncomeMFilter } = withBalance
    ? IncomeMFilter([...incomeArray])
    : IncomeMFilter([...List]);

  const ListAfterFilter = withComplateSort
    ? complateArray
    : withShop && withBalance
      ? incomeMArray
      : incomeArray;

  return (
    <>
      <ListContent ListCount={ListAfterFilter.length}>
        <Suspense>
          <ListDetails List={ListAfterFilter as []} drawerType={drawerType} />
        </Suspense>
      </ListContent>
      <ListMenuBottom
        listTitle={listTitle}
        drawerType={drawerType}
        formType={formType}
        priorityFilter={priorityFilter}
        complateFIlter={complateFIlter}
        dateFIlter={finishFilter}
        shopFilter={!incomeFilter}
        balanceFilter={!incomeMFIlter}
        withpriority={withpriority}
        withComplateSort={withComplateSort}
        withFinish={withFinish}
        withShop={withShop}
        withBalance={withBalance}
        ChangeComplate={() => setcomplateFIlter(!complateFIlter)}
        ChangePriority={() => setPriorityFilter(!priorityFilter)}
        ChangeDate={() => setFinishFilter(!finishFilter)}
        ChangeShop={() => setIncomeFilter(!incomeFilter)}
        ChangeBalance={() => setIncomeMFilter(!incomeMFIlter)}
        ListInfo={
          drawerType == "PeopleList"
            ? `${ListAfterFilter?.length}`
            : drawerType == "SpendsList"
              ? `${outcomeArrayList.length} | ${incomeArrayList.length}`
              : `${FinishedArrayList.length} / ${ListAfterFilter?.length}`
        }
      />
    </>
  );
}

export default CurrentList;
