"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import {
  delSpendsList,
  selectSpendsList,
  TSpends,
} from "@/modules/spends/spends.slice";
import { toast } from "react-toastify";

function SpendsListActivities() {
  const dispatch = useAppDispatch();

  const Spend = useAppSelector((state) => state.SpendsList);

  const selectedhabbit = Spend?.selectedSpends as TSpends;

  const SelectItem = () => {
    dispatch(selectSpendsList(""));
  };
  const SelectWithId = (id: string) => {
    dispatch(selectSpendsList(id));
  };
  const DelItem = () => {
    dispatch(delSpendsList(selectedhabbit.id));
    SelectItem();
    toast(`${selectedhabbit.title} is deleted`);
  };
  return { DelItem, SelectWithId, SelectItem };
}

export default SpendsListActivities;
