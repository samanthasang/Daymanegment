"use client";
import SelectedItemContainer from "@/components/mainPage/SelectedSection/selectedItem/SelectedItemContainer.component";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/hook";
import useSpendsList from "@/lib/Hooks/Lists/Spends/UseSpendsList.component";
import { delSpendsShareList } from "@/modules/share/share.slice";
import { delSpendsListShare } from "@/modules/spends/spends.slice";
import { selectVisitList } from "@/modules/visitsList/visit.slice";
import { Eye, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export const ShareItemSpends = ({
  id,
  spendsId,
}: {
  id: string;
  spendsId: string;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { ListSpendsAll } = useSpendsList();
  const SpendsSelected =
    ListSpendsAll && ListSpendsAll.filter((spends) => spends.id == spendsId)[0];

  return (
    <SelectedItemContainer title="Spends">
      <div className="w-full h-10 flex flex-row items-center justify-between rounded-3xl p-1">
        <label>{`${SpendsSelected && SpendsSelected.title}`}</label>
        <div className="flex gap-x-1">
          <Button
            onClick={(e) => {
              e && e.preventDefault();
              dispatch(
                delSpendsShareList({
                  id: id,
                  spendsId: spendsId,
                })
              );
              id &&
                spendsId &&
                dispatch(delSpendsListShare({ id: id, spendsId: spendsId }));
            }}
            size="sm"
          >
            <Trash width={16} height={16} className="text-errorRed" />
          </Button>
          <Button
            onClick={(e) => {
              e && e.preventDefault();
              id &&
                spendsId &&
                dispatch(
                  selectVisitList(spendsId),
                  router.push(`/spends?dateFrom=${SpendsSelected.doDate}`)
                );
            }}
            size="sm"
          >
            <Eye width={16} height={16} />
          </Button>
        </div>
      </div>
    </SelectedItemContainer>
  );
};

export default ShareItemSpends;
