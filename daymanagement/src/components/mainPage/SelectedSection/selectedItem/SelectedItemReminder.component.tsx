import { Done, DoneAll } from "@/components/icons";
import { cn } from "@/lib/utils";

export const SelectedItemProggress = ({
  isFinish,
  isComplete,
  CompleteItem,
  FinishItem,
}: {
  isFinish: boolean;
  isComplete: boolean;
  CompleteItem?: () => void;
  FinishItem?: () => void;
}) => {
  return (
    <>
      {FinishItem && (
        <div className="w-full flex flex-row flex-1 gap-2 justify-between items-center">
          <label className="text-xl">Finish Item</label>
          <div
            onClick={(e) => {
              e && e.preventDefault();
              e && e.stopPropagation();
              FinishItem();
            }}
            className={cn(
              "h-8 w-8 min-w-8 flex justify-center items-center rounded-full hover:bg-card/15 cursor-pointer",
              isFinish ? "bg-success" : "bg-primary"
            )}
          >
            <DoneAll />
          </div>
        </div>
      )}
      {CompleteItem && (
        <div className="w-full flex flex-row flex-1 gap-2 justify-between items-center">
          <label className="text-xl">Done</label>
          <div
            onClick={(e) => {
              e && e.preventDefault();
              e && e.stopPropagation();
              !isFinish && CompleteItem();
            }}
            className={cn(
              "h-8 w-8 min-w-8 flex justify-center items-center rounded-full hover:bg-card/15 cursor-pointer",
              !isFinish
                ? isComplete
                  ? "bg-success"
                  : "bg-primary"
                : "bg-white/15"
            )}
          >
            <Done />
          </div>
        </div>
      )}
    </>
  );
};

export default SelectedItemProggress;
