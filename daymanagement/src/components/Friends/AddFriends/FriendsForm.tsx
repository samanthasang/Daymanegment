"use client";
import { CalendarDialog } from "@/components/ui/calenderWithDialog";
import { ClendarButtonGroup } from "@/components/ui/ClendarButtonGroup";
import { TextAreaField } from "@/components/ui/textAreaField";
import { useAppDispatch } from "@/lib/hook";
import usePeopleList from "@/lib/Hooks/Lists/Friends/UsePeopleList.component";
import { currentUnixTimestamp } from "@/lib/Hooks/UseDayJS";
import {
  selectPeopleList,
  setPeopleList,
  updatePeopleList,
} from "@/modules/people/PeopleList.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../ui/button";
import { InputField } from "../../ui/inputField";

interface IFormInputs {
  title: string;
  firstName?: string;
  lastName?: string;
  phoneNumber: string;
  birthDate: number;
  createDate?: number;
  description?: string;
}

export default function PeopleForm({
  onSubmitForm,
  formType,
}: {
  onSubmitForm: () => void;
  formType: string;
}) {
  const dispatch = useAppDispatch();
  const { selectedPeople } = usePeopleList();
  const [date, setDate] = useState<Date>();

  const formSchema = z.object({
    title: z.string().min(3, { message: "Name is required" }),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    phoneNumber: z.string(),
    birthDate: z.number().min(1, { message: "birthDate is required" }),
    createDate: z.number().optional(),
    description: z.string().optional(),
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

  useEffect(() => {
    date &&
      setValue("birthDate", Math.floor(new Date(date).getTime() / 1000.0));
  }, [date]);

  useEffect(() => {
    if (formType != "Add" && selectedPeople) {
      setValue("title", selectedPeople?.title);
      setValue("firstName", selectedPeople.firstName);
      setValue("lastName", selectedPeople.lastName);
      setValue("phoneNumber", selectedPeople.phoneNumber);
      setValue("description", selectedPeople.description);
      setValue("birthDate", selectedPeople.birthDate);
      setValue(
        "createDate",
        +selectedPeople.createDate || +selectedPeople.birthDate
      );
      setDate(new Date(Number(selectedPeople.birthDate) * 1000));
    }
  }, [selectedPeople, setValue]);

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    formType == "Edit"
      ? dispatch(
          updatePeopleList({
            id: selectedPeople.id,
            title: data.title,
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            birthDate: date
              ? Math.floor(new Date(date).getTime() / 1000.0)
              : data.birthDate,
            phoneNumber: data.phoneNumber || "",
            description: data.description || "",
          })
        )
      : dispatch(
          setPeopleList({
            id: "",
            title: data.title,
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            birthDate: date
              ? Math.floor(new Date(date).getTime() / 1000.0)
              : data.birthDate,
            createDate: currentUnixTimestamp,
            phoneNumber: data.phoneNumber || "",
            description: data.description || "",
          })
        );
    dispatch(selectPeopleList(""));
    reset();
    onSubmitForm();
  };

  const onReset = () => {
    dispatch(selectPeopleList(""));
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full min-w-60 flex flex-col gap-y-3"
    >
      <Controller
        defaultValue={""}
        name="title"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <InputField
            title="Nick Name"
            type="string"
            placeholder="Enter Name"
            disabled={!!errors.title?.message}
            required
            {...field}
          />
        )}
      />
      <Controller
        defaultValue={""}
        name="firstName"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <InputField
            title="First Name"
            type="string"
            placeholder="Enter First Name"
            disabled={!!errors.title?.message}
            required
            {...field}
          />
        )}
      />
      <Controller
        defaultValue={""}
        name="lastName"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <InputField
            title="Last Name"
            type="string"
            placeholder="Enter Last Name"
            disabled={!!errors.title?.message}
            required
            {...field}
          />
        )}
      />
      <ClendarButtonGroup
        dateValue={date}
        errors={!date && !!errors.birthDate?.message}
      >
        <Controller
          name="birthDate"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <CalendarDialog
              required
              mode="single"
              selected={date}
              month={date}
              onSelect={setDate}
              className=" border-white rounded py-1"
              captionLayout="dropdown"
              title="a"
              dateValue={date}
              setDate={setDate}
            />
          )}
        />
      </ClendarButtonGroup>{" "}
      <Controller
        defaultValue={""}
        name="phoneNumber"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <InputField
            title="PhoneNumber"
            placeholder="Phone Number"
            disabled={!!errors.phoneNumber?.message}
            content={errors.phoneNumber?.message}
            required
            {...field}
          />
        )}
      />
      <Controller
        defaultValue={""}
        name="description"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextAreaField
            className="!text-white h-32 w-full px-3 border-white rounded py-1"
            placeholder="Description"
            {...field}
          />
        )}
      />
      <div className="flex gap-4">
        {selectedPeople?.title && (
          <Button type="button" className="flex-1">
            reset
          </Button>
        )}
        <Button type="submit" className="flex-1" variant="default">
          submit
        </Button>
      </div>
    </form>
  );
}
