"use client";
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
import { InputField } from "../ui/inputField";
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
    // onSubmitForm();
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
          {!selectedPeople?.title && (
            <Button type="submit" variant="default">
              submit
            </Button>
          )}

          {selectedPeople?.title && (
            <div className="flex gap-4">
              <Button onClick={() => onReset()} type="button" variant="default">
                reset
              </Button>
              <Button type="submit" variant="default">
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
