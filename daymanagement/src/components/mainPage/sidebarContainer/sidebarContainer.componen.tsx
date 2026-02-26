"use client";
import { cn } from "@/lib/utils";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { DrawerDialogDemo } from "../../Drawer/DrawerComponent";
import FilterComponent from "../../Filter/FilterComponent";
import { Button } from "../../ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";

function SidebarContainer({
  drawerType,
  title,
  number,
  formType,
  witDate = true,
}: {
  drawerType: string;
  formType: string;
  title: string;
  number: string;
  witDate: boolean;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isMobile = useMediaQuery("(max-width: 640px)");
  if (isDesktop) {
    return (
      <div className="col-span-1 flex justify-center w-full px-3 border-l h-full">
        <div className="flex flex-col flex-1 gap-4 w-full h-full">
          <div className="h-full">
            <div className={cn("flex flex-col justify-start gap-y-3 w-full")}>
              <FilterComponent witDate={witDate} />

              <div className="flex justify-between w-full mx-auto h-9">
                <DrawerDialogDemo drawerType={drawerType} formType={formType}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <span>add</span>
                    </Button>
                  </DialogTrigger>
                </DrawerDialogDemo>
              </div>
            </div>
          </div>

          <div className="flex justify-between w-full mx-auto h-9">
            <span>{title}</span>
            <span>{number}</span>
          </div>
        </div>
      </div>
    );
  }
  if (isMobile) {
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
              className={"flex-1 h-12 bg-transparent border-none"}
            >
              <span>Filter</span>
            </Button>
          </DialogTrigger>
        </DrawerDialogDemo>
        <DrawerDialogDemo drawerType={drawerType} formType={formType}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className={"flex-1 h-12 bg-transparent border-none"}
            >
              <span>add</span>
            </Button>
          </DialogTrigger>
        </DrawerDialogDemo>
        <Button
          variant="outline"
          className={"flex-1 h-12 bg-transparent border-none"}
        >
          <span>Home</span>
        </Button>
      </div>
    );
  }
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
            className={"flex-1 h-12 bg-transparent border-none"}
          >
            <span>Filter</span>
          </Button>
        </DialogTrigger>
      </DrawerDialogDemo>
      <DrawerDialogDemo drawerType={"FilterList"} formType={"Filter"}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className={"flex-1 h-12 bg-transparent border-none"}
          >
            <span>Filter</span>
          </Button>
        </DialogTrigger>
      </DrawerDialogDemo>
      <DrawerDialogDemo drawerType={drawerType} formType={formType}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className={"flex-1 h-12 bg-transparent border-none"}
          >
            <span>add</span>
          </Button>
        </DialogTrigger>
      </DrawerDialogDemo>
      <DrawerDialogDemo drawerType={"FilterList"} formType={"Filter"}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className={"flex-1 h-12 bg-transparent border-none"}
          >
            <span>Filter</span>
          </Button>
        </DialogTrigger>
      </DrawerDialogDemo>
      <Button
        variant="outline"
        className={"flex-1 h-12 bg-transparent border-none"}
      >
        <span>Home</span>
      </Button>
    </div>
  );
}

export default SidebarContainer;
