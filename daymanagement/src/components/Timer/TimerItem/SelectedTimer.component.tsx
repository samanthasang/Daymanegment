"use client"
import { DrawerDialogDemo } from "@/components/Drawer/DrawerComponent";
import { CheckCircle, CheckMark, ChevronSmallDoubleUp, ChevronSmallTripleUp, ChevronSmallUp, Edit, Remove } from "@/components/table";
import { DialogTrigger } from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { TCategory } from "@/modules/category/categoryList.slice";
import { TTag } from "@/modules/tag/TagList.slice";
import { TTimer } from "@/modules/timerList/timer.slice";
import { completeToDoList, delToDoList, selectToDoList, TToDo } from "@/modules/toDoList/todo.slice";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.extend(utc);
dayjs.extend(timezone);


export const SelectedTimer = ({ item }: {item : TTimer }) =>  {
  const dispatch = useAppDispatch();
  const [isExpanded, setIsVisible] = useState(false)

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
    <AnimatePresence >
        <motion.div  
      initial={{ height: 80 }}
      animate={{ height: isExpanded ? "auto" : 80 }}
      transition={{ duration: 0.3 }}
      style={{ overflow: "hidden" }}
    className=" cursor-pointer flex flex-row items-start justify-start border p-3 rounded-2xl border-white"
      >
        <div className=" h-fit w-full flex flex-col"  onClick={() => setIsVisible(!isExpanded)}>
      <div 
        className=" select-none cursor-pointer flex col-span-6 gap-3 justify-start items-start">
          <label
            htmlFor="terms"
            className={`cursor-pointer flex justify-center items-center gap-2`}>
            {item.title}
          </label>
        </div>
      <div 
        className="select-none cursor-pointer flex col-span-3 gap-2 justify-start items-start">
          
          </div>
          <AnimatePresence initial={false}>         
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: isExpanded ? "auto" : 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden" }}
              key="box"
            >
          <div 
                className="flex flex-col select-none cursor-pointer col-span-3 gap-2 justify-start items-start">
                {/* <Checkbox checked={item.isComplete} id="terms" /> */}
                  <label
                    className={`cursor-pointer`}>
                      {dayjs(dayjs.unix(Number(item.startDate))).format("YYYY-MM-DD")}
                  </label>
                  <label
                    className={`cursor-pointer`}>
                      {dayjs(dayjs.unix(Number(item.endDate))).format("YYYY-MM-DD")}
                  </label>
                  <label
                    className={`cursor-pointer`}>
                      {categorySelected && categorySelected.title || ""}
                  </label>
                  <label
                    className={`cursor-pointer`}>
                      {tagSelected && tagSelected.title || ""}
                  </label>
                  </div>
                    </motion.div>
                    </AnimatePresence>
                </div>
                <AnimatePresence initial={false}>
                            <motion.div
              initial={{ height: 20 }}
              animate={{ height: isExpanded ? "auto" : 20 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden" }}
              key="box"
            >
              <div className="flex flex-col col-span-2 gap-2 justify-end items-end">
          <span
                onClick={(e) => {
                      e.preventDefault();
                      item.id && dispatch(completeToDoList(item.id));
              }}
            className={`""`}>
            {item.isComplete ? 
              <CheckCircle  /> : 
              <CheckMark  />}
          </span>
        <DrawerDialogDemo drawerType={'TimerList'} formType="add">
          <DialogTrigger asChild>
            <div
              onClick={(e) => {
                item.id && dispatch(selectToDoList(item.id));
              }}
              className="text-red-400"
              >
              <Edit />
            </div> 
          </DialogTrigger>
        </DrawerDialogDemo>
        <button
          onClick={(e) => {
            e.preventDefault();
            item.id && dispatch(delToDoList(item.id));
          }}
          className="text-red-400"
          >
          <Remove className='fill-red-500' />
        </button>
              </div>
            </motion.div>
                
         
            </AnimatePresence>
      
        </motion.div>
    </AnimatePresence>
  );
}

export default SelectedTimer;
