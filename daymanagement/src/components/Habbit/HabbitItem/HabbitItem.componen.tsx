"use client";
import ListItem from "@/components/mainPage/listItem/ListItem.component";
import { useAppDispatch } from "@/lib/hook";
import {
  completeHabbitList,
  delHabbitList,
  selectHabbitList,
  Thabbit,
  updateHabbitList,
} from "@/modules/habbitList/habbit.slice";
import { setMyHabbitList } from "@/modules/myHabbitList/myHabbit.slice";
import dayjs from "dayjs";
import { useEffect } from "react";
import { toast } from "react-toastify";

const currentUnixTimestamp = dayjs().unix();

export const HabbitItem = ({ item }: { item: Thabbit }) => {
  const dispatch = useAppDispatch();

  const SelectHabbitList = () => {
    dispatch(selectHabbitList(item.id));
  };
  const DelHabbitList = () => {
    dispatch(delHabbitList(item.id));
    toast(`${item.title} is deleted`);
  };
  const CompleteHabbitList = () => {
    dispatch(completeHabbitList(item.id));
    dayjs(dayjs.unix(Number(item.completeUpdate))).format("DD") ==
    dayjs(dayjs.unix(Number(currentUnixTimestamp))).format("DD")
      ? toast(`${item.title} is uncompleted`)
      : toast(`${item.title} is completed`);
  };

  useEffect(() => {
    if (
      dayjs
        .unix(currentUnixTimestamp)
        .diff(dayjs.unix(item.lastUpdate), "day") > 2
    ) {
      dispatch(
        updateHabbitList({
          id: item.id || "",
          title: item.title,
          description: item.description,
          score:
            item.score -
            dayjs
              .unix(currentUnixTimestamp)
              .diff(dayjs.unix(item.lastUpdate), "day"),
          priority: item.priority,
          lastUpdate: currentUnixTimestamp,
          completeUpdate: item.completeUpdate,
          category: item.category,
          tag: item.tag,
        })
      );
    }
    if (item.score == 10) {
      dispatch(
        setMyHabbitList({
          id: item.id || "",
          title: item.title,
          description: item.description,
          score: item.score,
          priority: item.priority,
          lastUpdate: currentUnixTimestamp,
          completeUpdate: item.completeUpdate,
          category: item.category,
          tag: item.tag,
        })
      );
      dayjs(dayjs.unix(Number(item.completeUpdate))).format("DD") ==
      dayjs(dayjs.unix(Number(currentUnixTimestamp))).format("DD")
        ? toast(`${item.title} is uncompleted`)
        : toast(`${item.title} is completed`);
      dispatch(delHabbitList(item.id));
    }
  }, []);

  return (
    <ListItem
      id={item.id}
      priority={item.priority}
      title={item.title}
      category={item.category}
      tag={item.tag}
      isComplete={
        dayjs(dayjs.unix(Number(item.completeUpdate))).format("DD") ==
        dayjs(dayjs.unix(Number(currentUnixTimestamp))).format("DD")
      }
      score={item.score}
      drawerType="HabbitList"
      formType="Edit Habbit"
      SelectItem={SelectHabbitList}
      DelItem={DelHabbitList}
      CompleteItemt={CompleteHabbitList}
    />
  );
};

export default HabbitItem;
