"use client";
import MenuItems from "@/components/mainPage/MenuItems/MenuItems.component";
import UseHabbitList from "@/lib/Hooks/Lists/Habbit/UseHabbitList.component";
import { DayUnixFormat, DayUnixFormatNow } from "@/lib/Hooks/UseDayJS";

function HomeHabbitItem() {
  const { ListMyHabbit } = UseHabbitList();

  return (
    <MenuItems
      href={"/habbit"}
      tilte="Habbit"
      infoNumber={`${
        ListMyHabbit?.filter(
          (todo) =>
            DayUnixFormat(+todo.completeUpdate, "DD") == DayUnixFormatNow("DD")
        ).length
      } / ${ListMyHabbit?.length}`}
    />
  );
}

export default HomeHabbitItem;
