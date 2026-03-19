"use client";
import CategotySelectComponent from "@/components/Category/CategotySelect.component";
import TagSelectComponent from "@/components/Tags/TagSelect.component";
import { Button } from "@/components/ui/button";
import { CalendarDialog } from "@/components/ui/calenderWithDialog";
import { ClendarButtonGroup } from "@/components/ui/ClendarButtonGroup";
import { InputField } from "@/components/ui/inputField";
import { SelectField } from "@/components/ui/selectField";
import { TextAreaField } from "@/components/ui/textAreaField";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
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
  date: string;
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
  const [date, setDate] = useState<Date>();

  // creating a schema for strings
  const formSchema = z.object({
    title: z.string().min(4, { message: "Title is required" }),
    priority: z.string().min(1, { message: "Priority is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    tag: z.string().min(1, { message: "Tag is required" }),
    date: z.string().min(1, { message: "date is required" }),
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
  } = methods;

  useEffect(() => {
    date &&
      setValue(
        "date",
        Math.floor(new Date(date).getTime() / 1000.0).toString()
      );
  }, [date]);

  const dispatch = useAppDispatch();
  const { selectedToDo }: any = useAppSelector((state) => state.todoList) || {};

  useEffect(() => {
    if (formType.split(" ")[0] == "Edit" && selectedToDo) {
      setValue("title", selectedToDo?.title);
      setValue("priority", selectedToDo.priority);
      setValue("category", selectedToDo.category);
      setValue("tag", selectedToDo.tag);
      setValue("description", selectedToDo?.description);
      setValue("date", selectedToDo.date);
      setDate(new Date(Number(selectedToDo.date) * 1000));
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
    selectedToDo?.title
      ? dispatch(
          updateToDoList({
            id: selectedToDo.id,
            title: data.title,
            date: date
              ? Math.floor(new Date(date).getTime() / 1000.0).toString()
              : data.date,
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
            date: date
              ? Math.floor(new Date(date).getTime() / 1000.0).toString()
              : data.date,
            priority: data.priority,
            description: data.description || "",
            category: data.category,
            tag: data.tag,
          })
        );
    dispatch(selectToDoList(""));

    selectedToDo?.title
      ? toast(`${data.title} is updated`)
      : toast(`${data.title} is created`);
    setValue("date", "");
    reset();
    onSubmitForm();
  };
  const onReset = () => {
    dispatch(selectToDoList(""));
    setValue("date", "");
    reset();
  };

  return (
    <div className="col-span-1 w-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-4"
      >
        <div className="flex flex-col sm:flex-row w-full gap-x-4">
          <div className="w-full sm:w-1/2 min-w-60 flex flex-col gap-y-4">
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
              errors={!date && !!errors.date?.message}
            >
              <Controller
                name="date"
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
            <div className="flex flex-row">
              <div className="flex-1">
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
              </div>
            </div>

            <div className="flex flex-row">
              <div className="flex-1">
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
              </div>
            </div>
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
          </div>
        </div>

        {!selectedToDo?.title && (
          <Button type="submit" variant="default">
            submit
          </Button>
        )}

        {selectedToDo?.title && (
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
    </div>
  );
}
