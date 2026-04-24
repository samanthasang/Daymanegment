"use client";
import ListItem from "@/components/mainPage/ListSection/ListItem/ListItem.component";
import { useAppDispatch } from "@/lib/hook";
import SelectHabbitListActivities from "@/lib/Hooks/Lists/Habbit/HabbitListActivities.component";
import UseHabbitList from "@/lib/Hooks/Lists/Habbit/UseHabbitList.component";
import { DayUnixDiff } from "@/lib/Hooks/UseDayJS";
import { Thabbit, updateHabbitList } from "@/modules/habbitList/habbit.slice";
import { useEffect } from "react";

export const HabbitItem = ({ item }: { item: Thabbit }) => {
  const dispatch = useAppDispatch();
  const { CompleteItem, DelItem, SelectWithId } = SelectHabbitListActivities();
  const { selectedHabbit } = UseHabbitList();
  useEffect(() => {
    DayUnixDiff(+item.lastUpdate, "day") > 2 &&
      dispatch(
        updateHabbitList({
          id: item.id,
          title: item.title,
          description: item.description || "",
          priority: item.priority,
          createDate: item.createDate,
          lastUpdate: item.lastUpdate,
          score: item.score - 1,
          category: item.category,
          tag: item.tag,
        })
      );
  }, []);
  return (
    <ListItem
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
