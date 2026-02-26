"use client";
import UseMyHabbitList from "@/lib/Hooks/Lists/UseMyHabbitList.component";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import Link from "next/link";

dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

const currentUnixTimestamp = dayjs().unix();

function HomeMyHabbitItem() {
  const ListMyHabbit = UseMyHabbitList();

  return (
    <Link
      href={"/myhabbit"}
      className="w-full h-fit aspect-square cursor-pointer flex flex-col items-center justify-center border p-3 rounded-2xl border-white"
    >
      <span>MyHabbit</span>
      <span>{`${
        ListMyHabbit?.filter(
          (todo) =>
            dayjs(dayjs.unix(Number(todo.completeUpdate))).format("DD") ==
            dayjs(dayjs.unix(Number(currentUnixTimestamp))).format("DD")
        ).length
      } / ${ListMyHabbit?.length}`}</span>
    </Link>
  );
}

export default HomeMyHabbitItem;
