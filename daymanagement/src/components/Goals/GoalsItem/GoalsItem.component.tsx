"use client";
import { DrawerDialogDemo } from "@/components/Drawer/DrawerComponent";
import {
  ChevronSmallDoubleUp,
  ChevronSmallTripleUp,
  ChevronSmallUp,
  Trash,
} from "@/components/icons";
import BasicSwitch from "@/components/ui/BasicSwitch";
import { DialogTrigger } from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { TCategory } from "@/modules/category/categoryList.slice";
import {
  completeGoalList,
  delGoalList,
  selectGoalList,
  TGoals,
} from "@/modules/goalsList/goals.slice";
import { TTag } from "@/modules/tag/TagList.slice";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

const currentUnixTimestamp = dayjs().unix();

export const GoalsItem = ({ item }: { item: TGoals }) => {
  const dispatch = useAppDispatch();

  const {
    ListCategory,
  }: {
    ListCategory: TCategory[];
    selectedCategory: {};
  } = useAppSelector((state) => state.CategoryList) || [];

  const categorySelected = ListCategory
    ? ListCategory.filter((category) => category.id == item.category)[0]
    : {
        id: "",
        title: "",
      };

  const {
    ListTag,
  }: {
    ListTag: TTag[];
    selectedTag: {};
  } = useAppSelector((state) => state.TagList) || [];

  const tagSelected = ListTag
    ? ListTag.filter((category) => category.id == item.tag)[0]
    : {
        id: "",
        title: "",
      };

  const priorityIcon = () => {
    switch (item.priority) {
      case "High":
        return <ChevronSmallTripleUp className="fill-red-500" />;
      case "Medium":
        return <ChevronSmallDoubleUp className="fill-red-500" />;
      case "Low":
        return <ChevronSmallUp className="fill-red-500" />;

      default:
        return <ChevronSmallTripleUp className="fill-red-500" />;
    }
  };

  return (
    <DrawerDialogDemo drawerType={"GoalsList"} formType="Edit Goals">
      <DialogTrigger disabled={!item.isComplete} asChild>
        <div
          onClick={(e) => {
            item.id && !item.isComplete && dispatch(selectGoalList(item.id));
          }}
          className="w-full h-fit cursor-pointer flex flex-row items-start justify-start border p-3 rounded-2xl border-white"
        >
          <div className="select-none cursor-pointer flex flex-col flex-1 gap-2 justify-start items-start">
            <div className=" select-none cursor-pointer flex col-span-4 gap-3 justify-start items-start">
              <label
                htmlFor="terms"
                className={`cursor-pointer flex justify-center items-center gap-2`}
              >
                {priorityIcon()}
                {item.title}
              </label>
            </div>
            <div className="flex flex-row select-none cursor-pointer col-span-3 gap-2 justify-start items-start">
              {categorySelected && (
                <label
                  className={`cursor-pointer px-2 py-1 rounded-2xl bg-white/15`}
                >
                  {categorySelected.title || ""}
                </label>
              )}
              {tagSelected && (
                <label
                  className={`cursor-pointer px-2 py-1 rounded-2xl bg-white/15`}
                >
                  {tagSelected.title || ""}
                </label>
              )}
            </div>
          </div>
          <div className="flex flex-col w-fit gap-2 justify-end items-end">
            <div className="flex flex-row gap-x-2">
              <div
                onClick={(e) => {
                  e && e.preventDefault();
                  item.id && dispatch(delGoalList(item.id));
                }}
                className="flex justify-center items-center h-5 w-5 bg-white/80 rounded-full"
              >
                <Trash />
              </div>
              <BasicSwitch
                checked={item.isComplete}
                handleToggle={(e) => {
                  e && e.preventDefault();
                  item.id &&
                    !item.isComplete &&
                    dispatch(
                      completeGoalList({
                        id: item.id,
                        score: dayjs
                          .unix(+item.date)
                          .diff(dayjs.unix(currentUnixTimestamp), "day"),
                      })
                    );
                }}
                label=""
                key={"isComplete"}
              />
            </div>

            <label
              className={`cursor-pointer px-2 py-1 rounded-2xl ${
                item.score
                  ? item.score > 15
                    ? "bg-white/80"
                    : item.score > 10
                      ? "bg-green-500/15"
                      : "bg-red-600/15"
                  : dayjs
                        .unix(+item.date)
                        .diff(dayjs.unix(currentUnixTimestamp), "day") > 15
                    ? "bg-white/80"
                    : dayjs
                          .unix(+item.date)
                          .diff(dayjs.unix(currentUnixTimestamp), "day") > 10
                      ? "bg-green-500/15"
                      : "bg-red-600/15"
              }`}
            >
              {!item.isComplete &&
                dayjs(dayjs.unix(Number(item.date))).format("YYYY-MM-DD")}
              {!item.isComplete && ` | `}
              {dayjs
                .unix(+item.date)
                .diff(dayjs.unix(currentUnixTimestamp), "day")}
            </label>
          </div>
        </div>
      </DialogTrigger>
    </DrawerDialogDemo>
  );
};

export default GoalsItem;
