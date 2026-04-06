"use client";
import MenuItems from "@/components/mainPage/MenuItems/MenuItems.component";
import useSpendsList from "@/lib/Hooks/Lists/Spends/UseSpendsList.component";

function HomeSpendsItem() {
  const { ListSpendsFiltered } = useSpendsList();

  return (
    <MenuItems
      href={"/spends"}
      tilte="Spends"
      infoNumber={`${ListSpendsFiltered?.filter((spends) => spends.income == true).length} | ${ListSpendsFiltered?.filter((spends) => spends.income != true).length}`}
    />
  );
}

export default HomeSpendsItem;
