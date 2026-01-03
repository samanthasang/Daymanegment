"use client"
import { DrawerDialogDemo } from "@/components/Drawer/DrawerComponent";
import { CheckCircle, CheckMark, ChevronSmallDoubleUp, ChevronSmallTripleUp, ChevronSmallUp, Edit, Remove } from "@/components/table";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { TCategory } from "@/modules/category/categoryList.slice";
import { completeHabbitList, delHabbitList, selectHabbitList, Thabbit, updateHabbitList } from "@/modules/habbitList/habbit.slice";
import { completeMyHaBBITList, delMyHaBBITList, selectMyHaBBITList, updateMyHaBBITList } from "@/modules/myHabbitList/myHabbit.slice";
import { TTag } from "@/modules/tag/TagList.slice";
import { DialogTrigger } from "@radix-ui/react-dialog";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.extend(utc);
dayjs.extend(timezone);

const currentUnixTimestamp = dayjs().unix(); 

export const MyHabbitItem = ({ item }: {item : Thabbit }) =>  {
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
  useEffect(() => {
    console.log("lastUpdate ",item.title , dayjs.unix(item.lastUpdate).diff(dayjs.unix(currentUnixTimestamp), 'day') > 2);
    console.log("currentUnixTimestamp ",item.title , dayjs.unix(currentUnixTimestamp).diff(dayjs.unix(item.lastUpdate), 'day') > 2);

    if (dayjs.unix(currentUnixTimestamp).diff(dayjs.unix(item.lastUpdate), 'day') > 2) {
      console.log(item.lastUpdate , dayjs.unix(item.lastUpdate).diff(dayjs.unix(currentUnixTimestamp), 'day') > 2);
      console.log(currentUnixTimestamp , dayjs.unix(item.lastUpdate).diff(dayjs.unix(currentUnixTimestamp), 'day') > 2);
      dispatch(updateMyHaBBITList({
        id: item.id || "",
        title: item.title,
        description: item.description,
        score: item.score - dayjs.unix(currentUnixTimestamp).diff(dayjs.unix(item.lastUpdate), 'day'),
        priority: item.priority,
        lastUpdate: currentUnixTimestamp,
        completeUpdate: item.completeUpdate,
        category: item.category,
        tag: item.tag,
      }))
    }
      
  }, [])
  
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
            {item.title}{`(${item.score || 0})`}
          </label>
        </div>
      <div 
        className="select-none cursor-pointer flex col-span-3 gap-2 justify-start items-start">
          <label
            htmlFor="terms"
            className={`cursor-pointer flex justify-center items-center gap-2`}>
            
            { item.priority == "High" && <ChevronSmallTripleUp className='fill-red-500' />}
            { item.priority == "Medium" && <ChevronSmallDoubleUp className='fill-red-500' />}
            { item.priority == "Low" && <ChevronSmallUp className='fill-red-500' />}
            {item.priority}
          </label>
          </div>
          <AnimatePresence initial={false}>         
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: isExpanded ? "auto" : 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden" }}
              key="box"
            >
          <div className="flex flex-col select-none cursor-pointer col-span-3 gap-2 justify-start items-start">
                  <label
                    className={`cursor-pointer`}>
                      {categorySelected && categorySelected.title || ""}
                  </label>
                  <label
                    className={`cursor-pointer`}>
                      {tagSelected && tagSelected.title || ""}
                </label>
                <label
                    htmlFor="terms"
                    className={`cursor-pointer`}>
                      {dayjs(dayjs.unix(Number(item.lastUpdate))).format("YYYY-MM-DD")}
                  </label>
                  <label
                    htmlFor="terms"
                    className={`cursor-pointer`}>
                      {dayjs(dayjs.unix(Number(item.completeUpdate))).format("YYYY-MM-DD")}
                  </label>
                  <label
                    htmlFor="terms"
                    className={`cursor-pointer`}>
                      {dayjs(dayjs.unix(Number(currentUnixTimestamp))).format("YYYY-MM-DD")}
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
                      dayjs(dayjs.unix(Number(item.completeUpdate))).format("DD")
                         !=  dayjs(dayjs.unix(Number(currentUnixTimestamp))).format("DD") && item.id && dispatch(completeMyHaBBITList(item.id));
              }}
            className={`""`}>
            {dayjs(dayjs.unix(Number(item.completeUpdate))).format("DD")
                         ==  dayjs(dayjs.unix(Number(currentUnixTimestamp))).format("DD") ? 
              <CheckCircle  /> : 
              <CheckMark  />}
          </span>
        <DrawerDialogDemo drawerType={'MyHaBBITList'} formType="add">
          <DialogTrigger asChild>
            <div
              onClick={(e) => {
                item.id && dispatch(selectMyHaBBITList(item.id));
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
            item.id && dispatch(delMyHaBBITList(item.id));
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

export default MyHabbitItem;
