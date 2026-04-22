"use client";
import { Eye, Trash } from "@/components/icons";
import SelectedItemContainer from "@/components/mainPage/SelectedSection/selectedItem/SelectedItemContainer.component";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { delVisitShareList, TShare } from "@/modules/share/share.slice";
import {
  delVisitListShare,
  selectVisitList,
  TVisit,
} from "@/modules/visitsList/visit.slice";
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

export const ShareItemVisit = ({ item }: { item: TShare }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    ListVisit,
  }: {
    ListVisit: TVisit[];
  } = useAppSelector((state) => state.visit) || [];
  const VisitSelected =
    ListVisit && ListVisit.filter((visit) => visit.id == item.visitId)[0];

  return (
    <SelectedItemContainer title="Visit">
      <div className="w-full h-fit flex flex-row items-center justify-between rounded-2xl bg-primary">
        <label className={`cursor-pointer px-2 py-1 rounded-2x`}>
          {`${VisitSelected && VisitSelected.title}`}
        </label>
        <div className="flex gap-x-1">
          <div
            onClick={(e) => {
              e && e.preventDefault();
              dispatch(
                delVisitShareList({
                  id: item.id,
                  visitId: item.visitId,
                })
              );
              item.id &&
                item.visitId &&
                dispatch(
                  delVisitListShare({ id: item.id, visitId: item.visitId })
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
                  router.push(`/visits?dateFrom=${VisitSelected.doDate}`)
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

export default ShareItemVisit;
