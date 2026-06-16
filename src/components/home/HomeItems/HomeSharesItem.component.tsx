"use client";
import MenuItems from "@/components/mainPage/Page/MenuItems/MenuItems.component";
import useShareList from "@/lib/Hooks/Lists/Share/UseShareList.component";

function HomeFriendsItem() {
  const { ListShareFriends } = useShareList();

  return (
    <MenuItems
      href={"/shares"}
      title="Shares"
      infoNumber={`${ListShareFriends && ListShareFriends.length}`}
    />
  );
}

export default HomeFriendsItem;
