"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { TInstallmentst } from "@/modules/installmentstList/installmentst.slice";
import { TShare } from "@/modules/share/share.slice";
import { FieldErrors } from "react-hook-form";
import CategoryForm from "../Category/CategoryForm";
import FilterComponent from "../Filter/FilterComponent";
import FormGoals from "../Goals/AddGoals/FormGoal";
import FormHabbit from "../Habbit/AddHabbit/FormHabbit";
import FormInstallments from "../Installments/AddInstallments/FormInstallments";
import FormInstallmentsDetailsList from "../Installments/InstallmentsList/installmentsDetailsList.components";
import ListMenuButtons from "../mainPage/ListContainer/ListMenuButtons.component";
import MenuMainSideBarComponent from "../mainPage/MenuSideBar/MainMenuSideBar.component";
import PeopleForm from "../People/PeopleForm";
import FormReminder from "../Reminder/AddReminder/FormReminder";
import FormShare from "../Share/[peopleId]/AddShare/FormShare";
import ShareDetailsList from "../Share/[peopleId]/AddShare/ShareDetailsList.components";
import FormSpends from "../Spends/AddSpends/FormSpends";
import TagForm from "../Tags/TagForm";
import FormTimer from "../Timer/AddTimer/FormTimer";
import FormTodo from "../Todo/AddTodo/FormTodo";
import FormVisits from "../Visits/AddVisit/FormVisit";

export function DrawerDialogDemo({
  drawerType,
  formType,
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
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const openDrawer = (e: boolean) => {
    setOpen(e);
  };
  const onSubmitFormHandler = () => {
    onSubmitForm && onSubmitForm();
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={(e) => openDrawer(e)}>
        {children}
        <DialogContent className="max-w-[425px] sm:max-w-fit w-fit bg-secondary backdrop-filter p-4 gap-y-4 backdrop-blur-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>{formType}</DialogTitle>
          </DialogHeader>
          <ProfileForm
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
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={(e) => openDrawer(e)}>
      {children}
      <DrawerContent className="sm:max-w-full w-full bg-secondary backdrop-filter backdrop-blur-md px-3 gap-y-3">
        <DrawerHeader className="text-left">
          <DrawerTitle>{formType}</DrawerTitle>
        </DrawerHeader>
        <ProfileForm
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

function ProfileForm({
  drawerType,
  formType,
  className,
  onSubmit,
  onSubmitForm,
  installment,
  errors,
  onChangeinstallment,
  onChangeShare,
  removeShare,
  shareList,
}: {
  drawerType: string;
  formType: string;
  className?: React.ComponentProps<"form">;
  onSubmit: () => void;
  onSubmitForm: () => void;
  onChangeinstallment?: (install: TInstallmentst) => void;
  onChangeShare?: (onChangeShare: TShare) => void;
  removeShare?: (id: string) => void;
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
  switch (drawerType) {
    case "BootomList":
      return <ListMenuButtons />;
    case "MenuList":
      return <MenuMainSideBarComponent />;
    case "FilterList":
      return <FilterComponent witDate />;
    case "ReminderList":
      return <FormReminder formType={formType} onSubmitForm={onSubmit} />;
    case "TodoList":
      return <FormTodo formType={formType} onSubmitForm={onSubmit} />;
    case "HabbitList":
      return <FormHabbit formType={formType} onSubmitForm={onSubmit} />;
    case "CategoryList":
      return <CategoryForm onSubmitForm={onSubmit} />;
    case "TagList":
      return <TagForm onSubmitForm={onSubmit} />;
    case "PeopleList":
      return <PeopleForm formType={formType} onSubmitForm={onSubmit} />;
    case "TimerList":
      return <FormTimer formType={formType} onSubmitForm={onSubmit} />;
    case "SpendsList":
      return <FormSpends formType={formType} onSubmitForm={onSubmit} />;
    case "InstallmentsList":
      return <FormInstallments formType={formType} onSubmitForm={onSubmit} />;
    case "VisitsList":
      return <FormVisits formType={formType} onSubmitForm={onSubmit} />;
    case "GoalsList":
      return <FormGoals formType={formType} onSubmitForm={onSubmit} />;
    case "ShareList":
      return <FormShare formType={formType} onSubmitForm={onSubmit} />;
    case "InstallmentsListDetails":
      return (
        onSubmitForm &&
        installment &&
        errors &&
        onChangeinstallment && (
          <FormInstallmentsDetailsList
            onSubmitForm={onSubmitForm}
            installment={installment}
            errors={errors}
            onChangeinstallment={onChangeinstallment}
          />
        )
      );
    case "ShareListDetails":
      return (
        onSubmitForm &&
        shareList &&
        errors &&
        onChangeShare &&
        removeShare && (
          <ShareDetailsList
            onSubmitForm={onSubmitForm}
            shareList={shareList}
            errors={errors}
            onChangeShare={onChangeShare}
            removeShare={removeShare}
          />
        )
      );

    default:
      return (
        <form className={cn("grid items-start gap-6", className)}>
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" defaultValue="shadcn@example.com" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue="@shadcn" />
          </div>
          <Button type="submit" variant="default">
            Save changes
          </Button>
        </form>
      );
      break;
  }
}
