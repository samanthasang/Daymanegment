"use client";
import EmptyList from "@/components/mainPage/EmptyList/EmptyList.component";
import ListContainer from "@/components/mainPage/ListContainer/ListContainer.component";
import ListMenuBottom from "@/components/mainPage/ListContainer/ListMenuBottom.component";
import ListItem from "@/components/mainPage/listItem/ListItem.component";
import SelectedItem from "@/components/mainPage/selectedItem/SelectedItem.component";
import SelectedMenuBottom from "@/components/mainPage/selectedItem/SelectedMenuBottom.component";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import ComplateFIlter from "@/lib/Hooks/ComplateFIlter.component";
import SelectHabbitListActivities from "@/lib/Hooks/Lists/Habbit/HabbitListActivities.component";
import UseHabbitList from "@/lib/Hooks/Lists/Habbit/UseHabbitList.component";
import PriorityFilter from "@/lib/Hooks/PriorityFilter.component";
import { cn } from "@/lib/utils";
import {
  delHabbitList,
  selectHabbitList,
  Thabbit,
} from "@/modules/habbitList/habbit.slice";
import { setMyHabbitList } from "@/modules/myHabbitList/myHabbit.slice";
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

function HabbitList() {
  const dispatch = useAppDispatch();

  const ListHabbit = UseHabbitList();
  const Habbit = useAppSelector((state) => state.habbitList);

  const { CompleteItemt, DelItem, SelectItem, SelectWithId } =
    SelectHabbitListActivities();

  const { priorityArray, priorityFilter, setPriorityFilter } = PriorityFilter(
    ListHabbit as any
  );

  const { complateArray, complateFIlter, setcomplateFIlter } =
    priorityArray && priorityFilter
      ? ComplateFIlter([...priorityArray] as any)
      : ComplateFIlter([...ListHabbit] as any);

  const selectedHabbit = Habbit?.selectedhabbit as Thabbit;

  useEffect(() => {
    ListHabbit.length == 0 && dispatch(selectHabbitList(""));
  }, [ListHabbit]);

  const MoveToMyHabbit = (item: Thabbit) => {
    dispatch(
      setMyHabbitList({
        id: item.id,
        title: item.title,
        description: item.description || "",
        score: item.score + 1,
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
    );
    dispatch(delHabbitList(item.id));
  };
  return (
    <div className="flex flex-row gap-x-3 flex-1 w-full mx-auto">
      <ListContainer listTitle="Habbits" selectedID={!!selectedHabbit}>
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
                CompleteItemt={() =>
                  li.score > 9
                    ? MoveToMyHabbit(li)
                    : CompleteItemt(li.id, li.title)
                }
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
          selectedID={!!selectedHabbit}
          priorityFilter={priorityFilter}
          complateFIlter={complateFIlter}
          withpriority
          withcomplate
          ChangeComplate={() => setcomplateFIlter(!complateFIlter)}
          ChangePriority={() => setPriorityFilter(!priorityFilter)}
          ListInfo={`${
            ListHabbit?.filter(
              (todo) =>
                dayjs(dayjs.unix(Number(todo.completeUpdate))).format("DD") ==
                dayjs(dayjs.unix(Number(currentUnixTimestamp))).format("DD")
            ).length
          } / ${ListHabbit?.length}`}
        />
      </ListContainer>
      {selectedHabbit && (
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
      )}
    </div>
  );
}

export default HabbitList;
