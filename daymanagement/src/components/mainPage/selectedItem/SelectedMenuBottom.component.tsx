"use client";
import { DrawerDialogDemo } from "@/components/Drawer/DrawerComponent";
import { Ballot, Edit, Trash } from "@/components/icons";
import BasicSwitch from "@/components/ui/BasicSwitch";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

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
    <div className="flex justify-around w-full mx-auto h-10 px-1 absolute bottom-0 left-0 right-0">
      <div
        onClick={(e) => {
          e && e.preventDefault();
          SelectItem();
        }}
        className="flex justify-center items-center h-9 flex-1 rounded-full hover:bg-slate-800 w-full cursor-pointer"
      >
        <Ballot />
      </div>
      {drawerType != "SpendsList" && DelItem && CompleteItemt && (
        <div
          onClick={(e) => {
            e && e.preventDefault();
            CompleteItemt();
          }}
          className="flex justify-center items-center h-9 flex-1 rounded-full hover:bg-slate-800 w-full cursor-pointer"
        >
          <BasicSwitch
            checked={selectedIsComplete}
            handleToggle={(e) => {
              e && e.preventDefault();
              e && e.stopPropagation();
              CompleteItemt();
            }}
            label=""
            key={"isComplete"}
          />
        </div>
      )}
      {DelItem && (
        <div
          onClick={(e) => {
            e && e.preventDefault();
            e && e.stopPropagation();
            drawerType !== "MyHabbitList" && DelItem();
          }}
          className={`flex justify-center items-center h-9 flex-1 rounded-full w-full ${drawerType == "MyHabbitList" ? "opacity-85 bg-slate-800/50 cursor-default" : "hover:bg-slate-800 cursor-pointer"}`}
        >
          <Trash />
        </div>
      )}
      <DrawerDialogDemo drawerType={drawerType} formType={formType}>
        <DialogTrigger asChild>
          <Button
            disabled={drawerType == "MyHabbitList"}
            variant="outline"
            className="flex justify-center items-center h-9 flex-1 rounded-full hover:bg-slate-800 w-full cursor-pointer bg-transparent border-none"
          >
            <Edit />
          </Button>
        </DialogTrigger>
      </DrawerDialogDemo>
    </div>
  );
};

export default SelectedMenuBottom;
