"use client";
import { DrawerDialogDemo } from "@/components/Drawer/DrawerComponent";
import { Edit, Trash } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { TCategory } from "@/modules/category/categoryList.slice";
import { TPeople } from "@/modules/people/PeopleList.slice";
import {
  delShareList,
  selectShareList,
  TShare,
} from "@/modules/share/share.slice";
import { delSpendsListShare } from "@/modules/spends/spends.slice";
import { TTag } from "@/modules/tag/TagList.slice";
import { delVisitListShare } from "@/modules/visitsList/visit.slice";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import ShareItemSpends from "./ShareItemSpends.component";
import ShareItemVisit from "./ShareItemVisit.componen";
dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

export const ShareItem = ({ item }: { item: TShare }) => {
  const dispatch = useAppDispatch();

  const {
    ListPeople,
  }: {
    ListPeople: TPeople[];
    selectedPeople: {};
  } = useAppSelector((state) => state.PeopleList) || [];

  const peopleSelected = ListPeople
    ? ListPeople.filter((people) => people.id == item.peopleId)[0]
    : {
        id: "",
        title: "",
      };

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

  return (
    <div className="w-full h-fit flex flex-col items-start justify-start p-3 gap-y-2 rounded-2xl bg-secondary">
      <div className="w-full h-fit flex flex-row items-start justify-start rounded-2xl">
        <div className="select-none flex flex-col flex-1 gap-2 justify-start items-start">
          <div className=" select-none cursor-pointer flex col-span-4 gap-3 justify-start items-start">
            <label
              className={`cursor-pointer flex justify-center items-center gap-2`}
            >
              {peopleSelected && peopleSelected.title
                ? peopleSelected.title
                : ""}
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
                item.id && dispatch(delShareList(item.id));
                item.id &&
                  item.visitId &&
                  (dispatch(
                    delVisitListShare({ id: item.id, visitId: item.visitId })
                  ),
                  item.spendsId &&
                    dispatch(
                      delSpendsListShare({
                        id: item.id,
                        spendsId: item.spendsId,
                      })
                    ));
              }}
              className="cursor-pointer flex justify-center items-center h-5 w-5 rounded-full bg-transparent border-none"
            >
              <Trash />
            </div>
            <DrawerDialogDemo drawerType={"ShareList"} formType="Edit Share">
              <DialogTrigger asChild>
                <Button
                  onClick={(e) => {
                    item.id && dispatch(selectShareList(item.id));
                  }}
                  variant="outline"
                  className="flex justify-center items-center h-5 w-5 rounded-full bg-transparent border-none hover:bg-transparent"
                >
                  <Edit />
                </Button>
              </DialogTrigger>
            </DrawerDialogDemo>
          </div>

          <label
            className={`cursor-pointer px-2 py-1 rounded-2xl ${item.income ? "bg-success" : "bg-error"}`}
          >
            {dayjs(dayjs.unix(Number(item.date))).format("YYYY-MM-DD")} |{" "}
            {`${item.incomeAmount || item.outcomeAmount}`}
          </label>
        </div>
      </div>
      {item.visitId && <ShareItemVisit item={item} />}
      {item.spendsId && <ShareItemSpends item={item} />}
    </div>
  );
};

export default ShareItem;
