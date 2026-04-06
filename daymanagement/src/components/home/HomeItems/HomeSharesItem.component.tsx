"use client";
import MenuItems from "@/components/mainPage/MenuItems/MenuItems.component";
import usePeopleList from "@/lib/Hooks/Lists/Share/UsePeopleList.component";

function HomeShareItem() {
  const { ListPeople } = usePeopleList();
  
  return (
    <MenuItems
      href={"/friends"}
      tilte="Friends"
      infoNumber={`${ListPeople && ListPeople.length}`}
    />
  );
}

export default HomeShareItem;
