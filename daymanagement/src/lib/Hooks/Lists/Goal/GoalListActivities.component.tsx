"use client";
import { useAppDispatch } from "@/lib/hook";
import {
  completeGoalList,
  delGoalList,
  selectGoalList,
  setGoalList,
  TGoals,
  updateGoalList,
} from "@/modules/goalsList/goals.slice";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { DayUnixAdd, DayUnixDiff } from "../../UseDayJS";
import useGoalsList from "./UseGoalsList.component";

function GoalListActivities() {
  const dispatch = useAppDispatch();

  const { selectedGoal } = useGoalsList();

  const SelectItem = () => {
    dispatch(selectGoalList(""));
  };
  const SelectWithId = (id: string) => {
    dispatch(selectGoalList(id));
  };
  const DelItem = (id: string, title: string) => {
    dispatch(delGoalList(id));
    SelectItem();
    toast(`${title} is deleted`);
  };
  const CompleteItem = (id: string, title: string, score: number) => {
    dispatch(completeGoalList({ id, score }));
    id && selectedGoal && dispatch(selectGoalList(id));
    toast(`${title} is updated`);
  };
  const BringTodayItem = (item: TGoals) => {
    const oldDate = dayjs.unix(item.doDate);
    const now = dayjs();
    dispatch(
      updateGoalList({
        ...item,
        doDate: dayjs(
          new Date(
            now.year(),
            now.month(),
            now.date(),
            oldDate.hour(),
            oldDate.minute(),
            oldDate.second()
          )
        ).unix(),
        score: 0,
      })
    );
    item.id && selectedGoal && dispatch(selectGoalList(item.id));
    toast(`${item.title} is updated`);
  };
  const DuplicateTodayItem = (item: TGoals) => {
    const oldDate = dayjs.unix(item.doDate);
    const now = dayjs();
    dispatch(
      setGoalList({
        ...item,
        id: "",
        title: `${item.title} copy`,
        doDate: dayjs(
          new Date(
            now.year(),
            now.month(),
            now.date(),
            oldDate.hour(),
            oldDate.minute(),
            oldDate.second()
          )
        ).unix(),
      })
    );
    item.id && selectedGoal && dispatch(selectGoalList(item.id));
    toast(`${item.title} is updated`);
  };
  const AddDayToItem = (item: TGoals, day: number) => {
    dispatch(
      updateGoalList({
        ...item,
        doDate: DayUnixAdd(item.doDate, "day", day),
        score: DayUnixDiff(DayUnixAdd(item.doDate, "day", day), "day"),
      })
    );
    item.id && selectedGoal && dispatch(selectGoalList(item.id));
    toast(`${item.title} is updated`);
  };
  return {
    CompleteItem,
    DelItem,
    SelectWithId,
    SelectItem,
    BringTodayItem,
    DuplicateTodayItem,
    AddDayToItem,
  };
}

export default GoalListActivities;
