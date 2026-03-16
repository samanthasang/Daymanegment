"use client";
import MenuItems from "@/components/mainPage/MenuItems/HomeTodoItem.component";
import useSpendsList from "@/lib/Hooks/Lists/Spends/UseSpendsList.component";

function HomeSpendsItem({
  pathname,
  OpenMenu,
}: {
  pathname: string;
  OpenMenu: boolean;
}) {
  const ListSpends = useSpendsList();

  return (
    <MenuItems
      href={"/spends"}
      tilte="Spends"
      className={pathname && pathname.startsWith("/spends") ? "bg-primary" : ""}
      infoNumber={
        OpenMenu
          ? `${ListSpends?.filter((spends) => spends.income == true).length} | ${ListSpends?.filter((spends) => spends.income != true).length}`
          : ""
      }
    />
  );
}

export default HomeSpendsItem;
