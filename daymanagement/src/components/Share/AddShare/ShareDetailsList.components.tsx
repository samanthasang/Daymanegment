"use client";
import { Button } from "@/components/ui/button";
import { TShare } from "@/modules/share/share.slice";
import { FieldErrors } from "react-hook-form";
import FormShareDetails from "./FormShareDetails";
import { nanoid } from "@reduxjs/toolkit";

export default function ShareDetailsList({
  onSubmitForm,
  shareList,
  errors,
  onChangeShare,
  removeShare,
}: {
  onSubmitForm: () => void;
  shareList?: TShare[];
  onChangeShare: (install: TShare) => void;
  removeShare: (id: string) => void;
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
  const onChageAddPeople = () => {
    onChangeShare({
      id: nanoid(),
      title: "",
      peopleId: "",
      income: false,
      doDate: 0,
      incomeAmount: "",
      outcomeAmount: "",
      spendsId: "",
      visitId: "",
      category: "",
      tag: "",
      description: "",
      dType: "",
      lastUpdate: 0,
    });
  };

  return (
    <div className="flex flex-col gap-2 w-full min-w-[225px] max-w-[425px]">
      {shareList && shareList?.length > 0 && (
        <div className="flex flex-col gap-2 w-full h-96 overflow-y-scroll">
          {errors &&
            shareList.map((i) => (
              <FormShareDetails
                key={i.id}
                errors={errors}
                share={i}
                onChangeshare={onChangeShare}
                removeShare={removeShare}
              />
            ))}
        </div>
      )}
      <Button onClick={() => onChageAddPeople()}>add people</Button>
    </div>
  );
}
