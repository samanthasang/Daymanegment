"use client";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import {
  selectPeopleList,
  setPeopleList,
  TPeople,
  updatePeopleList,
} from "@/modules/people/PeopleList.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { PeopleItem } from "./People.component";

interface IFormInputs {
  title: string;
}

export default function PeopleForm({
  onSubmitForm,
}: {
  onSubmitForm: () => void;
}) {
  const dispatch = useAppDispatch();
  const { ListPeople, selectedPeople }: any =
    useAppSelector((state) => state.PeopleList) || {};

  useEffect(() => {
    if (selectedPeople && selectedPeople.id) {
      console.log(selectedPeople);
      setValue("title", selectedPeople?.title);
    }
  }, [selectedPeople]);

  const formSchema = z.object({
    title: z.string().min(3, { message: "Name is required" }),
  });
  type FormData = z.infer<typeof formSchema>;
  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);

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
    onSubmitForm();
  };

  const onReset = () => {
    console.log("reset");

    dispatch(selectPeopleList(""));
    reset();
  };
  return (
    <div className="col-span-1">
      <div className="flex flex-col gap-2 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-4"
        >
          <Controller
            defaultValue={""}
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                className="!text-white w-full px-3 border-white rounded py-1"
                placeholder="Name"
                {...field}
              />
            )}
          />
          {errors.title?.message && (
            <p className="text-xs text-red-500">{errors.title?.message}</p>
          )}
          {!selectedPeople?.title && (
            <Button
              type="submit"
              className="cursor-pointer w-full text-white bg-background border border-white rounded py-1"
            >
              submit
            </Button>
          )}

          {selectedPeople?.title && (
            <div className="flex gap-4">
              <Button
                onClick={() => onReset()}
                type="button"
                className="cursor-pointer w-full text-white bg-background border border-white rounded py-1"
              >
                reset
              </Button>
              <Button
                type="submit"
                className="cursor-pointer w-full text-white bg-background border border-white rounded py-1"
              >
                submit
              </Button>
            </div>
          )}
        </form>

        {ListPeople &&
          ListPeople?.map((li: TPeople) => (
            <PeopleItem key={li.id} item={li} />
          ))}
      </div>
    </div>
  );
}
