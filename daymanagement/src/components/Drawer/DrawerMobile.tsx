"use client";

import * as React from "react";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/Drawer";
import { TInstallmentst } from "@/modules/installmentstList/installmentst.slice";
import { TShare } from "@/modules/share/share.slice";
import { FieldErrors } from "react-hook-form";
import { DrawerForms } from "./DrawerForms";

export function DrawerMobile({
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
  onSubmitForm?: () => void;
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
    <Drawer open={open} onOpenChange={(e) => onOpenChange(e)}>
      {children}
      <DrawerContent className="sm:max-w-full w-full bg-secondary backdrop-filter backdrop-blur-md px-3 gap-y-3">
        <DrawerHeader className="text-left">
          <DrawerTitle>{formType}</DrawerTitle>
        </DrawerHeader>
        {formType == "Info" ? (
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
        ) : (
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
        )}
        {/* <DrawerFooter className="pt-2">
          <div className="felx flex-row gap-y-2 justify-between items-center">
            <DrawerClose asChild className="flex-1">
              <Button className="w-1/2" variant="outline">
                Cancel
              </Button>
            </DrawerClose>
            <DrawerClose asChild className="flex-1">
              <Button className="w-1/2" variant="outline">
                Cancel
              </Button>
            </DrawerClose>
          </div>
        </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  );
}
