"use client";
import ListItem from "@/components/mainPage/ListSection/ListItem/ListItem.component";
import SelectHabbitListActivities from "@/lib/Hooks/Lists/Habbit/HabbitListActivities.component";
import UseHabbitList from "@/lib/Hooks/Lists/Habbit/UseHabbitList.component";
import { Thabbit } from "@/modules/habbitList/habbit.slice";

export const HabbitItem = ({ item }: { item: Thabbit }) => {
  const { CompleteItem, DelItem, SelectWithId, PauseItem } =
    SelectHabbitListActivities();
  const { selectedHabbit } = UseHabbitList();

  return (
    <ListItem
      drawerType="Habbits"
      selectedID={selectedHabbit && selectedHabbit.id}
      SelectItem={() => SelectWithId(item.id)}
      DelItem={() => DelItem(item.id, item.title)}
      CompleteItem={() => CompleteItem(item.id, item.title)}
      UpdateItem={() => PauseItem(item.id, item.title)}
      {...item}
    />
  );
};

export default HabbitItem;
