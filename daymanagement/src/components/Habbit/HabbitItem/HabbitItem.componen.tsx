"use client";
import ListItem from "@/components/mainPage/ListSection/ListItem/ListItem.component";
import SelectHabbitListActivities from "@/lib/Hooks/Lists/Habbit/HabbitListActivities.component";
import UseHabbitList from "@/lib/Hooks/Lists/Habbit/UseHabbitList.component";
import { DayUnixFormat, DayUnixFormatNow } from "@/lib/Hooks/UseDayJS";
import { Thabbit } from "@/modules/habbitList/habbit.slice";

export const HabbitItem = ({ item }: { item: Thabbit }) => {
  const { CompleteItem, DelItem, SelectWithId } = SelectHabbitListActivities();
  const { selectedHabbit } = UseHabbitList();

  return (
    <ListItem
      isComplete={
        DayUnixFormat(+item.completeUpdate, "DD") == DayUnixFormatNow("DD")
      }
      drawerType="HabbitList"
      selectedID={selectedHabbit && selectedHabbit.id}
      SelectItem={() => SelectWithId(item.id)}
      DelItem={DelItem}
      CompleteItem={() => CompleteItem(item.id, item.title)}
      {...item}
    />
  );
};

export default HabbitItem;
