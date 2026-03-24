"use client";
import SelectedItem from "@/components/mainPage/selectedItem/SelectedItem.component";
import SelectedMenuBottom from "@/components/mainPage/selectedItem/SelectedMenuBottom.component";
import { useAppSelector } from "@/lib/hook";
import SelectHabbitListActivities from "@/lib/Hooks/Lists/Habbit/HabbitListActivities.component";
import {
  Thabbit
} from "@/modules/habbitList/habbit.slice";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

const currentUnixTimestamp = dayjs().unix();

function SelectedHabbitList() {
  const Habbit = useAppSelector((state) => state.habbitList);

  const { CompleteItemt, DelItem, SelectItem } = SelectHabbitListActivities();

  const selectedHabbit = Habbit?.selectedhabbit as Thabbit;

  // const MoveToMyHabbit = (item: Thabbit) => {
  //   dispatch(
  //     setMyHabbitList({
  //       id: item.id,
  //       title: item.title,
  //       description: item.description || "",
  //       score: item.score + 1,
  //       priority: item.priority,
  //       lastUpdate: Math.floor(
  //         new Date(currentUnixTimestamp).getTime()
  //       ).toString(),
  //       completeUpdate: item
  //         ? item.completeUpdate
  //         : Math.floor(new Date(currentUnixTimestamp).getTime()).toString(),
  //       category: item.category,
  //       tag: item.tag,
  //     })
  //   );
  //   dispatch(delHabbitList(item.id));
  // };
  return (
    <div className="flex flex-col w-full flex-1 bg-secondary rounded-2xl relative">
      <SelectedItem
        CompleteItemt={() =>
          CompleteItemt(selectedHabbit.id, selectedHabbit.title)
        }
        isComplete={
          dayjs(dayjs.unix(Number(selectedHabbit.completeUpdate))).format(
            "DD"
          ) == dayjs(dayjs.unix(Number(currentUnixTimestamp))).format("DD")
        }
        drawerType="HabbitList"
        {...selectedHabbit}
      />
      <SelectedMenuBottom
        CompleteItemt={() =>
          CompleteItemt(selectedHabbit.id, selectedHabbit.title)
        }
        DelItem={DelItem}
        SelectItem={SelectItem}
        drawerType="HabbitList"
        formType="Edit Habbit"
        selectedIsComplete={
          dayjs(dayjs.unix(Number(selectedHabbit.completeUpdate))).format(
            "DD"
          ) == dayjs(dayjs.unix(Number(currentUnixTimestamp))).format("DD")
        }
      />
    </div>
  );
}

export default SelectedHabbitList;
