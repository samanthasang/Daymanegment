"use client";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/hook";
import useShareList from "@/lib/Hooks/Lists/Share/UseShareList.component";
import {
  delShareList,
  delVisitShareList,
  selectShareList,
} from "@/modules/share/share.slice";
import { delSpendsListShare } from "@/modules/spends/spends.slice";
import { Eye, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export const SelectedShareItem = ({
  id,
  shareid,
  drawerType,
}: {
  id: string;
  shareid: string;
  drawerType: string;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { ListShareAll } = useShareList();

  const share = ListShareAll.filter((share) => share.id == shareid)[0];

  return (
    <div className="w-full h-10 flex flex-row items-center justify-between rounded-3xl p-1 ">
      <label>{`${share && share.title}`}</label>
      <div className="flex gap-x-1">
        <Button
          onClick={(e) => {
            e && e.preventDefault();
            dispatch(delShareList(shareid));
            drawerType == "Spends" &&
              dispatch(delSpendsListShare({ id, spendsId: shareid }));
            drawerType == "Visits" &&
              dispatch(delVisitShareList({ id, visitId: shareid }));
          }}
          className="hover:bg-error/30"
          size="sm"
        >
          <Trash width="16px" height="16px" className="text-error" />
        </Button>
        <Button
          onClick={(e) => {
            e && e.preventDefault();
            shareid &&
              shareid &&
              dispatch(
                selectShareList(shareid),
                router.push(`/shares?dateFrom=${share.doDate}`)
              );
          }}
          size="sm"
        >
          <Eye width={16} height={16} />
        </Button>
      </div>
    </div>
  );
};

export default SelectedShareItem;
