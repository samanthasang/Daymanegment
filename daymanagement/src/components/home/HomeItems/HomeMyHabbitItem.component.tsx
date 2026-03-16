"use client";
import MenuItems from "@/components/mainPage/MenuItems/HomeTodoItem.component";
import UseMyHabbitList from "@/lib/Hooks/Lists/MyHabbit/UseMyHabbitList.component";
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

function HomeMyHabbitItem({
  pathname,
  OpenMenu,
}: {
  pathname: string;
  OpenMenu: boolean;
}) {
  const ListMyHabbit = UseMyHabbitList();

  return (
    <MenuItems
      href={"/myhabbit"}
      tilte="MyHabbit"
      className={
        pathname && pathname.startsWith("/myhabbit") ? "bg-primary" : ""
      }
      infoNumber={
        OpenMenu
          ? `${
              ListMyHabbit?.filter(
                (todo) =>
                  dayjs(dayjs.unix(Number(todo.completeUpdate))).format("DD") ==
                  dayjs(dayjs.unix(Number(currentUnixTimestamp))).format("DD")
              ).length
            } / ${ListMyHabbit?.length}`
          : ""
      }
    />
  );
}

export default HomeMyHabbitItem;
