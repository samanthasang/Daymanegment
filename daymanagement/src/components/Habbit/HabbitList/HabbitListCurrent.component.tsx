"use client";
import EmptyList from "@/components/mainPage/EmptyList/EmptyList.component";
import ListMenuBottom from "@/components/mainPage/ListContainer/ListMenuBottom.component";
import ListItem from "@/components/mainPage/listItem/ListItem.component";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import ComplateFIlter from "@/lib/Hooks/ComplateFIlter.component";
import FinishedFIlter from "@/lib/Hooks/FinishedFIlter.componen";
import SelectHabbitListActivities from "@/lib/Hooks/Lists/Habbit/HabbitListActivities.component";
import UseHabbitList from "@/lib/Hooks/Lists/Habbit/UseHabbitList.component";
import PriorityFilter from "@/lib/Hooks/PriorityFilter.component";
import ScoreFIlter from "@/lib/Hooks/ScoreFIlter.componet";
import { cn } from "@/lib/utils";
import { selectHabbitList, Thabbit } from "@/modules/habbitList/habbit.slice";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useEffect } from "react";

dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

const currentUnixTimestamp = dayjs().unix();

function HabbitListCurrent({
  ListHabbit,
  selectedID,
}: {
  ListHabbit: Thabbit[];
  selectedID: string;
}) {
  const { CompleteItemt, DelItem, SelectWithId } = SelectHabbitListActivities();

  const { scoreArray, scoreFilter } = ScoreFIlter(ListHabbit);

  const { finishArray, finishFIlter, setFinishFIlter } = scoreFilter
    ? FinishedFIlter([...scoreArray] as any)
    : ([...ListHabbit] as any);

  const { priorityArray, priorityFilter, setPriorityFilter } =
    finishArray && finishFIlter
      ? PriorityFilter([...finishArray] as any)
      : PriorityFilter([...scoreArray] as any);

  const { complateArray, complateFIlter, setcomplateFIlter } =
    priorityArray && priorityFilter
      ? ComplateFIlter([...priorityArray] as any)
      : ComplateFIlter([...finishArray] as any);

  return (
    <>
      <div
        className={cn(
          "flex flex-col h-full gap-y-2",
          (ListHabbit && ListHabbit.length !== 0) || false
            ? "scroll-m-0 overflow-y-scroll"
            : ""
        )}
      >
        {complateArray?.length == 0 ? (
          <EmptyList />
        ) : (
          complateArray?.map((li: Thabbit) => (
            <ListItem
              key={li.id}
              drawerType="HabbitList"
              formType="Edit Habbit"
              SelectItem={() => SelectWithId(li.id)}
              DelItem={DelItem}
              CompleteItemt={() => CompleteItemt(li.id, li.title)}
              isComplete={
                dayjs(dayjs.unix(Number(li.completeUpdate))).format("DD") ==
                dayjs(dayjs.unix(Number(currentUnixTimestamp))).format("DD")
              }
              {...li}
            />
          ))
        )}
      </div>
      <ListMenuBottom
        listTitle="Habbits"
        drawerType="HabbitList"
        formType="Add Habbit"
        selectedID={!!selectedID}
        priorityFilter={priorityFilter}
        complateFIlter={complateFIlter}
        dateFIlter={!finishFIlter}
        withpriority
        withcomplate
        withdate
        ChangeComplate={() => setcomplateFIlter(!complateFIlter)}
        ChangePriority={() => setPriorityFilter(!priorityFilter)}
        ChangeDate={() => setFinishFIlter(!finishFIlter)}
        ListInfo={`${
          ListHabbit?.filter(
            (todo) =>
              dayjs(dayjs.unix(Number(todo.completeUpdate))).format("DD") ==
              dayjs(dayjs.unix(Number(currentUnixTimestamp))).format("DD")
          ).length
        } / ${ListHabbit?.length}`}
      />
    </>
  );
}

export default HabbitListCurrent;
