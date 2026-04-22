"use client";
import { Eye, Trash } from "@/components/icons";
import SelectedItemContainer from "@/components/mainPage/SelectedSection/selectedItem/SelectedItemContainer.component";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { delSpendsShareList, TShare } from "@/modules/share/share.slice";
import { delSpendsListShare, TSpends } from "@/modules/spends/spends.slice";
import { selectVisitList } from "@/modules/visitsList/visit.slice";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useRouter } from "next/navigation";
dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

export const ShareItemSpends = ({ item }: { item: TShare }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    ListSpends,
  }: {
    ListSpends: TSpends[];
  } = useAppSelector((state) => state.SpendsList) || [];
  const SpendsSelected =
    ListSpends && ListSpends.filter((visit) => visit.id == item.spendsId)[0];

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
                  id: item.id,
                  spendsId: item.spendsId,
                })
              );
              item.id &&
                item.visitId &&
                dispatch(
                  delSpendsListShare({ id: item.id, spendsId: item.spendsId })
                );
            }}
            className="flex justify-center items-center h-10 w-10 flex-1 rounded-full bg-primary hover:bg-error cursor-pointer"
          >
            <Trash />
          </div>
          <div
            onClick={(e) => {
              e && e.preventDefault();
              item.id &&
                item.visitId &&
                dispatch(
                  selectVisitList(item.visitId),
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
