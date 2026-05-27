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
    <div className=" h-fit w-full bg-primary p-1.5 rounded-3xl flex flex-row justify-between items-center">
      <label className="px-2 py-1">{item.title}</label>
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
          className="hover:bg-button/15"
          size="sm"
        >
          <Edit width="16px" height="16px" />
        </Button>
      </div>
    </div>
  );
};

export default CategoryList;
