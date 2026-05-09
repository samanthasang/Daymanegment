"use client";
import ListItem from "@/components/mainPage/ListSection/ListItem/ListItem.component";
import { useAppDispatch } from "@/lib/hook";
import SelectHabbitListActivities from "@/lib/Hooks/Lists/Habbit/HabbitListActivities.component";
import UseHabbitList from "@/lib/Hooks/Lists/Habbit/UseHabbitList.component";
import { currentUnixTimestampZero, DayUnixDiff } from "@/lib/Hooks/UseDayJS";
import { Thabbit, updateHabbitList } from "@/modules/habbitList/habbit.slice";
import { useEffect } from "react";

export const HabbitItem = ({ item }: { item: Thabbit }) => {
  const dispatch = useAppDispatch();
  const { CompleteItem, DelItem, SelectWithId, PauseItem } =
    SelectHabbitListActivities();
  const { selectedHabbit } = UseHabbitList();
  useEffect(() => {
    item.isPause
      ? dispatch(
          updateHabbitList({
            ...item,
            lastUpdate: currentUnixTimestampZero,
          })
        )
      : DayUnixDiff(item.lastUpdate, "day") < -1 &&
        dispatch(
          updateHabbitList({
            ...item,
            lastUpdate: currentUnixTimestampZero,
            score: item.score + DayUnixDiff(item.lastUpdate, "day"),
            isComplete: false,
          })
        );
  }, []);

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
