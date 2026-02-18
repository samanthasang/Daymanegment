"use client";
import UseHabbitList from "@/lib/Hooks/Lists/UseHabbitList.component";
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

function HomeHabbitItem() {
  const ListHabbit = UseHabbitList();

  return (
    <div className="w-full h-fit aspect-square cursor-pointer flex flex-col items-center justify-center border p-3 rounded-2xl border-white">
      <span>Habbit</span>
      <span>{`${
        ListHabbit?.filter(
          (todo) =>
            dayjs(dayjs.unix(Number(todo.completeUpdate))).format("DD") ==
            dayjs(dayjs.unix(Number(currentUnixTimestamp))).format("DD")
        ).length
      } / ${ListHabbit?.length}`}</span>
    </div>
  );
}

export default HomeHabbitItem;
