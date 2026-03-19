"use client";
import ListItem from "@/components/mainPage/listItem/ListItem.component";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { setHabbitList, Thabbit } from "@/modules/habbitList/habbit.slice";
import {
  completeMyHabbitList,
  delMyHabbitList,
  selectMyHabbitList,
  updateMyHabbitList,
} from "@/modules/myHabbitList/myHabbit.slice";
import dayjs from "dayjs";
import { useEffect } from "react";
import { toast } from "react-toastify";

const currentUnixTimestamp = dayjs().unix();

export const MyHabbitItem = ({
  item,
  selectedID,
}: {
  item: Thabbit;
  selectedID?: string;
}) => {
  const dispatch = useAppDispatch();

  const SelectHabbitList = () => {
    dispatch(selectMyHabbitList(item.id));
  };
  const DelHabbitList = () => {
    dispatch(delMyHabbitList(item.id));
    toast(`${item.title} is deleted`);
  };
  const CompleteHabbitList = () => {
    dispatch(completeMyHabbitList(item.id));
    dayjs(dayjs.unix(Number(item.completeUpdate))).format("DD") ==
    dayjs(dayjs.unix(Number(currentUnixTimestamp))).format("DD")
      ? toast(`${item.title} is uncompleted`)
      : toast(`${item.title} is completed`);
  };
  const {
    ListHabbit,
  }: {
    ListHabbit: Thabbit[];
  } = useAppSelector((state) => state.habbitList) || [];

  useEffect(() => {
    if (
      dayjs
        .unix(currentUnixTimestamp)
        .diff(dayjs.unix(Number(item.lastUpdate)), "day") > 2
    ) {
      dispatch(
        updateMyHabbitList({
          id: item.id,
          title: item.title,
          description: item.description,
          score:
            item.score -
            dayjs
              .unix(currentUnixTimestamp)
              .diff(dayjs.unix(Number(item.lastUpdate)), "day"),
          priority: item.priority,
          lastUpdate: Math.floor(
            new Date(currentUnixTimestamp).getTime()
          ).toString(),
          completeUpdate: item.completeUpdate,
          category: item.category,
          tag: item.tag,
        })
      );
    }
    if (item.score < 10) {
      ListHabbit.filter((list) => list.id == item.id).length == 0 &&
        dispatch(
          setHabbitList({
            id: item.id,
            title: item.title,
            description: item.description,
            score: 9,
            priority: item.priority,
            lastUpdate: Math.floor(
              new Date(currentUnixTimestamp).getTime()
            ).toString(),
            completeUpdate: Math.floor(
              new Date(currentUnixTimestamp).getTime()
            ).toString(),
            category: item.category,
            tag: item.tag,
          })
        );
      dispatch(delMyHabbitList(item.id));
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
      drawerType="MyHabbitList"
      formType="Edit Habbit"
      selectedID={selectedID}
      SelectItem={SelectHabbitList}
      DelItem={DelHabbitList}
      CompleteItemt={CompleteHabbitList}
      withDel={true}
    />
  );
};

export default MyHabbitItem;
