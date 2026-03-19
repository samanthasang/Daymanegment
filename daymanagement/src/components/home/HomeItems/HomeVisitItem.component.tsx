"use client";
import MenuItems from "@/components/mainPage/MenuItems/HomeTodoItem.component";
import useVisitList from "@/lib/Hooks/Lists/Visit/UseVisitList.component";

function HomeVisitItem({
  pathname,
  OpenMenu,
}: {
  pathname: string;
  OpenMenu: boolean;
}) {
  const ListVisit = useVisitList();

  return (
    <MenuItems
      href={"/visits"}
      tilte="Visits"
      className={pathname && pathname.startsWith("/visits") ? "bg-primary" : ""}
      infoNumber={
        OpenMenu
          ? `${ListVisit?.filter((item) => item.isComplete == true).length} / ${ListVisit && ListVisit.length}`
          : ""
      }
    />
  );
}

export default HomeVisitItem;
