"use client";
import { cn } from "@/lib/utils";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { DrawerDialogDemo } from "../../Drawer/DrawerComponent";
import { Button } from "../../ui/button";
import FilterComponent from "@/components/Filter/FilterComponent";
import useVisitList from "@/lib/Hooks/Lists/UseSpendsList.component";

function VisitsSideBar() {
  const ListVisit = useVisitList();

  return (
    <div className="col-span-1 flex justify-center w-full px-3 border-l h-full">
      <div className="flex flex-col flex-1 gap-4 w-full h-full">
        <div className="h-full">
          <div className={cn("flex flex-col justify-start gap-y-3 w-full")}>
            <FilterComponent witDate />

            <div className="flex justify-between w-full mx-auto h-9">
              <DrawerDialogDemo drawerType={"VisitsList"} formType="Add Visits">
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
          <span>{"Visits : " + `${ListVisit && ListVisit.length}`}</span>
        </div>
      </div>
    </div>
  );
}

export default VisitsSideBar;
