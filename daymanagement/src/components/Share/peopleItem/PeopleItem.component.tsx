"use client";
import ListItem from "@/components/mainPage/listItem/ListItem.component";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import {
  delPeopleList,
  selectPeopleList,
  TPeople,
} from "@/modules/people/PeopleList.slice";
import { TShare } from "@/modules/share/share.slice";
import { toast } from "react-toastify";

export const PeopleItem = ({
  item,
  selectedID,
  hasShare = false,
}: {
  item: TPeople;
  selectedID?: string;
  hasShare?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const {
    ListShare,
  }: {
    ListShare: TShare[];
  } = useAppSelector((state) => state.ShareList) || {};

  const total = ListShare?.filter((share) => share.peopleId == item.id).reduce(
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
      id={item.id}
      title={item.title}
      withDel={!hasShare}
      total={hasShare ? total : undefined}
      hasShare={hasShare}
      drawerType="PeopleList"
      formType={`Edit ${item.title}`}
      selectedID={selectedID}
      SelectItem={SelectList}
      DelItem={DelItem}
    />
  );
};

export default PeopleItem;
