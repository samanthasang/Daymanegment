"use client";
import ListItem from "@/components/mainPage/listItem/ListItem.component";
import { useAppDispatch } from "@/lib/hook";
import SelectHabbitListActivities from "@/lib/Hooks/Lists/Habbit/HabbitListActivities.component";
import {
  delHabbitList,
  Thabbit
} from "@/modules/habbitList/habbit.slice";
import { setMyHabbitList } from "@/modules/myHabbitList/myHabbit.slice";
import dayjs from "dayjs";
import { useEffect } from "react";

const currentUnixTimestamp = dayjs().unix();

export const HabbitItem = ({
  item,
  selectedID,
}: {
  item: Thabbit;
  selectedID?: string;
}) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    item.score > 9 &&
      (dispatch(
        setMyHabbitList({
          id: item.id,
          title: item.title,
          description: item.description || "",
          score: item.score,
          priority: item.priority,
          lastUpdate: Math.floor(
            new Date(currentUnixTimestamp).getTime()
          ).toString(),
          completeUpdate: item
            ? item.completeUpdate
            : Math.floor(new Date(currentUnixTimestamp).getTime()).toString(),
          category: item.category,
          tag: item.tag,
        })
      ),
      dispatch(delHabbitList(item.id)));
  }, [item]);

  const { CompleteItemt, DelItem, SelectItem, SelectWithId } =
    SelectHabbitListActivities();

  return (
    <ListItem
      isComplete={
        dayjs(dayjs.unix(Number(item.completeUpdate))).format("DD") ==
        dayjs(dayjs.unix(Number(currentUnixTimestamp))).format("DD")
      }
      drawerType="HabbitList"
      formType="Edit Habbit"
      selectedID={selectedID}
      SelectItem={() => SelectWithId(item.id)}
      DelItem={DelItem}
      CompleteItemt={() => CompleteItemt(item.id, item.title)}
      {...item}
    />
  );
};

export default HabbitItem;
