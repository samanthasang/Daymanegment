"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import {
  selectPeopleList,
  setPeopleList,
  TPeople,
  updatePeopleList,
} from "@/modules/people/PeopleList.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { InputField } from "../ui/inputField";
import usePeopleList from "@/lib/Hooks/Lists/Share/UsePeopleList.component";
import { cn } from "@/lib/utils";
import PeopleItem from "../Share/peopleItem/PeopleItem.component";

interface IFormInputs {
  title: string;
}

export default function PeopleForm({
  onSubmitForm,
  formType,
}: {
  onSubmitForm: () => void;
  formType: string;
}) {
  const dispatch = useAppDispatch();

  const People = useAppSelector((state) => state.PeopleList) || {};

  const selectedPeople = People?.selectedPeople as TPeople;

  const { ListPeople } = usePeopleList();

  useEffect(() => {
    if (
      formType.split(" ")[0] == "Edit" &&
      selectedPeople &&
      selectedPeople.id
    ) {
      setValue("title", selectedPeople?.title);
    }
  }, [selectedPeople, ListPeople]);

  const formSchema = z.object({
    title: z.string().min(3, { message: "Name is required" }),
  });
  type FormData = z.infer<typeof formSchema>;
  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const peopleFilter = useMemo(
    () =>
      watch("title")
        ? [...ListPeople].filter((people) =>
            people.title.includes(watch("title"))
          )
        : ListPeople,
    [watch, getValues, watch("title"), getValues("title")]
  );

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    selectedPeople?.title
      ? dispatch(
          updatePeopleList({
            id: selectedPeople.id,
            title: data.title,
          })
        )
      : dispatch(
          setPeopleList({
            id: "",
            title: data.title,
          })
        );
    dispatch(selectPeopleList(""));
    reset();
    formType.split(" ")[0] == "Edit" && onSubmitForm();
  };

  const onReset = () => {
    dispatch(selectPeopleList(""));
    reset();
  };

  return (
    <div className="col-span-1">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-4"
      >
        <div className="flex flex-col sm:flex-row w-full gap-x-4">
          <div className="w-full min-w-60 flex flex-col gap-y-4">
            <Controller
              defaultValue={""}
              name="title"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <InputField
                  title="Title"
                  type="string"
                  placeholder="Enter Name"
                  disabled={!!errors.title?.message}
                  required
                  {...field}
                />
              )}
            />
          </div>
        </div>
        {!selectedPeople?.title && (
          <Button type="submit" variant="default">
            submit
          </Button>
        )}

        {selectedPeople?.title && (
          <div className="flex gap-4">
            <Button onClick={() => onReset()} type="button" variant="secondary">
              reset
            </Button>
            <Button type="submit" variant="default">
              submit
            </Button>
          </div>
        )}
      </form>
      <div
        className={cn(
          "relative flex flex-col max-h-[40vh] h-fit w-full mx-auto gap-y-4 mt-4 ",
          peopleFilter.length > 5 ? "overflow-y-scroll" : ""
        )}
      >
        {peopleFilter &&
          peopleFilter?.map((li: TPeople) => (
            <PeopleItem key={li.id} item={li} />
          ))}
      </div>
    </div>
  );
}
