"use client";
import { DrawerDialogDemo } from "@/components/Drawer/DrawerComponent";
import ListCategorySelected from "@/components/mainPage/ListSection/listCategorySelected/ListCategorySelected.component";
import ListTagSelected from "@/components/mainPage/ListSection/listTagSelected/ListTagSelected.component";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { DayUnixFormat } from "@/lib/Hooks/UseDayJS";
import { cn } from "@/lib/utils";
import { TPeople } from "@/modules/people/PeopleList.slice";
import {
  delShareList,
  selectShareList,
  TShare,
} from "@/modules/share/share.slice";
import { delSpendsListShare } from "@/modules/spends/spends.slice";
import { delVisitListShare } from "@/modules/visitsList/visit.slice";
import { Edit, Eye, Trash, User } from "lucide-react";
import { useRouter } from "next/navigation";
import ShareItemSpends from "./ShareItemSpends.component";
import ShareItemVisit from "./ShareItemVisit.componen";

export const ShareItemInner = ({ item }: { item: TShare }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    ListPeople,
  }: {
    ListPeople: TPeople[];
    selectedPeople: {};
  } = useAppSelector((state) => state.Friends) || [];

  const peopleSelected =
    ListPeople && ListPeople.filter((people) => people.id == item.peopleId)[0];

  return (
    <div className="w-full h-fit flex flex-col items-start justify-start p-2 gap-y-2 rounded-3xl bg-secondary">
      <div className="w-full h-fit flex flex-row rounded-3xl">
        <div className="select-none flex flex-col flex-1 gap-2 justify-start items-start">
          <div className="flex flex-row gap-x-1 justify-start items-center">
            <User width={16} height={16} />
            <label>
              {peopleSelected && peopleSelected.title
                ? peopleSelected.title
                : ""}
            </label>
          </div>
          <div className="flex flex-row select-none cursor-pointer col-span-3 gap-2 justify-start items-start">
            {item.category && <ListCategorySelected category={item.category} />}

            {item.tag && <ListTagSelected tag={item.tag} />}
          </div>
        </div>
        <div className="flex flex-col w-fit gap-y-2 justify-end items-end">
          <div className="flex flex-row gap-x-2">
            <Button
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
              size="sm"
            >
              <Trash width={16} height={16} className="text-errorRed" />
            </Button>
            <DrawerDialogDemo
              drawerType="Shares"
              formType="Edit"
              drawerTitle="Share"
            >
              <DialogTrigger asChild>
                <Button
                  onClick={(e) => {
                    item.id && dispatch(selectShareList(item.id));
                  }}
                  size="sm"
                >
                  <Edit width={16} height={16} />
                </Button>
              </DialogTrigger>
            </DrawerDialogDemo>
            <Button
              onClick={(e) => {
                e && e.preventDefault();
                item.id &&
                  item.id &&
                  dispatch(
                    selectShareList(item.id),
                    router.push(`/shares?dateFrom=${item.doDate}`)
                  );
              }}
              size="sm"
            >
              <Eye width={16} height={16} />
            </Button>
          </div>

          <label
            className={cn(
              "cursor-pointer px-2 py-1 rounded-2xl ",
              item.income ? "bg-success" : "bg-error"
            )}
          >
            {DayUnixFormat(item.doDate, "YYYY-MM-DD")} |{" "}
            {`${item.incomeAmount || item.outcomeAmount}`}
          </label>
        </div>
      </div>
      {item.visitId && <ShareItemVisit id={item.id} visitId={item.visitId} />}
      {item.spendsId && (
        <ShareItemSpends id={item.id} spendsId={item.spendsId} />
      )}
    </div>
  );
};

export default ShareItemInner;
