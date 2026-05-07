"use client";
import { useAppDispatch } from "@/lib/hook";
import { delTagList, selectTagList, TTag } from "@/modules/tag/TagList.slice";
import { Edit, Trash } from "lucide-react";
import { Button } from "../ui/button";

export const TagList = ({ item }: { item: TTag }) => {
  const dispatch = useAppDispatch();

  return (
    <div className=" cursor-pointer flex flex-row items-start justify-start bg-primary p-3 rounded-2xl">
      <div className=" h-fit w-full flex flex-row justify-between items-center">
        <div className=" select-none cursor-pointer flex col-span-6 gap-3 justify-start items-start">
          <label className="cursor-pointer px-2 py-1 rounded-2xl bg-white/15">
            {item.title}
          </label>
        </div>
        <div className="flex col-span-6 gap-3 justify-start items-start">
          <Button
            onClick={(e) => {
              e && e.preventDefault();
              item.id && dispatch(delTagList(item.id));
            }}
            className="hover:bg-error/30"
          >
            <Trash width="16px" height="16px" className="text-error" />
          </Button>
          <Button
            onClick={(e) => {
              e && e.preventDefault();
              item.id && dispatch(selectTagList(item.id));
            }}
            className="flex justify-center items-center h-10 w-10 flex-1 rounded-full bg-primary hover:bg-button/15 cursor-pointer"
          >
            <Edit width="16px" height="16px" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TagList;
