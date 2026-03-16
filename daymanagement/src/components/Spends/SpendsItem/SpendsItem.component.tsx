"use client";
import ListItem from "@/components/mainPage/listItem/ListItem.component";
import { useAppDispatch } from "@/lib/hook";
import {
  delSpendsList,
  selectSpendsList,
  TSpends,
} from "@/modules/spends/spends.slice";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { toast } from "react-toastify";
dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

export const SpendsItem = ({
  item,
  selectedID,
}: {
  item: TSpends;
  selectedID?: string;
}) => {
  const dispatch = useAppDispatch();

  const SelectToDoList = () => {
    dispatch(selectSpendsList(item.id));
  };
  const DelToDoList = () => {
    dispatch(delSpendsList(item.id));
    toast(`${item.title} is deleted`);
  };
  const CompleteToDoList = () => {
    toast(`${item.title} is completed`);
  };

  return (
    <ListItem
      id={item.id}
      title={item.title}
      category={item.category}
      tag={item.tag}
      date={item.date}
      incomeAmount={item.incomeAmount}
      numberOfProduct={item.numberOfProduct}
      priceOfProduct={item.priceOfProduct}
      drawerType="SpendsList"
      formType="Add Todo"
      selectedID={selectedID}
      SelectItem={SelectToDoList}
      DelItem={DelToDoList}
      CompleteItemt={CompleteToDoList}
    />
  );
};

export default SpendsItem;
