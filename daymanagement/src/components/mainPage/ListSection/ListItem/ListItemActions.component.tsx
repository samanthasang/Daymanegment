import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/hook";
import {
  CheckCircle,
  CircleOff,
  LucideCalendarSync,
  PauseCircle,
  Trash,
} from "lucide-react";

export const ListItemActions = ({
  isComplete,
  isFinish,
  isPause,
  isToday,
  score,
  hasShare,
  drawerType,
  withDel = true,
  DelItem,
  CompleteItem,
  BringToday,
  UpdateItem,
}: {
  isComplete?: boolean;
  isFinish?: boolean;
  isPause?: boolean;
  isToday?: boolean;
  score?: number;
  hasShare?: boolean;
  drawerType: string;
  withDel?: boolean;
  DelItem?: () => void;
  CompleteItem?: () => void;
  BringToday?: () => void;
  UpdateItem?: () => void;
}) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-row gap-x-2 items-center">
      {!isToday && BringToday && (
        <Button
          onClick={(e) => {
            e && e.preventDefault();
            e && e.stopPropagation();
            e && BringToday();
          }}
          variant="default"
        >
          <LucideCalendarSync />
        </Button>
      )}
      {withDel && DelItem && (
        <Button
          onClick={(e) => {
            e && e.preventDefault();
            e && e.stopPropagation();
            e && !(hasShare || (score == 0 && score)) && DelItem();
          }}
          className="hover:bg-error/30"
          variant="default"
        >
          <Trash width="16px" height="16px" className="text-error" />
        </Button>
      )}
      {/* {drawerType == "Friends" && id && (
        <DrawerDialogDemo
          drawerType="Friends"
          formType={`Edit ${title}`}
          drawerTitle="Friend"
        >
          <DialogTrigger asChild>
            <Button
              onClick={(e) => {
                e && e.stopPropagation();
                e && dispatch(selectPeopleList(id));
              }}
              variant="default"
            >
              <Edit />
            </Button>
          </DialogTrigger>
        </DrawerDialogDemo>
      )} */}
      {drawerType != "Spends" && (
        <>
          {UpdateItem && (
            <Button
              onClick={(e) => {
                e && e.preventDefault();
                e && e.stopPropagation();
                e && UpdateItem();
              }}
              className={isPause ? "bg-blue-500" : "bg-primary"}
            >
              <PauseCircle />
            </Button>
          )}
          {CompleteItem && (
            <Button
              disabled={isComplete && isPause && isFinish}
              onClick={(e) => {
                e && e.preventDefault();
                e && e.stopPropagation();
                e && !isComplete && CompleteItem();
              }}
              className={
                !isFinish
                  ? isComplete
                    ? "bg-success"
                    : "bg-primary"
                  : "bg-white/15"
              }
              variant="default"
            >
              <CheckCircle width={16} height={16} />
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default ListItemActions;
