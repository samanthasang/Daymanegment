"use client"
import { DrawerDialogDemo } from "@/components/Drawer/DrawerComponent";
import { More, Remove } from "@/components/table";
import BasicSwitch from "@/components/ui/BasicSwitch";
import { DialogTrigger } from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { TCategory } from "@/modules/category/categoryList.slice";
import { TTag } from "@/modules/tag/TagList.slice";
import { completeTimerList, delTimerList, selectTimerList, TTimer } from "@/modules/timerList/timer.slice";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.extend(utc);
dayjs.extend(timezone);

export const Timeritem = ({ item }: {item : TTimer }) =>  {
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
  
  const startD = dayjs(dayjs.unix(Number(item.startDate)))
  const endD = dayjs(dayjs.unix(Number(item.endDate)))
  const diff = dayjs.duration(dayjs(endD).diff(dayjs(startD)))
  
  return (
    <DrawerDialogDemo drawerType={'TimerList'} formType="Edit Timer">
      <DialogTrigger asChild>
        <div
          onClick={(e) => {
            item.id && dispatch(selectTimerList(item.id));
          }}
          className="w-full h-fit cursor-pointer flex flex-row items-start justify-start border p-3 rounded-2xl border-white" >
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
                {/* {item.isComplete && dayjs(dayjs.unix(Number(item.startDate))).format("YYYY-MM-DD HH:mm")}
                {item.isComplete && <span className="px-1">|</span>}
                {item.isComplete && dayjs(dayjs.unix(Number(item.endDate))).format("YYYY-MM-DD HH:mm")}
                {!item.isComplete && dayjs(dayjs.unix(Number(item.startDate))).format("YYYY-MM-DD HH:mm")} */}
            </div>
          </div>

          <div className="flex flex-col w-fit gap-2 justify-end items-end">              
            <div className="flex flex-row gap-x-2">
              <div onClick={(e) =>  {
                      e && e.preventDefault();
                      item.id && dispatch(delTimerList(item.id));
              }}
              >
                <More />
              </div>
              <BasicSwitch
                checked={item.isComplete} handleToggle={(e) => {
                      e && e.preventDefault();
                      item.id && dispatch(completeTimerList({id: item.id, endDate: (new Date().getTime()/1000.0).toString()}));
                }}
                label=""
                key={"isComplete"}
                />
              </div>
        
            <label
              className={`cursor-pointer px-2 py-1 rounded-2xl bg-white/15`}>
                {!item.isComplete && dayjs(dayjs.unix(Number(item.startDate))).format("YYYY-MM-DD HH:MM")}
                {item.isComplete &&
                  `${diff.hours()}:${diff.minutes()}`}
            </label>
          </div>
        </div> 
      </DialogTrigger>
    </DrawerDialogDemo>
  );
}

export default Timeritem;
