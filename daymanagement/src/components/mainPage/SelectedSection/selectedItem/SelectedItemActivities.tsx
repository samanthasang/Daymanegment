import DrawerButton from "@/components/Drawer/DrawerButton.component";
import { Button } from "@/components/ui/button";
import {
  CalendarCog,
  CalendarPlus,
  CalendarPlus2,
  CalendarSync,
  CheckCircle,
  CircleDollarSign,
  CircleOff,
  CircleX,
  Copy,
  PauseCircle,
  Trash,
} from "lucide-react";

export const SelectedItemActivities = ({
  drawerType,
  drawerTitle,
  isFinish,
  isComplete,
  isPause,
  isToday,
  isPaymentComplete,
  FinishItem,
  CompleteItem,
  DelItem,
  PauseItem,
  UndoneItem,
  DuplicateItem,
  BringTodayItem,
  DuplicateTodayItem,
  AddOneDayToItem,
  AddSevenDaysToItem,
  PaymentCompleteItem,
}: {
  drawerType: string;
  drawerTitle: string;
  isFinish?: boolean;
  isComplete: boolean;
  isPause?: boolean;
  isToday?: boolean;
  isPaymentComplete?: boolean;
  FinishItem?: () => void;
  CompleteItem?: () => void;
  DelItem?: () => void;
  PauseItem?: () => void;
  UndoneItem?: () => void;
  DuplicateItem?: () => void;
  BringTodayItem?: () => void;
  DuplicateTodayItem?: () => void;
  AddOneDayToItem?: () => void;
  AddSevenDaysToItem?: () => void;
  PaymentCompleteItem?: () => void;
}) => {
  return (
    <>
      {PauseItem && (
        <div className="w-full flex flex-row flex-1 gap-2 justify-between items-center">
          <label>Pause</label>
          <Button
            onClick={(e) => {
              e && e.preventDefault();
              e && e.stopPropagation();
              e && PauseItem();
            }}
            className={isPause ? "bg-blue-500" : "bg-primary"}
          >
            <PauseCircle width={16} height={16} />
          </Button>
        </div>
      )}
      {FinishItem && (
        <div className="w-full flex flex-row flex-1 gap-2 justify-between items-center">
          <label>Finish</label>
          <Button
            onClick={(e) => {
              e && e.preventDefault();
              e && e.stopPropagation();
              e && !isPause && FinishItem();
            }}
            className={!isFinish ? "bg-primary" : "bg-blue-500"}
          >
            <CircleOff width={16} height={16} />
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
              e && isComplete && !isPause && !isFinish && UndoneItem();
            }}
            className={!isFinish ? "bg-primary" : "bg-white/15"}
            variant="default"
          >
            <CircleX width={16} height={16} />
          </Button>
        </div>
      )}
      {PaymentCompleteItem && (
        <div className="w-full flex flex-row flex-1 gap-2 justify-between items-center">
          <label>Payment Complete</label>
          <Button
            disabled={!isPaymentComplete}
            onClick={(e) => {
              e && e.preventDefault();
              e && e.stopPropagation();
              e && PaymentCompleteItem();
            }}
            variant="default"
          >
            <CircleDollarSign
              width={16}
              height={16}
              className="text-successGreen"
            />
          </Button>
        </div>
      )}
      {DuplicateItem && (
        <div className="w-full flex flex-row flex-1 gap-2 justify-between items-center">
          <label>Duplicate</label>
          <DrawerButton
            drawerType={drawerType}
            formType="duplicate"
            drawerTitle={drawerTitle}
          >
            <Copy width={16} height={16} />
          </DrawerButton>
        </div>
      )}
      {DuplicateTodayItem && (
        <div className="w-full flex flex-row flex-1 gap-2 justify-between items-center">
          <label>Duplicate For Today</label>
          <Button
            disabled={isToday}
            onClick={(e) => {
              e && e.preventDefault();
              e && e.stopPropagation();
              e && DuplicateTodayItem();
            }}
          >
            <CalendarCog width={16} height={16} />
          </Button>
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
      {AddOneDayToItem && (
        <div className="w-full flex flex-row flex-1 gap-2 justify-between items-center">
          <label>Add 1 Day</label>
          <Button
            disabled={isComplete}
            onClick={(e) => {
              e && e.preventDefault();
              e && e.stopPropagation();
              e && AddOneDayToItem();
            }}
          >
            <CalendarPlus2 width={16} height={16} />
          </Button>
        </div>
      )}
      {AddSevenDaysToItem && (
        <div className="w-full flex flex-row flex-1 gap-2 justify-between items-center">
          <label>Add 7 Days</label>
          <Button
            disabled={isComplete}
            onClick={(e) => {
              e && e.preventDefault();
              e && e.stopPropagation();
              e && AddSevenDaysToItem();
            }}
          >
            <CalendarPlus width={16} height={16} />
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
            className="hover:bg-error/30"
          >
            <Trash width="16px" height="16px" className="text-error" />
          </Button>
        </div>
      )}
    </>
  );
};

export default SelectedItemActivities;
