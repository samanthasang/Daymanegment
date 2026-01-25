"use client"
import { DrawerDialogDemo } from "@/components/Drawer/DrawerComponent";
import { More } from "@/components/table";
import { DialogTrigger } from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { TCategory } from "@/modules/category/categoryList.slice";
import { delSpendsList, selectSpendsList, TSpends } from "@/modules/spends/spends.slice";
import { TTag } from "@/modules/tag/TagList.slice";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.extend(utc);
dayjs.extend(timezone);


export const SpendsItem = ({ item }: {item : TSpends }) =>  {
  const dispatch = useAppDispatch();

  const { ListCategory }: {
    ListCategory: TCategory[];
    selectedCategory: {};
  } = useAppSelector((state) => state.CategoryList) || [];
   

  const categorySelected = ListCategory ?
      ListCategory.filter((category) => category.id == item.category)[0] :
      {
        id: "",
        title: ""
    }

  const { ListTag }: {
    ListTag: TTag[];
    selectedTag: {};
  } = useAppSelector((state) => state.TagList) || [];
   

  const tagSelected = ListTag ?
      ListTag.filter((category) => category.id == item.tag )[0] :
      {
        id: "",
        title: ""
    }
    
  return (
     <DrawerDialogDemo drawerType={'SpendsList'} formType="Edit Spends">
      <DialogTrigger asChild>
        <div
          onClick={(e) => {
            item.id && dispatch(selectSpendsList(item.id));
          }} className="w-full h-fit cursor-pointer flex flex-row items-start justify-start border p-3 rounded-2xl border-white" >
     
        <div className="select-none cursor-pointer flex flex-col flex-1 gap-2 justify-start items-start">
          <div className=" select-none cursor-pointer flex col-span-4 gap-3 justify-start items-start">
              <label
                htmlFor="terms"
                className={`cursor-pointer flex justify-center items-center gap-2`}>
                  {item.title}
              </label>
            </div>
          <div className="flex flex-row select-none cursor-pointer col-span-3 gap-2 justify-start items-start">
              {categorySelected && <label
                className={`cursor-pointer px-2 py-1 rounded-2xl bg-white/15`}>
                  {categorySelected.title || ""}
            </label>}
              {tagSelected && <label
                className={`cursor-pointer px-2 py-1 rounded-2xl bg-white/15`}>
                  {tagSelected.title || ""}
              </label>}
              </div>
          </div>
          <div className="flex flex-col w-fit gap-2 justify-end items-end">              
            <div className="flex flex-row gap-x-2">
              <div onClick={(e) =>  {
                      e && e.preventDefault();
                      item.id && dispatch(delSpendsList(item.id));
              }}
              >
                <More />
              </div>
              </div>
      
            <label
              className={`cursor-pointer px-2 py-1 rounded-2xl bg-white/15`}>
                {dayjs(dayjs.unix(Number(item.date))).format("YYYY-MM-DD")} | {`${item.incomeAmount || item.priceOfProduct}`}
            </label>
        </div>
      </div> 
    </DialogTrigger>
  </DrawerDialogDemo>
  );
}

export default SpendsItem;
