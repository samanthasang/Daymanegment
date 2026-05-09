"use client";
import ListItem from "@/components/mainPage/ListSection/ListItem/ListItem.component";
import { useAppDispatch } from "@/lib/hook";
import InstallmentsListActivities from "@/lib/Hooks/Lists/Installments/InstallmentsListActivities.component";
import useInstallmentsList from "@/lib/Hooks/Lists/Installments/UseInstallmentsList.component";
import { DayUnixDiff } from "@/lib/Hooks/UseDayJS";
import {
  TInstallmentsts,
  updateInstallmentstList,
} from "@/modules/installmentstList/installmentst.slice";
import { useEffect } from "react";

export const InstallmentsItem = ({ item }: { item: TInstallmentsts }) => {
  const dispatch = useAppDispatch();
  const { CompleteItem, DelItem, SelectWithId } = InstallmentsListActivities();

  const { selectedInstallmentstList } = useInstallmentsList();

  useEffect(() => {
    item.isComplete &&
      DayUnixDiff(item.doDate, "day") < 6 &&
      dispatch(updateInstallmentstList({ ...item, isComplete: false }));
  }, []);
  // const instalmentNotComplete =
  //   item.installmentstList &&
  //   item.installmentstList.filter((ins) => !ins.isComplete);

  // const lastInstalment =
  //   (item.installmentstList &&
  //     item.installmentstList.length > 0 &&
  //     item.installmentstList[item.installmentstList.length - 1].doDate) ||
  //   item.completeUpdate;

  // const firstNOtComplete =
  //   instalmentNotComplete && instalmentNotComplete?.length > 0
  //     ? instalmentNotComplete[0].doDate
  //     : lastInstalment;

  // const secondNOtComplete =
  //   instalmentNotComplete && instalmentNotComplete?.length > 0
  //     ? instalmentNotComplete[1].doDate
  //     : lastInstalment;

  return (
    <ListItem
      date={item.doDate}
      drawerType="Installments"
      selectedID={selectedInstallmentstList && selectedInstallmentstList.id}
      SelectItem={() => SelectWithId(item.id)}
      DelItem={() =>
        DelItem(selectedInstallmentstList.id, selectedInstallmentstList.title)
      }
      CompleteItem={() =>
        CompleteItem(
          selectedInstallmentstList.id,
          selectedInstallmentstList.title
        )
      }
      {...item}
    />
  );
};

export default InstallmentsItem;
