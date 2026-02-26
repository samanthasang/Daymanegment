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
}: {
  onSubmitForm: () => void;
  shareList?: TShare[];
  onChangeShare: (install: TShare) => void;
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
      peopleId: "",
      income: false,
      date: "",
      incomeAmount: "",
      outcomeAmount: "",
      shareId: "",
      visitId: "",
      category: "",
      tag: "",
    });
  };
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-col gap-2 w-full h-96 overflow-y-scroll">
        {shareList &&
          errors &&
          shareList.map((i) => (
            <FormShareDetails
              key={i.id}
              errors={errors}
              share={i}
              onChangeshare={onChangeShare}
            />
          ))}
      </div>
      <Button
        onClick={() => onChageAddPeople()}
        className="cursor-pointer w-full text-white bg-background border border-white rounded py-1"
      >
        add people
      </Button>
      <Button
        onClick={() => onSubmitForm()}
        className="cursor-pointer w-full text-white bg-background border border-white rounded py-1"
      >
        submit
      </Button>
    </div>
  );
}
