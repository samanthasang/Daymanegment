"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import {
  completeInstallmentst,
  completeInstallmentstList,
  delInstallmentstList,
  selectInstallmentstList,
  TInstallmentsts,
} from "@/modules/installmentstList/installmentst.slice";

import { toast } from "react-toastify";
import useInstallmentsList from "./UseInstallmentsList.component";

function InstallmentsListActivities() {
  const dispatch = useAppDispatch();

  const { selectedInstallmentstList } = useInstallmentsList();

  const SelectItem = () => {
    dispatch(selectInstallmentstList(""));
  };
  const SelectWithId = (id: string) => {
    dispatch(selectInstallmentstList(id));
  };
  const DelItem = () => {
    dispatch(delInstallmentstList(selectedInstallmentstList.id));
    SelectItem();
    toast(`${selectedInstallmentstList.title} is deleted`);
  };
  const CompleteItem = (
    id: string,
    title: string,
    lastUpdate: number,
    nexeDate: number
  ) => {
    dispatch(
      completeInstallmentstList({
        id: id,
        lastUpdate: lastUpdate,
        doDate: nexeDate,
      })
    );
    id && selectedInstallmentstList && dispatch(selectInstallmentstList(id));
    toast(`${title} is updated`);
  };
  const CompleteItemInstallment = (id: string, title: string) => {
    dispatch(completeInstallmentst(id));
    id && selectedInstallmentstList && dispatch(selectInstallmentstList(id));
    toast(`${title} is updated`);
  };
  return {
    CompleteItemInstallment,
    CompleteItem,
    DelItem,
    SelectWithId,
    SelectItem,
  };
}

export default InstallmentsListActivities;
