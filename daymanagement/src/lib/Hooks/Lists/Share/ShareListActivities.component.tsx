"use client";
import { useAppDispatch } from "@/lib/hook";
import { delShareList, selectShareList } from "@/modules/share/share.slice";
import { toast } from "react-toastify";
import useShareList from "./UseShareList.component";

function ShareListActivities() {
  const dispatch = useAppDispatch();

  const { selectedShare } = useShareList();

  const SelectItem = () => {
    dispatch(selectShareList(""));
  };
  const SelectWithId = (id: string) => {
    dispatch(selectShareList(id));
  };
  const DelItem = (id: string, title: string) => {
    dispatch(delShareList(id));
    SelectItem();
    toast(`${title} is deleted`);
  };
  const CompleteItem = (id: string, title: string) => {
    // dispatch(completeShareList(id));
    id && selectedShare && dispatch(selectShareList(id));
    toast(`${title} is updated`);
  };
  return { CompleteItem, DelItem, SelectWithId, SelectItem };
}

export default ShareListActivities;
