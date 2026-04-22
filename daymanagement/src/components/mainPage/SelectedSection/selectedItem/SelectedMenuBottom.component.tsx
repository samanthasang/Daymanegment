"use client";
import DrawerButton from "@/components/Drawer/DrawerButton.component";
import { Ballot, Done, Edit, Trash } from "@/components/icons";
import { cn } from "@/lib/utils";

export const SelectedMenuBottom = ({
  selectedIsComplete = false,
  drawerType,
  formType,
  SelectItem,
  DelItem,
  CompleteItem,
}: {
  selectedIsComplete?: boolean;
  drawerType: string;
  formType: string;
  SelectItem: () => void;
  DelItem?: () => void;
  CompleteItem?: () => void;
}) => {
  return (
    <div className="flex justify-around w-full mx-auto gap-x-0.5">
      <div
        onClick={(e) => {
          e && e.preventDefault();
          SelectItem();
        }}
        className="flex justify-center items-center h-10 flex-1 rounded-full bg-primary hover:bg-button/15 w-full cursor-pointer"
      >
        <Ballot />
      </div>
      {drawerType != "SpendsList" && DelItem && CompleteItem && (
        <div
          onClick={(e) => {
            e && e.preventDefault();
            CompleteItem();
          }}
          className={cn(
            "flex justify-center items-center h-10 flex-1 rounded-full hover:bg-card/15 w-full cursor-pointer",
            selectedIsComplete ? "bg-success" : "bg-primary"
          )}
        >
          <Done />
          {/* <BasicSwitch
            checked={selectedIsComplete}
            handleToggle={(e) => {
              e && e.preventDefault();
              e && e.stopPropagation();
              CompleteItem();
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
            e && DelItem();
          }}
          className="flex justify-center items-center h-10 w-10 flex-1 rounded-full bg-primary hover:bg-error cursor-pointer"
        >
          <Trash />
        </div>
      )}
      <DrawerButton drawerType={drawerType} formType={formType}>
        <Edit />
      </DrawerButton>
    </div>
  );
};

export default SelectedMenuBottom;
