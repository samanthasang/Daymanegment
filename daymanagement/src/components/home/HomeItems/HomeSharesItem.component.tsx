"use client";
import MenuItems from "@/components/mainPage/MenuItems/HomeTodoItem.component";
import { useAppSelector } from "@/lib/hook";
import { TPeople } from "@/modules/people/PeopleList.slice";

function HomeShareItem({
  pathname,
  OpenMenu,
}: {
  pathname: string;
  OpenMenu: boolean;
}) {
  const People = useAppSelector((state) => state.PeopleList) || {};
  const ListPeople = People?.ListPeople as TPeople[];
  return (
    <MenuItems
      href={"/share"}
      tilte="Shares"
      className={pathname && pathname.startsWith("/share") ? "bg-primary" : ""}
      infoNumber={OpenMenu ? `${ListPeople && ListPeople.length}` : ""}
    />
  );
}

export default HomeShareItem;
