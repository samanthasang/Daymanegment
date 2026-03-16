"use client";
import { Trash } from "@/components/icons";
import PeopleSelectComponent from "@/components/People/PeopleSelect.component";
import BasicSwitch from "@/components/ui/BasicSwitch";
import { InputField } from "@/components/ui/inputField";
import { TShare } from "@/modules/share/share.slice";
import dayjs from "dayjs";
import { ChangeEvent, useEffect, useState } from "react";
import { FieldErrors } from "react-hook-form";

export default function FormShareDetails({
  share,
  errors,
  onChangeshare,
  removeShare,
}: {
  share: TShare;
  onChangeshare: (install: TShare) => void;
  removeShare: (id: string) => void;
  errors: FieldErrors<{
    date: string;
    category: string;
    tag: string;
    title: string;
    description: string;
    income?: boolean | undefined;
    paymentCompleteValue?: string | undefined;
    shareList?:
      | {
          peopleId: string;
          date: string;
          category: string;
          tag: string;
          description: string;
          incomeAmount?: string | undefined;
          income?: boolean | undefined;
          outcomeAmount?: string | undefined;
        }[]
      | undefined;
    advancePayment?: string | undefined;
  }>;
}) {
  const [shareDetail, setShareDetail] = useState<TShare>(share);

  const onChageInputIncome = (e: ChangeEvent<HTMLInputElement>) => {
    setShareDetail({
      ...share,
      incomeAmount: e.target.value,
    });
  };
  const onChageInputOutcome = (e: ChangeEvent<HTMLInputElement>) => {
    setShareDetail({
      ...share,
      outcomeAmount: e.target.value,
    });
  };

  const handlePeople = (data: string) => {
    setShareDetail({
      ...share,
      peopleId: data,
    });
  };
  useEffect(() => {
    onChangeshare(shareDetail);
  }, [shareDetail]);

  useEffect(() => {
    console.log(share.income);
  }, [shareDetail]);

  return (
    <div className=" flex flex-row justify-center items-centerw-full min-w-60 gap-y-4 p-3 rounded-2xl bg-primary">
      <div className="w-full flex flex-col gap-y-4">
        <div className="w-full flex h-8 bg-transparent  py-1 text-base shadow-sm justify-between rounded-xl ">
          <label className="text-white/50">
            {dayjs(dayjs.unix(Number(share.date))).format("YYYY-MM-DD")}
          </label>
          <div className="flex justify-end w-fit gap-x-1">
            <div
              onClick={(e) => {
                e && e.preventDefault();
                removeShare(share.id);
              }}
              className="flex justify-center items-center h-5 w-5 bg-white/80 rounded-full"
            >
              <Trash />
            </div>
            <BasicSwitch
              checked={share.income}
              handleToggle={(e) => {
                e && e.preventDefault();
                share.date &&
                  setShareDetail({
                    ...share,
                    income: !share.income,
                  });
              }}
              label=""
              key={"income"}
            />
          </div>
        </div>
        <div className="flex-1">
          <PeopleSelectComponent
            onValueChange={handlePeople}
            value={shareDetail.peopleId}
          />
        </div>
        <div className="flex-1">
          {share.income && (
            <InputField
              title="Title"
              type="string"
              // className="!text-white w-full px-3 border-white rounded py-1"
              placeholder="Income Amount"
              disabled={!!errors.title?.message}
              content={errors.title?.message}
              required
              value={shareDetail.incomeAmount}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onChageInputIncome(e)
              }
            />
          )}
          {!share.income && (
            <InputField
              title="Title"
              type="string"
              disabled={!!errors.title?.message}
              content={errors.title?.message}
              required
              className={`${share.income ? "text-green-500" : "text-red-500"}`}
              placeholder="Outcome Amount"
              value={shareDetail.outcomeAmount}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onChageInputOutcome(e)
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
