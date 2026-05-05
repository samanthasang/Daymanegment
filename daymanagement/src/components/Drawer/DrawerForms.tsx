"use client";

import * as React from "react";

import { Label } from "@/components/ui/label";
import { TInstallmentst } from "@/modules/installmentstList/installmentst.slice";
import { TShare } from "@/modules/share/share.slice";
import { FieldErrors } from "react-hook-form";
import CategoryForm from "../Category/CategoryForm";
import FilterComponent from "../Filter/FilterComponent";
import FormGoals from "../Goals/AddGoals/FormGoal";
import FormHabbit from "../Habbit/AddHabbit/FormHabbit";
import FormInstallments from "../Installments/AddInstallments/FormInstallments";
import FormInstallmentsDetailsList from "../Installments/InstallmentsList/installmentsDetailsList.components";
import ListMenuButtons from "../mainPage/ListSection/ListMenu/ListMenuButtons.component";
import MenuMainSideBarComponent from "../mainPage/Page/MenuSideBar/MainMenuSideBar.component";
import PeopleForm from "../Friends/AddFriends/FriendsForm";
import FormReminder from "../Reminder/AddReminder/FormReminder";
import FormShare from "../Share/AddShare/FormShare";
import ShareDetailsList from "../Share/AddShare/ShareDetailsList.components";
import FormSpends from "../Spends/AddSpends/FormSpends";
import TagForm from "../Tags/TagForm";
import FormTimer from "../Timer/AddTimer/FormTimer";
import FormTodo from "../Todo/AddTodo/FormTodo";
import FormVisits from "../Visits/AddVisit/FormVisit";

export function DrawerForms({
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
    case "Reminders":
      return <FormReminder formType={formType} onSubmitForm={onSubmit} />;
    case "Todos":
      return <FormTodo formType={formType} onSubmitForm={onSubmit} />;
    case "Habbits":
      return <FormHabbit formType={formType} onSubmitForm={onSubmit} />;
    case "CategoryList":
      return <CategoryForm onSubmitForm={onSubmit} />;
    case "TagList":
      return <TagForm onSubmitForm={onSubmit} />;
    case "Friends":
      return <PeopleForm formType={formType} onSubmitForm={onSubmit} />;
    case "Timers":
      return <FormTimer formType={formType} onSubmitForm={onSubmit} />;
    case "Spends":
      return <FormSpends formType={formType} onSubmitForm={onSubmit} />;
    case "Installments":
      return <FormInstallments formType={formType} onSubmitForm={onSubmit} />;
    case "Visits":
      return <FormVisits formType={formType} onSubmitForm={onSubmit} />;
    case "Goals":
      return <FormGoals formType={formType} onSubmitForm={onSubmit} />;
    case "Shares":
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
        <div className="w-full flex justify-center items-center p-4 text-white">
          <Label>Somthing Went Wrong</Label>
        </div>
      );
  }
}
