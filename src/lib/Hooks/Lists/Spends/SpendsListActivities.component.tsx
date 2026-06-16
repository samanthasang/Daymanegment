"use client";
import { useAppDispatch } from "@/lib/hook";
import {
  delSpendsList,
  selectSpendsList,
  setSpendsList,
  TSpends,
} from "@/modules/spends/spends.slice";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import useSpendsList from "./UseSpendsList.component";

function SpendsListActivities() {
  const dispatch = useAppDispatch();

  const { selectedSpends } = useSpendsList();

  const SelectItem = () => {
    dispatch(selectSpendsList(""));
  };
  const SelectWithId = (id: string) => {
    dispatch(selectSpendsList(id));
  };
  const DelItem = (id: string, title: string) => {
    dispatch(delSpendsList(id));
    SelectItem();
    toast(`${title} is deleted`);
  };
  const DuplicateTodayItem = (item: TSpends) => {
    const oldDate = dayjs.unix(item.doDate);
    const now = dayjs();
    dispatch(
      setSpendsList({
        ...item,
        id: "",
        title: `${item.title} copy`,
        doDate: dayjs(
          new Date(
            now.year(),
            now.month(),
            now.date(),
            oldDate.hour(),
            oldDate.minute(),
            oldDate.second()
          )
        ).unix(),
        numberOfProduct: item.numberOfProduct ?? "",
        priceOfProduct: item.priceOfProduct ?? "",
        incomeAmount: item.incomeAmount ?? "",
        income: item.income,
      })
    );
    item.id && selectedSpends && dispatch(selectSpendsList(item.id));
    toast(`${item.title} is updated`);
  };
  return { DelItem, SelectWithId, SelectItem, DuplicateTodayItem };
}

export default SpendsListActivities;
