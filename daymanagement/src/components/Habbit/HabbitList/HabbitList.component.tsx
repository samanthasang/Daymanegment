"use client";
import EmptyList from "@/components/mainPage/EmptyList/EmptyList.component";
import ListContainer from "@/components/mainPage/ListContainer/ListContainer.component";
import UseHabbitList from "@/lib/Hooks/Lists/UseHabbitList.component";
import { Thabbit } from "@/modules/habbitList/habbit.slice";
import HabbitItem from "../HabbitItem/HabbitItem.componen";
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
function HabbitList() {
  const ListHabbit = UseHabbitList();

  return (
    <ListContainer
      listTitle="Habbits"
      ListInfo={`${
        ListHabbit?.filter(
          (todo) =>
            dayjs(dayjs.unix(Number(todo.completeUpdate))).format("DD") ==
            dayjs(dayjs.unix(Number(currentUnixTimestamp))).format("DD")
        ).length
      } / ${ListHabbit?.length}`}
      scrollOn={(ListHabbit && ListHabbit.length !== 0) || false}
    >
      {ListHabbit?.length == 0 ? (
        <EmptyList />
      ) : (
        ListHabbit?.map((li: Thabbit) => <HabbitItem key={li.id} item={li} />)
      )}
    </ListContainer>
  );
}

export default HabbitList;
