"use client";
import EmptyList from "@/components/mainPage/EmptyList/EmptyList.component";
import ListContainer from "@/components/mainPage/ListContainer/ListContainer.component";
import UseMyHabbitList from "@/lib/Hooks/Lists/UseMyHabbitList.component";
import { Thabbit } from "@/modules/habbitList/habbit.slice";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import MyHabbitItem from "../MyHabbitItem/MyHabbitItem.componen";

dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

const currentUnixTimestamp = dayjs().unix();

function MyHabbitList() {
  const ListMyHabbit = UseMyHabbitList();

  return (
    <ListContainer
      listTitle="Habbits"
      ListInfo={`${
        ListMyHabbit?.filter(
          (todo) =>
            dayjs(dayjs.unix(Number(todo.completeUpdate))).format("DD") ==
            dayjs(dayjs.unix(Number(currentUnixTimestamp))).format("DD")
        ).length
      } / ${ListMyHabbit?.length}`}
      scrollOn={(ListMyHabbit && ListMyHabbit.length !== 0) || false}
    >
      {ListMyHabbit?.length == 0 ? (
        <EmptyList />
      ) : (
        ListMyHabbit?.map((li: Thabbit) => (
          <MyHabbitItem key={li.id} item={li} />
        ))
      )}
    </ListContainer>
  );
}

export default MyHabbitList;
