"use client";
import MenuItems from "@/components/mainPage/Page/MenuItems/MenuItems.component";
import IncomeArray from "@/lib/Hooks/ListInfo/IncomeArray.componen";
import OutcomeArray from "@/lib/Hooks/ListInfo/outcomeArray.componet";
import useSpendsList from "@/lib/Hooks/Lists/Spends/UseSpendsList.component";

function HomeSpendsItem() {
  const { ListSpendsFiltered } = useSpendsList();

  return (
    <MenuItems
      href={"/transactions"}
      title="Transactions"
      infoNumber={`${IncomeArray(ListSpendsFiltered).length} | ${OutcomeArray(ListSpendsFiltered).length}`}
    />
  );
}

export default HomeSpendsItem;
