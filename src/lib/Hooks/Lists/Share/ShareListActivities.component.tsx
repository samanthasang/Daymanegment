"use client";
import { useAppDispatch } from "@/lib/hook";
import {
  delShareList,
  selectShareList,
  setShareList,
  TShare,
} from "@/modules/share/share.slice";
import dayjs from "dayjs";
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
  const DuplicateTodayItem = (item: TShare) => {
      const oldDate = dayjs.unix(item.doDate);
      const now = dayjs();
    dispatch(
      setShareList({
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
      })
    );
    item.id && selectedShare && dispatch(selectShareList(item.id));
    toast(`${item.title} is updated`);
  };
  return { DuplicateTodayItem, DelItem, SelectWithId, SelectItem };
}

export default ShareListActivities;
