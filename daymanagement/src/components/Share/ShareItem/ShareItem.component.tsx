"use client";
import ListItem from "@/components/mainPage/ListSection/ListItem/ListItem.component";
import ShareListActivities from "@/lib/Hooks/Lists/Share/ShareListActivities.component";
import useShareList from "@/lib/Hooks/Lists/Share/UseShareList.component";
import { TShare } from "@/modules/share/share.slice";

export const ShareItem = ({ item }: { item: TShare }) => {
  const { selectedShare } = useShareList();
  const { DelItem, SelectWithId } = ShareListActivities();

  return (
    <ListItem
      date={item.doDate}
      drawerType="ShareList"
      selectedID={selectedShare && selectedShare.id}
      SelectItem={() => SelectWithId(item.id)}
      DelItem={DelItem}
      {...item}
    />
  );
};

export default ShareItem;
