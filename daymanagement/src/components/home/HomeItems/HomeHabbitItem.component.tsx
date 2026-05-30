"use client";
import MenuItems from "@/components/mainPage/Page/MenuItems/MenuItems.component";
import FinishedArray from "@/lib/Hooks/ListInfo/FinishedArray.componen";
import UseHabbitList from "@/lib/Hooks/Lists/Habbit/UseHabbitList.component";

function HomeHabbitItem() {
  const { ListHabbitAll } = UseHabbitList();

  return (
    <MenuItems
      href={"/habbits"}
      title="Habbits"
      infoNumber={`${FinishedArray(ListHabbitAll).length} / ${ListHabbitAll?.length}`}
    />
  );
}

export default HomeHabbitItem;
