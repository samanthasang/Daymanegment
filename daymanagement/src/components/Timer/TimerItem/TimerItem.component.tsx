"use client";
import ListItem from "@/components/mainPage/listItem/ListItem.component";
import { useAppDispatch } from "@/lib/hook";
import {
  completeTimerList,
  delTimerList,
  selectTimerList,
  TTimer,
} from "@/modules/timerList/timer.slice";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { toast } from "react-toastify";
dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

export const Timeritem = ({
  item,
  selectedID,
}: {
  item: TTimer;
  selectedID?: string;
}) => {
  const dispatch = useAppDispatch();

  const SelectReminderList = () => {
    dispatch(selectTimerList(item.id));
  };
  const DelReminderList = () => {
    dispatch(delTimerList(item.id));
    toast(`${item.title} is deleted`);
  };

  const CompleteReminderList = () => {
    dispatch(
      completeTimerList({
        id: item.id,
        endDate: Math.floor(new Date().getTime() / 1000).toString(),
      })
    );
    selectTimerList("");
    item.isComplete
      ? toast(`${item.title} is uncompleted`)
      : toast(`${item.title} is completed`);
  };
  const timerTItle =
    item.title.split("-").length > 1
      ? item.title.split("-")[0] +
        "-" +
        dayjs(dayjs.unix(Number(+item.title.split("-")[1]))).format(
          "YYYY-MM-DD HH:mm:ss"
        )
      : item.title;

  const startD = dayjs.unix(Number(item.startDate));
  const endD = dayjs.unix(Number(item.endDate));
  const diff = dayjs.duration(endD.diff(startD));

  return (
    <ListItem
      id={item.id}
      title={timerTItle}
      category={item.category}
      tag={item.tag}
      isComplete={item.isComplete}
      date={item.startDate}
      diff={diff}
      drawerType="TimerList"
      formType="Edit Timer"
      selectedID={selectedID}
      SelectItem={SelectReminderList}
      DelItem={DelReminderList}
      CompleteItemt={CompleteReminderList}
    />
    // <DrawerDialogDemo drawerType={"TimerList"} formType="Edit Timer">
    //   <DialogTrigger asChild>
    //     <div
    //       onClick={(e) => {
    //         item.id && dispatch(selectTimerList(item.id));
    //       }}
    //       className="w-full h-fit cursor-pointer flex flex-row items-start justify-start border p-3 rounded-2xl border-white"
    //     >
    //       <div className="select-none cursor-pointer flex flex-col flex-1 gap-2 justify-start items-start">
    //         <div className=" select-none cursor-pointer flex col-span-4 gap-3 justify-start items-start">
    //           <label
    //             htmlFor="terms"
    //             className={`cursor-pointer flex justify-center items-center gap-2`}
    //           >
    //             {item.title}
    //           </label>
    //         </div>
    //         <div className="flex flex-row select-none cursor-pointer col-span-3 gap-2 justify-start items-start">
    //           {categorySelected && (
    //             <label
    //               className={`cursor-pointer px-2 py-1 rounded-2xl bg-white/15`}
    //             >
    //               {categorySelected.title || ""}
    //             </label>
    //           )}
    //           {tagSelected && (
    //             <label
    //               className={`cursor-pointer px-2 py-1 rounded-2xl bg-white/15`}
    //             >
    //               {tagSelected.title || ""}
    //             </label>
    //           )}
    //           {/* {item.isComplete && dayjs(dayjs.unix(Number(item.startDate))).format("YYYY-MM-DD HH:mm")}
    //             {item.isComplete && <span className="px-1">|</span>}
    //             {item.isComplete && dayjs(dayjs.unix(Number(item.endDate))).format("YYYY-MM-DD HH:mm")}
    //             {!item.isComplete && dayjs(dayjs.unix(Number(item.startDate))).format("YYYY-MM-DD HH:mm")} */}
    //         </div>
    //       </div>

    //       <div className="flex flex-col w-fit gap-2 justify-end items-end">
    //         <div className="flex flex-row gap-x-2">
    //           <div
    //             onClick={(e) => {
    //               e && e.preventDefault();
    //               item.id && dispatch(delTimerList(item.id));
    //             }}
    //             className="flex justify-center items-center h-5 w-5 bg-white/80 rounded-full"
    //           >
    //             <Trash />
    //           </div>
    //           <BasicSwitch
    //             checked={item.isComplete}
    //             handleToggle={(e) => {
    //               e && e.preventDefault();
    //               item.id &&
    //                 dispatch(
    //                   completeTimerList({
    //                     id: item.id,
    //                     endDate: Math.floor(
    //                       new Date().getTime()
    //                     ).toString(),
    //                   })
    //                 );
    //             }}
    //             label=""
    //             key={"isComplete"}
    //           />
    //         </div>

    //         <label
    //           className={`cursor-pointer px-2 py-1 rounded-2xl bg-white/15`}
    //         >
    //           {!item.isComplete &&
    //             dayjs(dayjs.unix(Number(item.startDate))).format(
    //               "YYYY-MM-DD HH:mm"
    //             )}
    //           {item.isComplete && `${diff.hours()}:${diff.minutes()}`}
    //         </label>
    //       </div>
    //     </div>
    //   </DialogTrigger>
    // </DrawerDialogDemo>
  );
};

export default Timeritem;
