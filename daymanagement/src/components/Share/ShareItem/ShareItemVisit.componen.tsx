"use client";
import SelectedItemContainer from "@/components/mainPage/SelectedSection/selectedItem/SelectedItemContainer.component";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/hook";
import useVisitList from "@/lib/Hooks/Lists/Visit/UseVisitList.component";
import { delVisitShareList } from "@/modules/share/share.slice";
import {
  delVisitListShare,
  selectVisitList,
} from "@/modules/visitsList/visit.slice";
import { Eye, Trash } from "lucide-react";
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
      <div className="w-full h-10 flex flex-row items-center justify-between rounded-3xl p-1">
        <label>{`${VisitSelected && VisitSelected.title}`}</label>
        <div className="flex gap-x-1">
          <Button
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
            size="sm"
          >
            <Trash width={16} height={16} className="text-errorRed" />
          </Button>
          <Button
            onClick={(e) => {
              e && e.preventDefault();
              id &&
                visitId &&
                dispatch(
                  selectVisitList(visitId),
                  router.push(`/visits?dateFrom=${VisitSelected.doDate}`)
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

export default ShareItemVisit;
