"use client";
import { DrawerDialogDemo } from "@/components/Drawer/DrawerComponent";
import { Ballot, Done, Edit, Trash } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export const SelectedMenuBottom = ({
  selectedIsComplete = false,
  drawerType,
  formType,
  SelectItem,
  DelItem,
  CompleteItemt,
}: {
  selectedIsComplete?: boolean;
  drawerType: string;
  formType: string;
  SelectItem: () => void;
  DelItem?: () => void;
  CompleteItemt?: () => void;
}) => {
  return (
    <div className="flex justify-around w-full mx-auto gap-x-0.5">
      <div
        onClick={(e) => {
          e && e.preventDefault();
          SelectItem();
        }}
        className="flex justify-center items-center h-10 flex-1 rounded-full hover:bg-button/15 w-full cursor-pointer"
      >
        <Ballot />
      </div>
      {drawerType != "SpendsList" && DelItem && CompleteItemt && (
        <div
          onClick={(e) => {
            e && e.preventDefault();
            CompleteItemt();
          }}
          className={cn(
            "flex justify-center items-center h-10 flex-1 rounded-full hover:bg-button/15 w-full cursor-pointer",
            selectedIsComplete ? "bg-button" : "bg-primary"
          )}
        >
          <Done />
          {/* <BasicSwitch
            checked={selectedIsComplete}
            handleToggle={(e) => {
              e && e.preventDefault();
              e && e.stopPropagation();
              CompleteItemt();
            }}
            label=""
            key={"isComplete"}
          /> */}
        </div>
      )}
      {DelItem && (
        <div
          onClick={(e) => {
            e && e.preventDefault();
            e && e.stopPropagation();
            drawerType !== "MyHabbitList" && DelItem();
          }}
          className={`flex justify-center items-center h-10 flex-1 rounded-full w-full hover:bg-error cursor-pointer`}
        >
          <Trash />
        </div>
      )}
      <DrawerDialogDemo drawerType={drawerType} formType={formType}>
        <DialogTrigger asChild>
          <Button
            disabled={drawerType == "MyHabbitList"}
            variant="outline"
            className="flex justify-center items-center h-10 flex-1 rounded-full hover:bg-button/15 w-full cursor-pointer bg-transparent border-none"
          >
            <Edit />
          </Button>
        </DialogTrigger>
      </DrawerDialogDemo>
    </div>
  );
};

export default SelectedMenuBottom;
