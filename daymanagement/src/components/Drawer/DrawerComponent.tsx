"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/Drawer";
import useMediaQueryValues from "@/lib/Hooks/useMediaQuery";
import { TInstallmentst } from "@/modules/installmentstList/installmentst.slice";
import { TShare } from "@/modules/share/share.slice";
import { useState } from "react";
import { FieldErrors } from "react-hook-form";
import { DrawerForms } from "./DrawerForms";
import { DrawerIcon } from "./DrawerIcon";
import { DrawerInfos } from "./DrawerInfos";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";
import { useAppSelector } from "@/lib/hook";

export function DrawerDialogDemo({
  drawerType,
  formType,
  drawerTitle,
  children,
  onSubmitForm,
  installment,
  errors,
  onChangeinstallment,
  onChangeShare,
  removeShare,
  shareList,
}: {
  drawerType: string;
  onChangeinstallment?: (install: TInstallmentst) => void;
  onChangeShare?: (onChangeShare: TShare) => void;
  removeShare?: (id: string) => void;
  formType: string;
  drawerTitle: string;
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
  const [open, setOpen] = useState(false);
  const { isMDMin } = useMediaQueryValues();

  const { lang } = useAppSelector((state) => state.Menu);
  const t: any = UseLangComponent("Drawer");

  const openDrawer = (e: boolean) => {
    setOpen(e);
  };
  const onSubmitFormHandler = () => {
    onSubmitForm && onSubmitForm();
  };
  const translateTitle = () => {
    switch (drawerType) {
      case "Todos":
        return t.titleTodos;
      case "Spends":
        return t.titleSpends;
      case "Habits":
        return t.titleHabits;
      case "Goals":
        return t.titleGoals;
      case "Visits":
        return t.titleVisits;
      case "Installments":
        return t.titleInstallments;
      case "Reminders":
        return t.titleReminders;
      case "Timers":
        return t.titleTimers;
      case "Friends":
        return t.titleFriends;
      case "Shares":
        return t.titleShares;
      case "BootomsList":
        return t.titleBootomsList;
      case "MenuList":
        return t.titleMenuList;
      case "FilterList":
        return t.titleFilterList;

      default:
        return t.titleTodos;
    }
  };
  console.log(translateTitle());

  if (isMDMin) {
    return (
      <Dialog open={open} onOpenChange={(e) => openDrawer(e)}>
        {children}
        <DialogContent
          dir={lang == "en" ? "ltr" : "rtl"}
          className="max-w-[425px] sm:max-w-fit w-fit bg-secondary backdrop-filter p-3 gap-y-3 backdrop-blur-md rounded-2xl"
        >
          <DialogHeader>
            <div className="flex justify-start items-center gap-x-1">
              <DrawerIcon formType={formType} />
              <DialogTitle>
                {formType != "Info"
                  ? formType != "Edit"
                    ? t.Add
                    : t.edit
                  : t.info}
                {formType == "Info" ? translateTitle() : t[`${drawerTitle}`]}
              </DialogTitle>
            </div>
          </DialogHeader>
          {formType == "Info" ? (
            <DrawerInfos drawerType={drawerType} />
          ) : (
            <DrawerForms
              drawerType={drawerType}
              formType={formType}
              onSubmit={() => openDrawer(false)}
              onSubmitForm={onSubmitFormHandler}
              installment={installment}
              shareList={shareList}
              errors={errors}
              onChangeinstallment={onChangeinstallment}
              onChangeShare={onChangeShare}
              removeShare={removeShare}
            />
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={(e) => openDrawer(e)}>
      {children}
      <DrawerContent className="sm:max-w-full w-full bg-secondary backdrop-filter backdrop-blur-md p-3 pt-0 gap-y-3">
        <DrawerHeader className="text-left">
          <div className="flex justify-center items-center gap-x-1">
            <DrawerIcon formType={formType} />
            <DrawerTitle>
              {formType != "Info"
                ? formType != "Edit"
                  ? "Add "
                  : "Edit "
                : "Info "}
              {formType == "Info" ? drawerType : drawerTitle}
            </DrawerTitle>{" "}
          </div>
        </DrawerHeader>
        <DrawerForms
          drawerType={drawerType}
          formType={formType}
          onSubmit={() => openDrawer(false)}
          onSubmitForm={onSubmitFormHandler}
          installment={installment}
          shareList={shareList}
          errors={errors}
          onChangeinstallment={onChangeinstallment}
          onChangeShare={onChangeShare}
          removeShare={removeShare}
        />
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
