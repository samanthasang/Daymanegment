"use client";
import { Eye, Trash } from "@/components/icons";
import SelectedItemContainer from "@/components/mainPage/SelectedSection/selectedItem/SelectedItemContainer.component";
import { useAppDispatch } from "@/lib/hook";
import useVisitList from "@/lib/Hooks/Lists/Visit/UseVisitList.component";
import { delVisitShareList } from "@/modules/share/share.slice";
import {
  delVisitListShare,
  selectVisitList
} from "@/modules/visitsList/visit.slice";
import { useRouter } from "next/navigation";

export const ShareItemVisit = ({
  id,
  visitId,
}: {
  id: string;
  visitId: string;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { ListVisitAll } = useVisitList();
  const VisitSelected =
    ListVisitAll && ListVisitAll.filter((visit) => visit.id == visitId)[0];

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
                  id: id,
                  visitId: visitId,
                })
              );
              id &&
                visitId &&
                dispatch(delVisitListShare({ id: id, visitId: visitId }));
            }}
            className="flex justify-center items-center h-10 w-10 flex-1 rounded-full bg-primary hover:bg-error cursor-pointer"
          >
            <Trash />
          </div>
          <div
            onClick={(e) => {
              e && e.preventDefault();
              id &&
                visitId &&
                dispatch(
                  selectVisitList(visitId),
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
