"use client";
import ListItem from "@/components/mainPage/listItem/ListItem.component";
import { useAppDispatch } from "@/lib/hook";
import {
  completeGoalList,
  delGoalList,
  selectGoalList,
  TGoals,
} from "@/modules/goalsList/goals.slice";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { toast } from "react-toastify";
dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

const currentUnixTimestamp = dayjs().unix();

export const GoalsItem = ({
  item,
  selectedID,
}: {
  item: TGoals;
  selectedID?: string;
}) => {
  const dispatch = useAppDispatch();

  const SelectGoalList = () => {
    dispatch(selectGoalList(item.id));
  };
  const DelGoalList = () => {
    dispatch(delGoalList(item.id));
    toast(`${item.title} is deleted`);
  };
  const CompleteGoalList = () => {
    dispatch(
      completeGoalList({
        id: item.id,
        score: dayjs
          .unix(+item.date)
          .diff(dayjs.unix(currentUnixTimestamp), "day"),
      })
    );
    item.isComplete
      ? toast(`${item.title} is uncompleted`)
      : toast(`${item.title} is completed`);
  };
  return (
    <ListItem
      id={item.id}
      priority={item.priority}
      title={item.title}
      category={item.category}
      tag={item.tag}
      isComplete={item.isComplete}
      date={item.date}
      score={
        dayjs.unix(+item.date).diff(dayjs.unix(currentUnixTimestamp), "day") + 1
      }
      drawerType="GoalsList"
      formType="Edit Goals"
      selectedID={selectedID}
      SelectItem={SelectGoalList}
      DelItem={DelGoalList}
      CompleteItemt={CompleteGoalList}
    />
  );
};

export default GoalsItem;
