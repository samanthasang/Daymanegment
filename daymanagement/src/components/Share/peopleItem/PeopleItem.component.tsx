"use client";
import ListItem from "@/components/mainPage/listItem/ListItem.component";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { selectPeopleList, TPeople } from "@/modules/people/PeopleList.slice";
import { TShare } from "@/modules/share/share.slice";

export const PeopleItem = ({
  item,
  selectedID,
}: {
  item: TPeople;
  selectedID?: string;
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
    dispatch(selectPeopleList(item.id));
  };
  return (
    <ListItem
      id={item.id}
      title={item.title}
      total={total}
      drawerType="PeopleList"
      formType="Edit People"
      selectedID={selectedID}
      SelectItem={SelectList}
    />
  );
};

export default PeopleItem;
