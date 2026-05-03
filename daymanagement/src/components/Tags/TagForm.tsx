"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import {
  selectTagList,
  setTagList,
  TTag,
  updateTagList,
} from "@/modules/tag/TagList.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { InputField } from "../ui/inputField";
import TagList from "./Tag.component";

interface IFormInputs {
  tag: string;
}

export default function TagForm({
  onSubmitForm,
}: {
  onSubmitForm: () => void;
}) {
  const dispatch = useAppDispatch();
  const { ListTag, selectedTag }: any =
    useAppSelector((state) => state.TagList) || {};

  useEffect(() => {
    if (selectedTag && selectedTag.id) {
      setValue("tag", selectedTag?.title);
    }
  }, [selectedTag]);

  const formSchema = z.object({
    tag: z.string().min(3, { message: "Name is required" }),
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

  const onSubmit = () => {
    selectedTag?.title
      ? dispatch(
          updateTagList({
            id: selectedTag.id,
            title: getValues("tag"),
          })
        )
      : dispatch(
          setTagList({
            id: "",
            title: getValues("tag"),
          })
        );
    dispatch(selectTagList(""));
    reset();
    // onSubmitForm();
  };

  const onReset = () => {
    dispatch(selectTagList(""));
    reset();
  };
  return (
    <div className="flex flex-col gap-2 min-w-96">
      <form className="flex flex-col w-full gap-4">
        <Controller
          defaultValue={""}
          name="tag"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <InputField
              title="Title"
              type="string"
              placeholder="Enter Name"
              disabled={!!errors.tag?.message}
              required
              {...field}
            />
          )}
        />
        <div className="flex gap-4">
          {selectedTag?.title && (
            <Button
              type="submit"
              className="flex-1"
            >
              reset
            </Button>
          )}
          <Button type="button" variant="default" className="flex-1" onClick={() => onSubmit()}>
            submit
          </Button>
        </div>
      </form>

      {ListTag && ListTag?.map((li: TTag) => <TagList key={li.id} item={li} />)}
    </div>
  );
}
