"use client";
import ListItem from "@/components/mainPage/ListSection/ListItem/ListItem.component";
import SpendsListActivities from "@/lib/Hooks/Lists/Spends/SpendsListActivities.component";
import useSpendsList from "@/lib/Hooks/Lists/Spends/UseSpendsList.component";
import { TSpends } from "@/modules/spends/spends.slice";

export const SpendsItem = ({ item }: { item: TSpends }) => {
  const { DelItem, SelectWithId } = SpendsListActivities();
  const { selectedSpends } = useSpendsList();

  return (
    <ListItem
      date={item.doDate}
      incomeAmount={item.incomeAmount}
      priceOfProduct={item.priceOfProduct}
      drawerType="SpendsList"
      selectedID={selectedSpends && selectedSpends.id}
      SelectItem={() => SelectWithId(item.id)}
      DelItem={DelItem}
      {...item}
    />
  );
};

export default SpendsItem;
