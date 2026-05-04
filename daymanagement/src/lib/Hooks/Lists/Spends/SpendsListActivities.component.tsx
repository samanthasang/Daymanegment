"use client";
import { useAppDispatch } from "@/lib/hook";
import {
  delSpendsList,
  selectSpendsList
} from "@/modules/spends/spends.slice";
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
  const DelItem = () => {
    dispatch(delSpendsList(selectedSpends.id));
    SelectItem();
    toast(`${selectedSpends.title} is deleted`);
  };
  return { DelItem, SelectWithId, SelectItem };
}

export default SpendsListActivities;
