"use client";
import ListItem from "@/components/mainPage/listItem/ListItem.component";
import SpendsListActivities from "@/lib/Hooks/Lists/Spends/SpendsListActivities.component";
import { TSpends } from "@/modules/spends/spends.slice";

export const SpendsItem = ({
  item,
  selectedID,
}: {
  item: TSpends;
  selectedID?: string;
}) => {
  const { DelItem, SelectWithId } = SpendsListActivities();

  return (
    <ListItem
      id={item.id}
      title={item.title}
      category={item.category}
      tag={item.tag}
      date={item.date}
      incomeAmount={item.incomeAmount}
      numberOfProduct={item.numberOfProduct}
      priceOfProduct={item.priceOfProduct}
      drawerType="SpendsList"
      formType="Add Todo"
      selectedID={selectedID}
      SelectItem={() => SelectWithId(item.id)}
      DelItem={DelItem}
    />
  );
};

export default SpendsItem;
