"use client";
import SelectedItemContainer from "@/components/mainPage/SelectedSection/selectedItem/SelectedItemContainer.component";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/hook";
import useSpendsList from "@/lib/Hooks/Lists/Spends/UseSpendsList.component";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";
import { delSpendsListShare } from "@/modules/spends/spends.slice";
import { selectVisitList } from "@/modules/visitsList/visit.slice";
import { BadgeDollarSign, CircuitBoard, Eye, Trash } from "lucide-react";
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
  const t: any = UseLangComponent("Selected");

  const { ListSpendsAll } = useSpendsList();
  const SpendsSelected =
    ListSpendsAll && ListSpendsAll.filter((spends) => spends.id == spendsId)[0];

  return (
    <SelectedItemContainer title={t.Spends}>
      <div className="w-full h-10 flex flex-row items-center justify-between rounded-3xl">
        <div className="flex gap-x-1 items-center">
          <BadgeDollarSign width={16} height={16} />
          <label>{`${SpendsSelected && SpendsSelected.title}`}</label>
        </div>
        <div className="flex gap-x-1">
          <Button
            onClick={(e) => {
              e && e.preventDefault();
              id &&
                spendsId &&
                dispatch(delSpendsListShare({ id: id, spendsId: spendsId }));
            }}
            className="hover:bg-error/30"
            size="sm"
          >
            <CircuitBoard width="16px" height="16px" className="text-error" />
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
