"use client";
import { useAppDispatch } from "@/lib/hook";
import {
  delCategoryList,
  selectCategoryList,
  TCategory,
} from "@/modules/category/categoryList.slice";
import { Edit, Trash } from "lucide-react";
import { Button } from "../ui/button";

export const CategoryList = ({ item }: { item: TCategory }) => {
  const dispatch = useAppDispatch();

  return (
    <div className=" cursor-pointer flex flex-row items-start justify-start bg-primary p-3 rounded-2xl">
      <div className=" h-fit w-full flex flex-row justify-between items-center">
        <div className=" select-none cursor-pointer flex col-span-6 gap-3 justify-start items-start">
          <label className="cursor-pointer flex justify-center items-center gap-2">
            {item.title}
          </label>
        </div>
        <div className="flex col-span-6 gap-3 justify-start items-start">
          <Button
            onClick={(e) => {
              e && e.preventDefault();
              item.id && dispatch(delCategoryList(item.id));
            }}
            className="hover:bg-error/30"
            size="sm"
          >
            <Trash width="16px" height="16px" className="text-error" />
          </Button>
          <Button
            onClick={(e) => {
              e && e.preventDefault();
              item.id && dispatch(selectCategoryList(item.id));
            }}
            size="sm"
          >
            <Edit width="16px" height="16px" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
