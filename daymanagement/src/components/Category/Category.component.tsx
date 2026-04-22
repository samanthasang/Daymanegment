"use client";
import { useAppDispatch } from "@/lib/hook";
import {
  delCategoryList,
  selectCategoryList,
  TCategory,
} from "@/modules/category/categoryList.slice";
import { Edit, Trash } from "../icons";

export const CategoryList = ({ item }: { item: TCategory }) => {
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
              item.id && dispatch(delCategoryList(item.id));
            }}
            className="flex justify-center items-center h-10 w-10 flex-1 rounded-full bg-primary hover:bg-error cursor-pointer"
          >
            <Trash />
          </div>
          <div
            onClick={(e) => {
              e && e.preventDefault();
              item.id && dispatch(selectCategoryList(item.id));
            }}
            className="flex justify-center items-center h-10 w-10 flex-1 rounded-full bg-primary hover:bg-button/15 cursor-pointer"
          >
            <Edit />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
