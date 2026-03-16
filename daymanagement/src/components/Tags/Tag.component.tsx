"use client";
import { useAppDispatch } from "@/lib/hook";
import { delTagList, selectTagList, TTag } from "@/modules/tag/TagList.slice";
import { Edit, Trash } from "../icons";

export const TagList = ({ item }: { item: TTag }) => {
  const dispatch = useAppDispatch();

  return (
    <div className=" cursor-pointer flex flex-row items-start justify-start bg-primary p-3 rounded-2xl">
      <div className=" h-fit w-full flex flex-row justify-between items-center">
        <div className=" select-none cursor-pointer flex col-span-6 gap-3 justify-start items-start">
          <label
            className={`cursor-pointer flex justify-center items-center gap-2`}
          >
            {item.title}
          </label>
        </div>
        <div className="flex col-span-6 gap-3 justify-start items-start">
          <div
            onClick={(e) => {
              e && e.preventDefault();
              item.id && dispatch(delTagList(item.id));
            }}
            className="flex justify-center items-center h-5 w-5 rounded-full"
          >
            <Trash />
          </div>
          <div
            onClick={(e) => {
              e && e.preventDefault();
              item.id && dispatch(selectTagList(item.id));
            }}
            className="flex justify-center items-center h-5 w-5 rounded-full"
          >
            <Edit />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagList;
