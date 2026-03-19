"use client";
import EmptyList from "@/components/mainPage/EmptyList/EmptyList.component";
import ListMenuBottom from "@/components/mainPage/ListContainer/ListMenuBottom.component";
import DateOrderFilter from "@/lib/Hooks/DateOrderFilter.component";
import IncomeFilter from "@/lib/Hooks/IncomeFilter.componen";
import IncomeMFilter from "@/lib/Hooks/IncomeMFilter.componen";
import { cn } from "@/lib/utils";
import { TSpends } from "@/modules/spends/spends.slice";
import SpendsItem from "../SpendsItem/SpendsItem.component";

function SpendsListCurrent({
  ListSpends,
  selectedID,
}: {
  ListSpends: TSpends[];
  selectedID: string;
  }) {
  
  const { dateOrderArray, dateOrderFilter } = DateOrderFilter(ListSpends);

  const { incomeArray, incomeFIlter, setIncomeFilter } =
    dateOrderArray && dateOrderFilter
      ? IncomeFilter([...dateOrderArray] as any)
      : ([...dateOrderArray] as any);

  const { incomeMArray, incomeMFIlter, setIncomeMFilter } =
    incomeArray && incomeFIlter
      ? IncomeMFilter([...incomeArray] as any)
      : IncomeMFilter([...ListSpends] as any);

  return (
    <>
      <div
        className={cn(
          "flex flex-col h-full gap-y-1",
          (ListSpends && ListSpends.length !== 0) || false
            ? "scroll-m-0 overflow-y-scroll"
            : ""
        )}
      >
        {incomeMArray?.length == 0 ? (
          <EmptyList />
        ) : (
          incomeMArray?.map((li: TSpends) => (
            <SpendsItem key={li.id} item={li} selectedID={selectedID} />
          ))
        )}
      </div>
      <ListMenuBottom
        listTitle="Spends"
        drawerType="SpendsList"
        formType="Add Spends"
        selectedID={!!selectedID}
        priorityFilter={!incomeFIlter}
        dateFIlter={!incomeMFIlter}
        withpriority
        withdate
        ChangePriority={() => setIncomeFilter(!incomeFIlter)}
        ChangeDate={() => setIncomeMFilter(!incomeMFIlter)}
        ListInfo={`${incomeMArray?.filter((spends) => spends.income == true).length} | ${incomeMArray?.filter((spends) => spends.income != true).length}`}
      />
    </>
  );
}

export default SpendsListCurrent;
