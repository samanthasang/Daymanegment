"use client";
import { useAppDispatch } from "@/lib/hook";
import {
  delSpendsList,
  selectSpendsList,
  setSpendsList,
  TSpends,
} from "@/modules/spends/spends.slice";
import { toast } from "react-toastify";
import { currentUnixTimestamp } from "../../UseDayJS";
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
    dispatch(
      setSpendsList({
        ...item,
        id: "",
        title: `${item.title} copy`,
        doDate: currentUnixTimestamp,
        createDate: currentUnixTimestamp,
        numberOfProduct: item.numberOfProduct ?? "0",
        priceOfProduct: item.priceOfProduct ?? "0",
        incomeAmount: item.incomeAmount ?? "0",
        income: item.income,
      })
    );
    item.id && selectedSpends && dispatch(selectSpendsList(item.id));
    toast(`${item.title} is updated`);
  };
  return { DelItem, SelectWithId, SelectItem, DuplicateTodayItem };
}

export default SpendsListActivities;
