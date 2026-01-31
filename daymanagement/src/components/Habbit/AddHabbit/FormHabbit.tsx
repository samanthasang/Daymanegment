"use client";
import CategotySelectComponent from "@/components/Category/CategotySelect.component";
import { DrawerDialogDemo } from "@/components/Drawer/DrawerComponent";
import { Edit } from "@/components/table";
import TagSelectComponent from "@/components/Tags/TagSelect.component";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textArea";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import {
  selectHabbitList,
  setHabbitList,
  updateHabbitList,
} from "@/modules/habbitList/habbit.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger } from "@radix-ui/react-dialog";
import dayjs from "dayjs";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const currentUnixTimestamp = dayjs().unix();
interface IFormInputs {
  habbit: string;
  description: string;
  priority: string;
  category: string;
  tag: string;
}

export default function FormHabbit({
  onSubmitForm,
}: {
  onSubmitForm: () => void;
}) {
  const dispatch = useAppDispatch();
  const { selectedhabbit }: any =
    useAppSelector((state) => state.habbitList) || {};

  useEffect(() => {
    console.log(selectedhabbit);
  }, [selectedhabbit]);

  // creating a schema for strings
  const formSchema = z.object({
    habbit: z.string().min(4, { message: "Name is required" }),
    description: z.string().min(4, { message: "Description is required" }),
    priority: z.string().min(1, { message: "priority is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    tag: z.string().min(1, { message: "Tag is required" }),
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

  useEffect(() => {
    setValue("habbit", selectedhabbit?.title);
    setValue("description", selectedhabbit?.description);
    setValue("priority", selectedhabbit?.priority);
    setValue("category", selectedhabbit?.category);
    setValue("tag", selectedhabbit?.tag);
  }, [selectedhabbit]);

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
    console.log(data);

    selectedhabbit?.title
      ? dispatch(
          updateHabbitList({
            id: selectedhabbit.id,
            title: data.habbit,
            description: data.description,
            priority: data.priority,
            completeUpdate: selectedhabbit
              ? selectedhabbit.completeUpdate
              : currentUnixTimestamp,
            lastUpdate: selectedhabbit
              ? selectedhabbit.lastUpdate
              : currentUnixTimestamp,
            score: selectedhabbit.score,
            category: data.category,
            tag: data.tag,
          })
        )
      : dispatch(
          setHabbitList({
            id: "",
            title: data.habbit,
            description: data.description,
            priority: data.priority,
            completeUpdate: selectedhabbit ? selectedhabbit.completeUpdate : "",
            lastUpdate: selectedhabbit ? selectedhabbit.lastUpdate : "",
            score: selectedhabbit ? selectedhabbit.score : 1,
            category: data.category,
            tag: data.tag,
          })
        );
    dispatch(selectHabbitList(""));
    reset();
    onSubmitForm();
  };
  const onReset = () => {
    console.log("reset");

    dispatch(selectHabbitList(""));
    reset();
  };

  return (
    <div className="col-span-1">
      <div className="flex flex-row gap-2 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-4"
        >
          <Controller
            defaultValue={""}
            name="habbit"
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
          {errors.habbit?.message && (
            <p className="text-xs text-red-500">{errors.habbit?.message}</p>
          )}
          <Controller
            defaultValue={""}
            name="description"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Textarea
                className="!text-white w-full px-3 border-white rounded py-1"
                placeholder="Description"
                {...field}
              />
            )}
          />
          {errors.description?.message && (
            <p className="text-xs text-red-500">
              {errors.description?.message}
            </p>
          )}

          <Controller
            defaultValue={""}
            name="priority"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                onValueChange={(data) => data && handlePriority(data)}
                value={field.value}
              >
                <SelectTrigger className="w-full border-white rounded py-1">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"High"}>High</SelectItem>
                  <SelectItem value={"Medium"}>Medium</SelectItem>
                  <SelectItem value={"Low"}>Low</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.priority?.message && (
            <p className="text-xs text-red-500">{errors.priority?.message}</p>
          )}
          <div className="flex flex-row">
            <div className="flex-1">
              <Controller
                defaultValue={""}
                name="category"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CategotySelectComponent
                    onClickChange={handleCategory}
                    value={field.value}
                  />
                )}
              />
              {errors.category?.message && (
                <p className="text-xs text-red-500">
                  {errors.category?.message}
                </p>
              )}
            </div>
            <DrawerDialogDemo drawerType={"TagList"} formType="Add Tag">
              <DialogTrigger asChild>
                <div className="text-red-400 w-10 h-10 flex justify-center items-center">
                  <Edit />
                </div>
              </DialogTrigger>
            </DrawerDialogDemo>
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
                    onClickChange={handleTag}
                    value={field.value}
                  />
                )}
              />
              {errors.tag?.message && (
                <p className="text-xs text-red-500">{errors.tag?.message}</p>
              )}
            </div>
            <DrawerDialogDemo drawerType={"TagList"} formType="Add Tag">
              <DialogTrigger asChild>
                <div className="text-red-400 w-10 h-10 flex justify-center items-center">
                  <Edit />
                </div>
              </DialogTrigger>
            </DrawerDialogDemo>
          </div>

          {!selectedhabbit?.title && (
            <Button
              type="submit"
              className="cursor-pointer w-full text-white bg-background border border-white rounded py-1"
            >
              submit
            </Button>
          )}

          {selectedhabbit?.title && (
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
      </div>
    </div>
  );
}
