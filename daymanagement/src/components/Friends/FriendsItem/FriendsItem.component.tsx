"use client";
import ListItem from "@/components/mainPage/ListSection/ListItem/ListItem.component";
import { useAppDispatch } from "@/lib/hook";
import usePeopleList from "@/lib/Hooks/Lists/Friends/UsePeopleList.component";
import useShareList from "@/lib/Hooks/Lists/Share/UseShareList.component";
import {
  delPeopleList,
  selectPeopleList,
  TPeople,
} from "@/modules/people/PeopleList.slice";
import { toast } from "react-toastify";

export const FriendsItem = ({
  item,
  hasShare = true,
}: {
  item: TPeople;
  hasShare?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const { selectedPeople } = usePeopleList();

  const { ListShareAll: ListShare } = useShareList();

  const total =
    ListShare &&
    ListShare?.filter((share) => share.peopleId == item.id).reduce(
      (acc, obj) => {
        if (obj.income && obj.incomeAmount) {
          return acc + +obj.incomeAmount;
        }
        if (!obj.income && obj.outcomeAmount) {
          return acc - +obj.outcomeAmount;
        }
        return acc;
      },
      0
    );
  const SelectList = () => {
    hasShare && dispatch(selectPeopleList(item.id));
  };
  const DelItem = () => {
    dispatch(delPeopleList(item.id));
    dispatch(selectPeopleList(""));
    toast(`${item.title} is deleted`);
  };
  return (
    <ListItem
      withDel={!hasShare}
      total={hasShare ? total : undefined}
      hasShare={hasShare}
      drawerType="Friends"
      selectedID={selectedPeople && selectedPeople.id}
      SelectItem={SelectList}
      DelItem={DelItem}
      {...item}
    />
  );
};

export default FriendsItem;
