"use client";
import EmptyList from "@/components/mainPage/EmptyList/EmptyList.component";
import ListContainer from "@/components/mainPage/ListContainer/ListContainer.component";
import ListMenuBottom from "@/components/mainPage/ListContainer/ListMenuBottom.component";
import SelectedItem from "@/components/mainPage/selectedItem/SelectedItem.component";
import SelectedMenuBottom from "@/components/mainPage/selectedItem/SelectedMenuBottom.component";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import ComplateFIlter from "@/lib/Hooks/ComplateFIlter.component";
import MyHabbitListActivities from "@/lib/Hooks/Lists/MyHabbit/MyHabbitListActivities.component";
import UseMyHabbitList from "@/lib/Hooks/Lists/MyHabbit/UseMyHabbitList.component";
import PriorityFilter from "@/lib/Hooks/PriorityFilter.component";
import { cn } from "@/lib/utils";
import { Thabbit } from "@/modules/habbitList/habbit.slice";
import {
  selectMyHabbitList
} from "@/modules/myHabbitList/myHabbit.slice";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useEffect } from "react";
import MyHabbitItem from "../MyHabbitItem/MyHabbitItem.componen";

dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

const currentUnixTimestamp = dayjs().unix();

function MyHabbitList() {
  const dispatch = useAppDispatch();

  const ListMyHabbit = UseMyHabbitList();

  const Habbit = useAppSelector((state) => state.MYhabbitList);

  const { CompleteItemt, DelItem, SelectItem, SelectWithId } =
    MyHabbitListActivities();

  const { priorityArray, priorityFilter, setPriorityFilter } = PriorityFilter(
    ListMyHabbit as any
  );

  const { complateArray, complateFIlter, setcomplateFIlter } =
    priorityArray && priorityFilter
      ? ComplateFIlter([...priorityArray] as any)
      : ComplateFIlter([...ListMyHabbit] as any);

  const selectedMyHabbit = Habbit?.selectedMyHabbit as Thabbit;

  useEffect(() => {
    ListMyHabbit.length == 0 && dispatch(selectMyHabbitList(""));
  }, [ListMyHabbit]);

  return (
    <div className="flex flex-row gap-x-3 flex-1 w-full mx-auto">
      <ListContainer listTitle="My Habbits" selectedID={!!selectedMyHabbit}>
        <div
          className={cn(
            "flex flex-col h-full gap-y-2",
            (ListMyHabbit && ListMyHabbit.length !== 0) || false
              ? "scroll-m-0 overflow-y-scroll"
              : ""
          )}
        >
          {complateArray?.length == 0 ? (
            <EmptyList />
          ) : (
            ListMyHabbit?.map((li: Thabbit) => (
              <MyHbbitItem key={li.id} item={li} />
            ))
          )}
        </div>
        <ListMenuBottom
          listTitle="My Habbits"
          drawerType="MyHabbitList"
          formType="Edit Habbit"
          selectedID={!!selectedMyHabbit}
          priorityFilter={priorityFilter}
          complateFIlter={complateFIlter}
          withpriority
          withcomplate
          ChangeComplate={() => setcomplateFIlter(!complateFIlter)}
          ChangePriority={() => setPriorityFilter(!priorityFilter)}
          ListInfo={`${
            ListMyHabbit?.filter(
              (todo) =>
                dayjs(dayjs.unix(Number(todo.completeUpdate))).format("DD") ==
                dayjs(dayjs.unix(Number(currentUnixTimestamp))).format("DD")
            ).length
          } / ${ListMyHabbit?.length}`}
        />
      </ListContainer>
      {selectedMyHabbit && (
        <div className="flex flex-col w-full flex-1 bg-secondary rounded-2xl relative">
          <SelectedItem
            CompleteItemt={() =>
              CompleteItemt(selectedMyHabbit.id, selectedMyHabbit.title)
            }
            drawerType="MyHabbitList"
            isComplete={
              dayjs(dayjs.unix(Number(selectedMyHabbit.completeUpdate))).format(
                "DD"
              ) == dayjs(dayjs.unix(Number(currentUnixTimestamp))).format("DD")
            }
            {...selectedMyHabbit}
          />
          <SelectedMenuBottom
            CompleteItemt={() =>
              CompleteItemt(selectedMyHabbit.id, selectedMyHabbit.title)
            }
            DelItem={DelItem}
            SelectItem={SelectItem}
            drawerType="MyHabbitList"
            formType="Edit MyHabbit"
            selectedIsComplete={
              dayjs(dayjs.unix(Number(selectedMyHabbit.completeUpdate))).format(
                "DD"
              ) == dayjs(dayjs.unix(Number(currentUnixTimestamp))).format("DD")
            }
          />
        </div>
      )}
    </div>
  );
}

export default MyHabbitList;
