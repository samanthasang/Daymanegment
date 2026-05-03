"use client";
import { Eye, Trash } from "@/components/icons";
import SelectedItemContainer from "@/components/mainPage/SelectedSection/selectedItem/SelectedItemContainer.component";
import { useAppDispatch } from "@/lib/hook";
import useSpendsList from "@/lib/Hooks/Lists/Spends/UseSpendsList.component";
import { delSpendsShareList } from "@/modules/share/share.slice";
import { delSpendsListShare } from "@/modules/spends/spends.slice";
import { selectVisitList } from "@/modules/visitsList/visit.slice";
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
  console.log(spendsId);
  console.log(ListSpendsAll);
  console.log(SpendsSelected);

  return (
    <SelectedItemContainer title="Spends">
      <div className="w-full h-fit flex flex-row items-center justify-between rounded-2xl bg-primary">
        <label className={`cursor-pointer px-2 py-1 rounded-2x`}>
          {`${SpendsSelected && SpendsSelected.title}`}
        </label>
        <div className="flex gap-x-1">
          <div
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
            className="flex justify-center items-center h-10 w-10 flex-1 rounded-full bg-primary hover:bg-error cursor-pointer"
          >
            <Trash />
          </div>
          <div
            onClick={(e) => {
              e && e.preventDefault();
              id &&
                spendsId &&
                dispatch(
                  selectVisitList(spendsId),
                  router.push(`/spends?dateFrom=${SpendsSelected.doDate}`)
                );
            }}
            className="flex justify-center items-center h-10 w-10 flex-1 rounded-full bg-primary hover:bg-card/15 cursor-pointer"
          >
            <Eye />
          </div>
        </div>
      </div>
    </SelectedItemContainer>
  );
};

export default ShareItemSpends;
