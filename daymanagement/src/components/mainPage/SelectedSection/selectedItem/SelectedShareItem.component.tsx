"use client";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/hook";
import useShareList from "@/lib/Hooks/Lists/Share/UseShareList.component";
import { delShareList, selectShareList } from "@/modules/share/share.slice";
import { Eye, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export const SelectedShareItem = ({ id }: { id: string }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { ListShareAll } = useShareList();

  const share = ListShareAll.filter((share) => share.id == id)[0];

  return (
    <div className="w-full h-10 flex flex-row items-center justify-between rounded-3xl p-1 ">
      <label>{`${share && share.title}`}</label>
      <div className="flex gap-x-1">
        <Button
          onClick={(e) => {
            e && e.preventDefault();
            dispatch(delShareList(id));
          }}
          size="sm"
        >
          <Trash width={16} height={16} className="text-errorRed" />
        </Button>
        <Button
          onClick={(e) => {
            e && e.preventDefault();
            id &&
              id &&
              dispatch(
                selectShareList(id),
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
