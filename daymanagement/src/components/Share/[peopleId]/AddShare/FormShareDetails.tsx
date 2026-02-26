"use client";
import PeopleSelectComponent from "@/components/People/PeopleSelect.component";
import BasicSwitch from "@/components/ui/BasicSwitch";
import { Input } from "@/components/ui/input";
import { TShare } from "@/modules/share/share.slice";
import dayjs from "dayjs";
import { ChangeEvent, useEffect, useState } from "react";
import { FieldErrors } from "react-hook-form";

export default function FormShareDetails({
  share,
  errors,
  onChangeshare,
}: {
  share: TShare;
  onChangeshare: (install: TShare) => void;
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
    <div className=" flex flex-row justify-center items-centerw-full min-w-60 gap-y-4 border px-3 py-2 rounded-2xl border-white">
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-row justify-between">
          <label className="px-2 py-1 flex-none">
            {dayjs(dayjs.unix(Number(share.date))).format("YYYY-MM-DD")}
          </label>
          <div className="flex-none w-14 flex flex-row justify-center items-center">
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
        <div className="w-full flex flex-row">
          <div className="flex-1">
            <PeopleSelectComponent
              onClickChange={handlePeople}
              value={shareDetail.peopleId}
            />
          </div>
          <div className="flex-1">
            {share.income && (
              <Input
                className="!text-white w-full px-3 border-white rounded py-1 flex-1"
                placeholder="Income Amount"
                value={shareDetail.incomeAmount}
                onChange={(e) => onChageInputIncome(e)}
              />
            )}
            {errors.title?.message && (
              <p className="text-xs text-red-500">{errors.title?.message}</p>
            )}
            {!share.income && (
              <Input
                className="!text-white w-full px-3 border-white rounded py-1 flex-1"
                placeholder="Outcome Amount"
                value={shareDetail.outcomeAmount}
                onChange={(e) => onChageInputOutcome(e)}
              />
            )}
            {errors.title?.message && (
              <p className="text-xs text-red-500">{errors.title?.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
