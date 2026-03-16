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

function InstallmentsListActivities() {
  const dispatch = useAppDispatch();

  const Installments = useAppSelector((state) => state.InstallmentstList);

  const selectedselectedInstallments =
    Installments?.selectedInstallmentst as TInstallmentsts;

  const SelectItem = () => {
    dispatch(selectInstallmentstList(""));
  };
  const SelectWithId = (id: string) => {
    dispatch(selectInstallmentstList(id));
  };
  const DelItem = () => {
    dispatch(delInstallmentstList(selectedselectedInstallments.id));
    SelectItem();
    toast(`${selectedselectedInstallments.title} is deleted`);
  };
  const CompleteItemt = (id: string, title: string, lastUpdate: string) => {
    dispatch(completeInstallmentstList({ id: id, lastUpdate: lastUpdate }));
    id && selectedselectedInstallments && dispatch(selectInstallmentstList(id));
    toast(`${title} is updated`);
  };
  const CompleteItemInstallment = (id: string, title: string) => {
    dispatch(completeInstallmentst(id));
    id && selectedselectedInstallments && dispatch(selectInstallmentstList(id));
    toast(`${title} is updated`);
  };
  return {
    CompleteItemInstallment,
    CompleteItemt,
    DelItem,
    SelectWithId,
    SelectItem,
  };
}

export default InstallmentsListActivities;
