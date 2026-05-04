import DrawerButton from "@/components/Drawer/DrawerButton.component";
import { DoneAll } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  CalendarSync,
  CheckCircle,
  Copy,
  Pause,
  Trash,
  UndoIcon,
} from "lucide-react";

export const SelectedItemActivities = ({
  drawerType,
  drawerTitle,
  isFinish,
  isComplete,
  isPause,
  isToday,
  FinishItem,
  CompleteItem,
  DelItem,
  PauseItem,
  UndoneItem,
  DuplicateItem,
  BringTodayItem,
}: {
  drawerType: string;
  drawerTitle: string;
  isFinish?: boolean;
  isComplete: boolean;
  isPause?: boolean;
  isToday?: boolean;
  FinishItem?: () => void;
  CompleteItem?: () => void;
  DelItem?: () => void;
  PauseItem?: () => void;
  UndoneItem?: () => void;
  DuplicateItem?: () => void;
  BringTodayItem?: () => void;
}) => {
  return (
    <>
      {FinishItem && (
        <div className="w-full flex flex-row flex-1 gap-2 justify-between items-center">
          <label>Finish Item</label>
          <Button
            onClick={(e) => {
              e && e.preventDefault();
              e && e.stopPropagation();
              e && !isPause && FinishItem();
            }}
          >
            <DoneAll width={16} height={16} />
          </Button>
        </div>
      )}
      {CompleteItem && (
        <div className="w-full flex flex-row flex-1 gap-2 justify-between items-center">
          <label>Done</label>
          <Button
            disabled={isComplete && isPause && isFinish}
            onClick={(e) => {
              e && e.preventDefault();
              e && e.stopPropagation();
              e && !isComplete && !isPause && !isFinish && CompleteItem();
            }}
            className={
              !isFinish
                ? isComplete
                  ? "bg-success"
                  : "bg-primary"
                : "bg-white/15"
            }
          >
            <CheckCircle width={16} height={16} />
          </Button>
        </div>
      )}
      {UndoneItem && (
        <div className="w-full flex flex-row flex-1 gap-2 justify-between items-center">
          <label>Undone</label>
          <Button
            disabled={!isFinish && !isPause && !isComplete}
            onClick={(e) => {
              e && e.preventDefault();
              e && e.stopPropagation();
              e && UndoneItem();
            }}
            variant="default"
          >
            <UndoIcon width={16} height={16} />
          </Button>
        </div>
      )}
      {DuplicateItem && (
        <div className="w-full flex flex-row flex-1 gap-2 justify-between items-center">
          <label>Duplicate</label>
          <DrawerButton
            drawerType={drawerType}
            formType="duplicate"
            // drawerTitle={drawerTitle.split("s")[0]}
            drawerTitle={drawerTitle}
          >
            <Copy width={16} height={16} />
          </DrawerButton>
        </div>
      )}
      {BringTodayItem && (
        <div className="w-full flex flex-row flex-1 gap-2 justify-between items-center">
          <label>Bring Today</label>
          <Button
            disabled={isToday}
            onClick={(e) => {
              e && e.preventDefault();
              e && e.stopPropagation();
              e && BringTodayItem();
            }}
          >
            <CalendarSync width={16} height={16} />
          </Button>
        </div>
      )}
      {PauseItem && (
        <div className="w-full flex flex-row flex-1 gap-2 justify-between items-center">
          <label>Pause</label>
          <Button
            onClick={(e) => {
              e && e.preventDefault();
              e && e.stopPropagation();
              e && !isPause && PauseItem();
            }}
          >
            <Pause width={16} height={16} />
          </Button>
        </div>
      )}
      {DelItem && (
        <div className="w-full flex flex-row flex-1 gap-2 justify-between items-center">
          <label>Delete</label>
          <Button
            onClick={(e) => {
              e && e.preventDefault();
              e && e.stopPropagation();
              e && DelItem();
            }}
            className="hover:bg-errorRed"
          >
            <Trash width={16} height={16} className="text-errorRed" />
          </Button>
        </div>
      )}
    </>
  );
};

export default SelectedItemActivities;
