"use client";
import { DrawerDialogDemo } from "@/components/Drawer/DrawerComponent";
import { Ballot, Edit, Trash } from "@/components/icons";
import BasicSwitch from "@/components/ui/BasicSwitch";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

export const SelectedContainer = ({
  children,
  selectedIsComplete,
  drawerType,
  formType,
  SelectItem,
  DelItem,
  CompleteItemt,
}: {
  children: React.ReactNode;
  selectedIsComplete: boolean;
  drawerType: string;
  formType: string;
  SelectItem: () => void;
  DelItem: () => void;
  CompleteItemt: () => void;
}) => {
  return (
    <div className="flex flex-col w-full flex-1 bg-secondary rounded-2xl ga-x relative">
      {children}
    </div>
  );
};

export default SelectedContainer;
