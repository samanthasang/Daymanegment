"use client";
import SelectedItemContainer from "@/components/mainPage/SelectedSection/selectedItem/SelectedItemContainer.component";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/hook";
import useVisitList from "@/lib/Hooks/Lists/Visit/UseVisitList.component";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";
import {
  delVisitListShare,
  selectVisitList,
} from "@/modules/visitsList/visit.slice";
import { BookUser, Eye, Trash } from "lucide-react";
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
  const t: any = UseLangComponent("Selected");

  const { ListVisitAll } = useVisitList();
  const VisitSelected =
    ListVisitAll && ListVisitAll.filter((visit) => visit.id == visitId)[0];

  return (
    <SelectedItemContainer title={t.Visit}>
      <div className="w-full h-10 flex flex-row items-center justify-between rounded-3xl">
        <div className="flex gap-x-1 items-center">
          <BookUser width={16} height={16} />
          <label>{`${VisitSelected && VisitSelected.title}`}</label>
        </div>
        <div className="flex gap-x-1">
          <Button
            onClick={(e) => {
              e && e.preventDefault();
              id &&
                visitId &&
                dispatch(delVisitListShare({ id: id, visitId: visitId }));
            }}
            className="hover:bg-error/30"
            size="sm"
          >
            <Trash width="16px" height="16px" className="text-error" />
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
