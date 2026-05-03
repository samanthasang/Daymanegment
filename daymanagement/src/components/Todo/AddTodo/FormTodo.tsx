"use client";
import CategotySelectComponent from "@/components/Category/CategotySelect.component";
import TagSelectComponent from "@/components/Tags/TagSelect.component";
import { Button } from "@/components/ui/button";
import { CalendarDialog } from "@/components/ui/calenderWithDialog";
import { ClendarButtonGroup } from "@/components/ui/ClendarButtonGroup";
import { InputField } from "@/components/ui/inputField";
import { SelectField } from "@/components/ui/selectField";
import { TextAreaField } from "@/components/ui/textAreaField";
import { useAppDispatch } from "@/lib/hook";
import useTodoList from "@/lib/Hooks/Lists/Todo/UseTodoList.component";
import { currentUnixTimestamp } from "@/lib/Hooks/UseDayJS";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import {
  selectToDoList,
  setToDoList,
  updateToDoList,
} from "../../../modules/toDoList/todo.slice";

interface IFormInputs {
  title: string;
  priority: string;
  doDate: number;
  createDate?: number;
  category: string;
  tag: string;
  description?: string;
}

export default function FormTodo({
  onSubmitForm,
  formType,
}: {
  onSubmitForm: () => void;
  formType: string;
}) {
  const dispatch = useAppDispatch();
  const { selectedToDo } = useTodoList();

  const [date, setDate] = useState<Date>();

  // creating a schema for strings
  const formSchema = z.object({
    title: z.string().min(4, { message: "Title is required" }),
    priority: z.string().min(1, { message: "Priority is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    tag: z.string().min(1, { message: "Tag is required" }),
    doDate: z.number().min(1, { message: "date is required" }),
    createDate: z.number().optional(),
    description: z.string().optional(),
  });
  type FormData = z.infer<typeof formSchema>;

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
    register,
    getValues,
  } = methods;

  useEffect(() => {
    date && setValue("doDate", Math.floor(new Date(date).getTime() / 1000.0));
  }, [date]);

  useEffect(() => {
    if (formType != "Add" && selectedToDo) {
      setValue("title", selectedToDo?.title);
      setValue("priority", selectedToDo.priority);
      setValue("category", selectedToDo.category);
      setValue("tag", selectedToDo.tag);
      setValue("description", selectedToDo?.description);
      setValue("doDate", selectedToDo.doDate);
      setValue("createDate", selectedToDo.createDate ?? +selectedToDo.doDate);
      setDate(new Date(Number(selectedToDo.doDate) * 1000));
    }
  }, [selectedToDo, setValue]);

  const handlePriority = (data: string) => {
    setValue("priority", data);
  };
  const handleCategory = (data: string) => {
    setValue("category", data);
  };
  const handleTag = (data: string) => {
    setValue("tag", data);
  };

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    formType == "Edit"
      ? dispatch(
          updateToDoList({
            id: selectedToDo.id,
            title: data.title,
            doDate: date
              ? Math.floor(new Date(date).getTime() / 1000.0)
              : data.doDate,
            createDate: data.createDate ?? data.doDate,
            priority: data.priority,
            description: data.description || "",
            category: data.category,
            tag: data.tag,
          })
        )
      : dispatch(
          setToDoList({
            id: "",
            title: data.title,
            doDate: date
              ? Math.floor(new Date(date).getTime() / 1000.0)
              : data.doDate,
            createDate: currentUnixTimestamp,
            priority: data.priority,
            description: data.description || "",
            category: data.category,
            tag: data.tag,
          })
        );

    setValue("doDate", 0);

    formType == "Edit"
      ? toast(`${data.title} is updated`)
      : toast(`${data.title} is created`);

    dispatch(selectToDoList(""));
    reset();
    onSubmitForm();
  };
  const onReset = () => {
    dispatch(selectToDoList(""));
    setValue("doDate", 0);
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
            title="Title"
            type="string"
            placeholder="Enter Task Name"
            disabled={!!errors.title?.message}
            required
            {...field}
          />
        )}
      />

      <ClendarButtonGroup
        dateValue={date}
        errors={!date && !!errors.doDate?.message}
      >
        <Controller
          name="doDate"
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
      </ClendarButtonGroup>

      <Controller
        defaultValue={""}
        name="priority"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <SelectField
            title="Priority"
            placeholder="Choose Priority"
            required
            invalid={!field.value && !!errors.priority?.message}
            itemArray={[
              { id: "High", title: "High" },
              { id: "Medium", title: "Medium" },
              { id: "Low", title: "Low" },
            ]}
            onValueChange={(data) => data && handlePriority(data)}
            {...field}
            value={field.value}
            className={`${!field.value && errors.priority?.message ? "border-[1px] border-red-600" : ""}`}
            {...register("priority")}
          />
        )}
      />

      <Controller
        defaultValue={""}
        name="category"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <CategotySelectComponent
            required
            errors={!field.value && !!errors.category?.message}
            description={errors.category?.message}
            onValueChange={handleCategory}
            value={field.value}
          />
        )}
      />

      <Controller
        defaultValue={""}
        name="tag"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TagSelectComponent
            required
            errors={!field.value && !!errors.tag?.message}
            description={errors.tag?.message}
            onValueChange={handleTag}
            value={field.value}
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
        {formType != "Add" && selectedToDo?.title && (
          <Button type="submit" className="flex-1">
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
