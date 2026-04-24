"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TInstallmentst } from "@/modules/installmentstList/installmentst.slice";
import { TShare } from "@/modules/share/share.slice";
import { FieldErrors } from "react-hook-form";
import { DrawerForms } from "./DrawerForms";

export function DrawerDesktop({
  open,
  onOpenChange,
  onSubmitFormHandler,
  drawerType,
  formType,
  children,
  installment,
  errors,
  onChangeinstallment,
  onChangeShare,
  removeShare,
  shareList,
}: {
  open: boolean;
  onOpenChange: (e: boolean) => void;
  onSubmitFormHandler: () => void;
  drawerType: string;
  onChangeinstallment?: (install: TInstallmentst) => void;
  onChangeShare?: (onChangeShare: TShare) => void;
  removeShare?: (id: string) => void;
  formType: string;
  children?: React.ReactNode;
  installment?: TInstallmentst[];
  shareList?: TShare[];
  errors?: FieldErrors<{
    title: string;
    description: string;
    installmentstList: {
      isComplete: boolean;
      date: string;
      payment: string;
    }[];
    priority: string;
    paymentNumber: string;
    numberOfPayment: string;
    paymentCompleteValue: string;
    category: string;
    tag: string;
    startDate: string;
    lastUpdate: string;
    completeUpdate: string;
  }>;
}) {
  return (
    <Dialog open={open} onOpenChange={(e) => onOpenChange(e)}>
      {children}
      <DialogContent className="max-w-[425px] sm:max-w-fit w-fit bg-secondary backdrop-filter p-3 gap-y-3 backdrop-blur-md rounded-2xl">
        <DialogHeader>
          <DialogTitle>{formType}</DialogTitle>
        </DialogHeader>
        <DrawerForms
          drawerType={drawerType}
          formType={formType}
          onSubmit={() => onOpenChange(false)}
          onSubmitForm={onSubmitFormHandler}
          installment={installment}
          shareList={shareList}
          errors={errors}
          onChangeinstallment={onChangeinstallment}
          onChangeShare={onChangeShare}
          removeShare={removeShare}
        />
      </DialogContent>
    </Dialog>
  );
}
