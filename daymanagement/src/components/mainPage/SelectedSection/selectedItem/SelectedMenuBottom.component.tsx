"use client";
import DrawerButton from "@/components/Drawer/DrawerButton.component";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Edit, List, Trash, CheckCircle } from "lucide-react";

export const SelectedMenuBottom = ({
  drawerType,
  formType,
  isFinish,
  isComplete,
  isPause,
  SelectItem,
  DelItem,
  CompleteItem,
  FinishItem,
}: {
  isFinish?: boolean;
  isComplete?: boolean;
  isPause?: boolean;
  drawerType: string;
  formType: string;
  SelectItem: () => void;
  DelItem?: () => void;
  CompleteItem?: () => void;
  FinishItem?: () => void;
}) => {
  return (
    <div className="flex justify-around w-full mx-auto gap-x-0.5">
      <Button
        className="flex-1"
        onClick={(e) => {
          e && e.preventDefault();
          SelectItem();
        }}
        variant="default"
      >
        <List />
      </Button>
      {drawerType != "SpendsList" && DelItem && CompleteItem && (
        <Button
          disabled={isComplete && isPause && isFinish}
          onClick={(e) => {
            e && e.preventDefault();
            e && !isComplete && !isPause && !isFinish && CompleteItem();
          }}
          className={cn("flex-1", isComplete ? "bg-success" : "bg-primary")}
        >
          <CheckCircle width={16} height={16} />
        </Button>
      )}
      {DelItem && (
        <Button
          onClick={(e) => {
            e && e.preventDefault();
            e && e.stopPropagation();
            e && DelItem();
          }}
          className="hover:bg-errorRed flex-1"
        >
          <Trash width={16} height={16} className="text-errorRed" />
        </Button>
      )}
      <DrawerButton
        drawerType={drawerType}
        formType={formType}
        className="flex-1"
      >
        <Edit />
      </DrawerButton>
    </div>
  );
};

export default SelectedMenuBottom;
