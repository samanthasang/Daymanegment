"use client";
import ListItem from "@/components/mainPage/ListSection/ListItem/ListItem.component";
import { useAppDispatch } from "@/lib/hook";
import SelectHabbitListActivities from "@/lib/Hooks/Lists/Habbit/HabbitListActivities.component";
import UseHabbitList from "@/lib/Hooks/Lists/Habbit/UseHabbitList.component";
import { currentUnixTimestamp, DayUnixDiff } from "@/lib/Hooks/UseDayJS";
import { Thabbit, updateHabbitList } from "@/modules/habbitList/habbit.slice";
import { useEffect } from "react";

export const HabbitItem = ({ item }: { item: Thabbit }) => {
  const dispatch = useAppDispatch();
  const { CompleteItem, DelItem, SelectWithId } = SelectHabbitListActivities();
  const { selectedHabbit } = UseHabbitList();
  useEffect(() => {
    DayUnixDiff(item.lastUpdate, "day") < -1 &&
      dispatch(
        updateHabbitList({
          id: item.id,
          title: item.title,
          description: item.description || "",
          priority: item.priority,
          createDate: item.createDate,
          lastUpdate: currentUnixTimestamp,
          score: item.score + DayUnixDiff(item.lastUpdate, "day"),
          category: item.category,
          tag: item.tag,
          isComplete: false,
        })
      );
  }, []);

  return (
    <ListItem
      drawerType="Habbits"
      selectedID={selectedHabbit && selectedHabbit.id}
      SelectItem={() => SelectWithId(item.id)}
      DelItem={DelItem}
      CompleteItem={() => CompleteItem(item.id, item.title)}
      {...item}
    />
  );
};

export default HabbitItem;
