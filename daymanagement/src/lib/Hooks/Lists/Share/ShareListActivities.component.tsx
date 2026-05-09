"use client";
import { useAppDispatch } from "@/lib/hook";
import {
  delShareList,
  selectShareList,
  setShareList,
  TShare,
} from "@/modules/share/share.slice";
import { toast } from "react-toastify";
import useShareList from "./UseShareList.component";
import { currentUnixTimestamp } from "../../UseDayJS";

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
  const DuplicateTodayItem = (item: TShare) => {
    dispatch(
      setShareList({
        ...item,
        id: "",
        title: `${item.title} copy`,
        doDate: currentUnixTimestamp,
        createDate: currentUnixTimestamp,
      })
    );
    item.id && selectedShare && dispatch(selectShareList(item.id));
    toast(`${item.title} is updated`);
  };
  return { DuplicateTodayItem, DelItem, SelectWithId, SelectItem };
}

export default ShareListActivities;
