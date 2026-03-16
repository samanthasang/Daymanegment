"use client";
import MenuItems from "@/components/mainPage/MenuItems/HomeTodoItem.component";
import UseHabbitList from "@/lib/Hooks/Lists/Habbit/UseHabbitList.component";
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

function HomeHabbitItem({
  pathname,
  OpenMenu,
}: {
  pathname: string;
  OpenMenu: boolean;
}) {
  const ListHabbit = UseHabbitList();

  return (
    <MenuItems
      href={"/habbit"}
      tilte="Habbit"
      className={pathname && pathname.startsWith("/habbit") ? "bg-primary" : ""}
      infoNumber={
        OpenMenu
          ? `${
              ListHabbit?.filter(
                (todo) =>
                  dayjs(dayjs.unix(Number(todo.completeUpdate))).format("DD") ==
                  dayjs(dayjs.unix(Number(currentUnixTimestamp))).format("DD")
              ).length
            } / ${ListHabbit?.length}`
          : ""
      }
    />
  );
}

export default HomeHabbitItem;
