"use client";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { DrawerDialogDemo } from "../../Drawer/DrawerComponent";
import { Button } from "../../ui/button";

function SidebarTablet({
  drawerType,
  formType,
}: {
  drawerType: string;
  formType: string;
}) {
  return (
    <div
      className="flex items-center justify-between w-11/12 h-14 mx-auto my-3 
        absolute md:relative bottom-0 left-0 right-0 md:bottom-auto px-3 rounded-2xl 
        backdrop-filter backdrop-blur-3xl backdrop-saturate-200 bg-slate-50/10 
        border border-solid border-balck/10 hover:border-white/100"
    >
      <DrawerDialogDemo drawerType={"FilterList"} formType={"Filter"}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className={"flex-1 h-10 bg-transparent border-none"}
          >
            <span>Filter</span>
          </Button>
        </DialogTrigger>
      </DrawerDialogDemo>
      <DrawerDialogDemo drawerType={"FilterList"} formType={"Filter"}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className={"flex-1 h-10 bg-transparent border-none"}
          >
            <span>Filter</span>
          </Button>
        </DialogTrigger>
      </DrawerDialogDemo>
      <DrawerDialogDemo drawerType={drawerType} formType={formType}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className={"flex-1 h-10 bg-transparent border-none"}
          >
            <span>add</span>
          </Button>
        </DialogTrigger>
      </DrawerDialogDemo>
      <DrawerDialogDemo drawerType={"FilterList"} formType={"Filter"}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className={"flex-1 h-10 bg-transparent border-none"}
          >
            <span>Filter</span>
          </Button>
        </DialogTrigger>
      </DrawerDialogDemo>
      <Button
        variant="outline"
        className={"flex-1 h-10 bg-transparent border-none"}
      >
        <span>Home</span>
      </Button>
    </div>
  );
}

export default SidebarTablet;
