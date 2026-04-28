"use client";
import MenuItems from "@/components/mainPage/Page/MenuItems/MenuItems.component";
import usePeopleList from "@/lib/Hooks/Lists/Friends/UsePeopleList.component";

function HomeFriendsItem() {
  const { ListPeople } = usePeopleList();

  return (
    <MenuItems
      href={"/friends"}
      tilte="Friends"
      infoNumber={`${ListPeople && ListPeople.length}`}
    />
  );
}

export default HomeFriendsItem;
