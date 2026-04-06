"use client";
import ListContent from "@/components/mainPage/ListContainer/ListContent.component";
import ListMenuBottom from "@/components/mainPage/ListContainer/ListMenuBottom.component";
import DateOrderFilter from "@/lib/Hooks/ListFilter/DateOrderFilter.component";
import IncomeFilter from "@/lib/Hooks/Filters/IncomeFilter.componen";
import IncomeMFilter from "@/lib/Hooks/Filters/IncomeMFilter.componen";
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

  const { incomeArray, incomeFilter, setIncomeFilter } =
    dateOrderArray && dateOrderFilter
      ? IncomeFilter([...dateOrderArray] as any)
      : IncomeFilter([...ListSpends] as any);

  const { incomeMArray, incomeMFIlter, setIncomeMFilter } =
    incomeArray && incomeFilter
      ? IncomeMFilter([...incomeArray] as any)
      : IncomeMFilter([...ListSpends] as any);

  return (
    <>
      <ListContent ListCount={incomeMArray.length}>
        {incomeMArray?.map((li: TSpends) => (
          <SpendsItem key={li.id} item={li} selectedID={selectedID} />
        ))}
      </ListContent>
      <ListMenuBottom
        listTitle="Spends"
        drawerType="SpendsList"
        formType="Add Spends"
        selectedID={!!selectedID}
        shopFilter={!incomeFilter}
        balanceFilter={!incomeMFIlter}
        withShop
        withBalance
        ChangeShop={() => setIncomeFilter(!incomeFilter)}
        ChangeBalance={() => setIncomeMFilter(!incomeMFIlter)}
        ListInfo={`${incomeMArray?.filter((spends) => spends.income == true).length} | ${incomeMArray?.filter((spends) => spends.income != true).length}`}
      />
    </>
  );
}

export default SpendsListCurrent;
