"use client";
import IncomeFilter from "@/lib/Hooks/Filters/IncomeFilter.componen";
import IncomeMFilter from "@/lib/Hooks/Filters/IncomeMFilter.componen";
import { TSpends } from "@/modules/spends/spends.slice";
import IncomeArray from "@/lib/Hooks/ListInfo/IncomeArray.componen";
import OutcomeArray from "@/lib/Hooks/ListInfo/outcomeArray.componet";
import ListContent from "./ListContainer/ListContent.component";
import ListMenuBottom from "./ListMenu/ListMenuBottom.component";
import { Suspense } from "react";
import ListDetails from "./ListDetails.component";

function ListCurrentSpends({
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
  const incomeArrayList: TSpends[] = IncomeArray(List);
  const outcomeArrayList: TSpends[] = OutcomeArray(List);

  const { incomeArray, incomeFilter, setIncomeFilter } = IncomeFilter([
    ...List,
  ]);

  const { incomeMArray, incomeMFIlter, setIncomeMFilter } = IncomeMFilter([
    ...incomeArray,
  ]);

  return (
    <>
      <ListContent ListCount={incomeMArray.length}>
        <Suspense>
          <ListDetails List={incomeMArray as []} drawerType={drawerType} />
        </Suspense>
      </ListContent>
      <ListMenuBottom
        listTitle={listTitle}
        drawerType={drawerType}
        formType={formType}
        shopFilter={!incomeFilter}
        balanceFilter={!incomeMFIlter}
        withShop
        withBalance
        ChangeShop={() => setIncomeFilter(!incomeFilter)}
        ChangeBalance={() => setIncomeMFilter(!incomeMFIlter)}
        ListInfo={`${outcomeArrayList.length} | ${incomeArrayList.length}`}
      />
    </>
  );
}

export default ListCurrentSpends;
